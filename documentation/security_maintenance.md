# Security & Maintenance

## Checking for vulnerabilities

```bash
# Check PRODUCTION vulnerabilities (most important command)
npm audit --omit=dev

# Check all including dev dependencies
npm audit
```

> **Note:** `npm audit` also reports vulnerabilities in dev dependencies (jest, eslint) that do not affect production. Always check separately with `--omit=dev`.

---

## Automatic fixes

```bash
# Fix safe updates automatically (no breaking changes)
npm audit fix

# Preview what --force would do BEFORE running it
npm audit fix --force --dry-run

# WARNING: --force can make unexpected downgrade updates
# Only run if you know what you are doing
npm audit fix --force
```

---

## Checking for outdated packages

```bash
npm outdated
```

| Column | Meaning |
|---|---|
| Current | Currently installed version |
| Wanted | Maximum allowed version according to package.json |
| Latest | Latest available version on npm |

---

## Updating packages

```bash
# Update all packages within allowed ranges (no major jumps)
npm update

# Update a single package to latest
npm install packagename@latest

# Check what is installed
npm ls packagename
```

---

## Recommended maintenance routine

| Interval | Action |
|---|---|
| Monthly | `npm audit --omit=dev` — check production vulnerabilities |
| Quarterly | `npm outdated` — consider updates |
| Major updates | Always do on a separate branch, test carefully |
