# SDR-0003: Routing, State, and Data Model

## Status
Accepted

## Date
2026-04-20

## Context
The app needs to manage a list of tasks, filters, sorting preferences, and global search. It also needs to handle form states for creating/editing tasks.

## Decision
- **Routing**: Single-page application (SPA) without client-side routing (not needed for simple task list).
- **State Management**: Use **Zustand** or **React Context** (depending on bundle size/simplicity) for centralized task management and persistence.
- **Data Model**: Flat list of Task objects with attributes defined in `4.1` of Requirements.md.

## Options considered
- **React Router**: Rejected as overkill for a single-view dashboard.
- **Redux**: Rejected as too boilerplate-heavy.
- **Zustand**: Preferred for its minimal API and built-in persistence middleware.

## Consequences
- Simplified app structure.
- Easy integration with localStorage.

## Requirements touched
- FR-01 to FR-11.
- BR-11 (State transitions).

## Rejected options and rationale
- **React Router**: Navigation is handled via conditional rendering or modals for the task form, which is faster and cleaner for this scale.
