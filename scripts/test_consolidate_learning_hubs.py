"""A no-op hub maintenance run must preserve authored pages and experiments."""
import subprocess
import tempfile
import unittest
from pathlib import Path

from consolidate_learning_hubs import consolidate, moved_page


class ConsolidationNoOpTests(unittest.TestCase):
    def test_write_preserves_already_consolidated_routes_and_authored_lessons(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            subprocess.run(['git', 'init', '-q'], cwd=root, check=True)
            files = {
                'year9/index.html': moved_page('/learn/?year=9', 'year9/index.html'),
                'learn/index.html': '<main><h1>Learn</h1><p>Existing catalogue.</p></main>',
                'year9/maths/example/index.html': '<main><h1>Authored lesson</h1><p>Original teaching.</p></main>',
            }
            for name, content in files.items():
                path = root / name
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(content)
            subprocess.run(['git', 'add', '.'], cwd=root, check=True)
            self.assertEqual(consolidate(root, write=True)['changed_files'], 0)
            for name, content in files.items():
                self.assertEqual((root / name).read_text(), content, name)
            self.assertEqual(consolidate(root, write=False)['changed_files'], 0)


if __name__ == '__main__':
    unittest.main()
