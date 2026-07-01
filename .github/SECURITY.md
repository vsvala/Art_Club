# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 0.1.x   | ✓         |

This is a portfolio/practice repository.
Security fixes are applied on a best-effort basis to the latest version on the default branch.

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

Please report the vulnerability privately to the project maintainer through GitHub or another prearranged private channel. If you report it through GitHub, ask the maintainer to confirm receipt before sharing details more broadly.
Include in your report:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

Please do not include secrets (API keys, tokens, passwords, private credentials) in issues, pull requests, or commits.

## Security Baseline Used in This Repository

This repository uses a lightweight security baseline:

- Dependency Graph
- Dependabot Alerts
- Dependabot Security Updates
- Secret Scanning

Additional protections (such as push protection and code scanning) may be enabled later as the project grows.

## Security Measures

This project uses the following security practices:

- **Dependency auditing**: CI/CD pipeline runs `npm audit --audit-level=high` on every push and pull request. High and critical vulnerabilities will block the build.
- **No dev dependencies in production**: The audit omits dev dependencies (`--omit=dev`).
- **Automated CI checks**: All changes to `master` go through a lint, test, build, and security audit pipeline before deployment.

## Security

This repository uses a lightweight security baseline suitable for a portfolio project:

- Dependency Graph: enabled
- Dependabot Alerts: enabled
- Dependabot Security Updates: enabled
- Secret Scanning: enabled

### Dependency updates

Security-related dependency pull requests may be opened automatically by Dependabot.

### Reporting

If you notice a security issue, please open an issue with details and reproduction steps.
Do not include secrets (API keys, tokens, passwords) in issues or commits.

## Scope

This policy applies to the frontend application in this repository. The backend lives at [vsvala/Art_Club_back](https://github.com/vsvala/Art_Club_back) and has its own security policy.
