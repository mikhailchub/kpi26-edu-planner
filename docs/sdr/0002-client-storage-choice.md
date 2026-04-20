# SDR-0002: Client Storage Choice

## Status
Accepted

## Date
2026-04-20

## Context
The app is a local-only tool for students. Data must persist between sessions (refresh/restart). The expected volume of tasks is small to medium (up to 200 tasks per NFR-04).

## Decision
Use **localStorage** for primary persistence.

## Options considered
- **sessionStorage**: Rejected (data lost on tab close).
- **localStorage**: Chosen; simple API, perfect for small JSON-serializable datasets.
- **IndexedDB**: Overkill for ~200 tasks; complicates implementation without significant benefit for this scale.

## Consequences
- Data is lost if the user clears browser data.
- Synchronous API, but performance is fine for small collections.

## Requirements touched
- FR-12 (Persistence)
- NFR-05 (Data safety)

## Rejected options and rationale
- **IndexedDB**: Rejected because the requirements don't imply complex relational queries or large binary data that would justify the complexity of asynchronous DB management.
