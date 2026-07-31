# skillr

## Sitemap automation

This repo includes automatic sitemap generation based on tracked HTML pages.

- Generator script: `scripts/generate-sitemap.sh`
- Git hook: `.githooks/pre-commit`

### One-time setup

Run:

```bash
./scripts/setup-git-hooks.sh
```

After setup, every commit will regenerate `sitemap.xml` and `sitemap.html` and stage them automatically.

### Manual regenerate

Run:

```bash
./scripts/generate-sitemap.sh
```