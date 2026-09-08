"""Regression checks for the optional static video supplement (standard library)."""
import csv
import importlib.util
import json
from html.parser import HTMLParser
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

SPEC = importlib.util.spec_from_file_location(
    "topic_videos", Path(__file__).resolve().parents[1] / "build_topic_video_sections.py")
builder = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(builder)


class Tags(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.tags = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))


class VideoSections(unittest.TestCase):
    def setUp(self):
        self.row = dict(zip(builder.FIELDS, [
            "AC9MFN01", "https://www.youtube.com/watch?v=OinudV2LWlo", "Count to 10",
            "Khan Academy Kids", "0", "0", "Count objects to ten.",
            "What is the total?", "Count ten counters.",
            "https://blog.khanacademy.org/khan-kids-learn-to-count-with-khan-academy-kids/",
            "Official creator page; supports counting to ten only.",
        ]))

    def load(self, rows):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "data").mkdir()
            (root / "data/curriculum-units.json").write_text(json.dumps({"units": [
                {"code": "AC9MFN01", "yearNumber": 0},
            ]}))
            with (root / "data/topic-videos.csv").open("w", newline="") as stream:
                writer = csv.DictWriter(stream, fieldnames=builder.FIELDS)
                writer.writeheader()
                writer.writerows(rows)
            with patch.object(builder, "ROOT", root):
                return builder.load_rows()

    def test_edits_preserve_content_and_are_reversible(self):
        _, videos = self.load([self.row])
        block = builder.section("AC9MFN01", videos["AC9MFN01"])
        for newline in ("\n", "\r\n"):
            for marker in ("", "<!-- skillr-curriculum-equivalents:start -->",
                           "<!-- skillr-facebook-feedback:start -->"):
                original = newline.join([
                    '<!doctype html><html><head><title>A &amp; B</title>',
                    '<link rel="canonical" href="https://skillrhub.com/example/">',
                    '</head><body><main><h1>Keep this lesson</h1>',
                    '<details open><summary>Learn</summary><p>One + one = two.</p></details>',
                    '<a href="/practice/">Practice</a>', marker,
                    '</main><script>keepExistingBehaviour();</script></body></html>',
                ])
                changed = builder.update_source(original, block)
                self.assertEqual(builder.without_owned_block(changed), original)
                self.assertEqual(builder.update_source(changed, block), changed)
                self.assertEqual(builder.update_source(changed, ""), original)

    def test_bad_mapping_is_rejected_before_output(self):
        for field, value in (("codes", "WRONG"), ("min_year", "2"),
                             ("video_url", "https://evil.example/watch?v=OinudV2LWlo"),
                             ("video_url", "https://www.youtube.com/watch?v=invalid"),
                             ("after_watching", "")):
            with self.subTest(field=field, value=value), self.assertRaises(ValueError):
                self.load([{**self.row, field: value}])
        with self.assertRaises(ValueError):
            self.load([self.row, self.row])
        six = [{**self.row, "video_url": f"https://youtu.be/{index:011}"} for index in range(6)]
        with self.assertRaises(ValueError):
            self.load(six)
        self.assertEqual(len(self.load(six[:5])[1]["AC9MFN01"]), 5)

    def test_damaged_markers_stop_the_update(self):
        for source in (builder.START, builder.END + builder.START,
                       builder.START + builder.START + builder.END + builder.END):
            with self.assertRaises(ValueError):
                builder.update_source(source, "new")

    def test_player_is_optional_static_and_does_not_preload_youtube(self):
        _, videos = self.load([{**self.row, "title": '<script>alert("test")</script>'}])
        block = builder.section("AC9MFN01", videos["AC9MFN01"])
        parsed = Tags(block).tags
        self.assertNotIn("script", [tag for tag, _ in parsed])
        details = [attrs for tag, attrs in parsed if tag == "details"]
        self.assertNotIn("open", details[0])
        frames = [attrs for tag, attrs in parsed if tag == "iframe"]
        self.assertEqual(len(frames), 1)
        frame = frames[0]
        self.assertNotIn("src", frame)
        self.assertEqual(frame["referrerpolicy"], "strict-origin-when-cross-origin")
        placeholder = Tags(frame["srcdoc"]).tags
        self.assertFalse(any(tag in ("script", "img", "iframe", "link") for tag, _ in placeholder))
        loaders = [attrs for tag, attrs in parsed
                   if tag == "a" and attrs.get("target") == frame["name"]]
        self.assertEqual(len(loaders), 1)
        self.assertTrue(loaders[0]["href"].startswith("https://www.youtube-nocookie.com/embed/"))
        self.assertNotIn("autoplay=1", block)
        self.assertEqual(loaders[0]["referrerpolicy"], "strict-origin-when-cross-origin")


if __name__ == "__main__":
    unittest.main()
