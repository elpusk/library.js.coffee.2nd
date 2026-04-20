# Software Bill of Materials (SBOM)

## Component: webmapper

| Field | Value |
|-------|-------|
| **Package Name** | webmapper |
| **Version** | 1.8 |
| **Description** | lpu237 장비 설정 webapp |
| **Source Path** | packages/app/webmapper |
| **Package Manager** | pnpm 10.27.0 |
| **Generated** | 2026-04-20 |

---

### Production Dependencies

| Package | Specified Version | Resolved Version | License | Type |
|---------|------------------|-----------------|---------|------|
| @elpusk/lib | workspace:* | 2.0.0 (local) | MIT | dependency |
| lucide-react | ^0.561.0 | 0.561.0 | ISC | dependency |
| react | ^19.2.3 | 19.2.3 | MIT | dependency |
| react-dom | ^19.2.3 | 19.2.3 | MIT | dependency |
| react-simple-keyboard | ^3.8.161 | 3.8.161 | MIT | dependency |

---

### Dev Dependencies

| Package | Specified Version | Resolved Version | License | Type |
|---------|------------------|-----------------|---------|------|
| @types/react | ^19.0.0 | 19.2.7 | MIT | devDependency |
| @types/react-dom | ^19.0.0 | 19.2.3 | MIT | devDependency |
| @vitejs/plugin-react | ^4.2.1 | 4.7.0 | MIT | devDependency |
| gh-pages | ^6.1.1 | 6.3.0 | MIT | devDependency |
| typescript | ^5.2.2 | 5.9.3 | Apache-2.0 | devDependency |
| vite | ^5.2.0 | 5.4.21 | MIT | devDependency |

---

### Notes

- @elpusk/lib is a local workspace dependency (packages/lib).
- Deploy target: GitHub Pages via gh-pages.
