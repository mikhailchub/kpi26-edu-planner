# Implementation Notes & Traceability Matrix

Цей документ пов'язує функціональні вимоги з їх реалізацією в коді.

## Traceability Matrix

| ID | Вимога | Реалізація (Файли) | Статус |
|:---|:---|:---|:---|
| FR-01 | Створення задачі | `src/components/TaskForm.tsx`, `src/store/taskStore.ts` | Done |
| FR-02 | Валідація форми | `src/utils/validation.ts`, `src/components/TaskForm.tsx` | Done |
| FR-03 | Перегляд списку задач | `src/components/TaskList.tsx`, `src/components/TaskCard.tsx` | Done |
| FR-04 | Редагування задачі | `src/components/TaskForm.tsx`, `src/store/taskStore.ts` | Done |
| FR-05 | Видалення задачі | `src/store/taskStore.ts`, `src/App.tsx` | Done |
| FR-06 | Зміна статусу | `src/store/taskStore.ts`, `src/components/TaskCard.tsx` | Done |
| FR-07 | Авто-Overdue | `src/store/taskStore.ts` (`checkOverdueTasks`) | Done |
| FR-08 | Пошук | `src/App.tsx` (memoized filtering) | Done |
| FR-09 | Фільтрація | `src/App.tsx`, `src/components/FilterBar.tsx` | Done |
| FR-10 | Сортування | `src/App.tsx`, `src/components/FilterBar.tsx` | Done |
| FR-11 | Статистика | `src/components/StatsPanel.tsx` | Done |
| FR-12 | Persistence | `src/store/taskStore.ts` (zustand/persist) | Done |
| FR-13 | Очищення фільтрів | `src/App.tsx` (`clearFilters`) | Done |

## Бізнес-правила (BR)

Всі бізнес-правила (BR-01 - BR-11) імплементовані в `src/utils/validation.ts` (валідація вводу) та `src/store/taskStore.ts` (логіка переходів станів та авто-оновлення).

## Нефункціональні вимоги (NFR)

- **NFR-01 (Тип)**: Single Page Application (SPA).
- **NFR-03 (Адаптивність)**: Використано Flexbox/Grid та `auto-fit` у CSS.
- **NFR-04 (Продуктивність)**: Масштабованість до 200 задач забезпечена через React memoization.
- **NFR-05 (Збереження)**: `localStorage` через middleware Zustand.
