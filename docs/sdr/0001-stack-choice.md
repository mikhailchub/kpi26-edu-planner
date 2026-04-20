# SDR-0001: Stack Choice

## Status
Accepted

## Date
2026-04-20

## Context
The application is a single-user student task planner. It requires complex state management for filtering, sorting, and real-time statistics updates. Additionally, development guidelines demand a "premium" aesthetic with micro-animations and visual excellence, which is best achieved using a modern component-based framework.

## Decision
Use **Vite + React + TypeScript**.

## Options considered
- **Plain HTML/JS**: Simplest, but harder to maintain complex state transitions and reactive UI updates for stats and filters.
- **Vite + Vanilla TS**: Good middle ground, but lacks the declarative UI components needed for the rich aesthetic requirements.
- **Vite + React + TS**: Chosen for robust state management, component reusability (TaskCards), and ease of implementing a premium UI.

## Consequences
- Requires a build step (`npm run build`).
- Larger bundle size, but negligible for a single-user local app.
- Faster development of complex interactive forms and layouts.

## Requirements touched
- FR-11 (Statistics)
- FR-09, FR-10 (Filtering & Sorting)
- NFR-01 (Web app)
- NFR-03 (Responsiveness)

## Rejected options and rationale
- **Plain HTML/JS**: Rejected due to the complexity of manual DOM manipulation for dynamic stats and filtered lists, which risks bugs in business rule enforcement (BR-09, BR-10).
- **Vite + Vanilla TS**: Rejected to prioritize visual excellence and developer velocity for component-heavy UI.
