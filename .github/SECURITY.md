# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 0.1.x   | ✓         |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

Contact: [virva.svala@gmail.com](mailto:virva.svala@gmail.com)

Include in your report:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Measures

This project uses the following security practices:

- **Dependency auditing**: CI/CD pipeline runs `npm audit --audit-level=high` on every push and pull request. High and critical vulnerabilities will block the build.
- **No dev dependencies in production**: The audit omits dev dependencies (`--omit=dev`).
- **Automated CI checks**: All changes to `master` go through a lint, test, build, and security audit pipeline before deployment.

## Scope

This policy applies to the frontend application in this repository. The backend lives at [vsvala/Art_Club_back](https://github.com/vsvala/Art_Club_back) and has its own security policy.
