# Employee Management — LMS/ERP

A responsive employee management interface built with React and TypeScript as a technical assessment for an LMS/ERP system.

## Features

- **Employee management:** Create, view, and edit employee records.
- **Search:** Find employees by name, email, phone, employee ID, or position.
- **Filtering:** Filter employees by employment status and department.
- **Pagination:** Navigate through employee records with 12 employees per page.
- **Form validation:** Validate required fields, email, phone, salary, and duplicate email addresses.
- **UI states:** Loading skeletons, error handling, retry actions, and empty states.
- **Responsive design:** Desktop data table and mobile-friendly employee list.
- **Data persistence:** Mock API with `localStorage` persistence for demonstration purposes.

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack React Query
- React Hook Form
- Zod
- Tailwind CSS 4
- Lucide React
- Vitest and React Testing Library
- Playwright
- ESLint and Prettier

## Architecture

The project follows a feature-based structure to keep employee-related logic organized and maintainable.

```text
src/
├── api/
│   ├── mockEmployeesApi.ts
│   └── seed.ts
├── features/
│   └── employees/
│       ├── components/
│       ├── EmployeesPage.tsx
│       ├── model.ts
│       ├── queries.ts
│       └── statusTones.ts
├── lib/
├── ui/
├── App.tsx
├── main.tsx
└── index.css
```

- **Features:** Employee-specific pages, components, and domain logic.
- **API:** Mock data and CRUD operations isolated from the UI.
- **React Query:** Server-state management, caching, and query invalidation.
- **React Hook Form + Zod:** Form state management and schema-based validation.
- **Shared UI:** Reusable buttons, form fields, pagination, sheets, and state messages.

## Key Technical Decisions

### Feature-based architecture

Employee-related components and logic are grouped by feature rather than by technical type alone. This keeps related code close together and makes future development easier.

### Mock API

A mock API simulates asynchronous requests and persists changes in `localStorage`. This allows the application to demonstrate CRUD workflows without requiring a backend service.

### Performance

- Debounced search reduces unnecessary filtering updates.
- React Query caches fetched data and manages query invalidation after mutations.
- Pagination limits the number of employee rows rendered at once.
- Virtualization is intentionally omitted because the current dataset is small and pagination is sufficient for this use case.

For larger production datasets, server-side search, filtering, sorting, and pagination would be preferred.

### Testing

The project includes unit tests for data validation, formatting, pagination, and mock API behavior, along with Playwright end-to-end scenarios for search, filtering, and employee creation.

## Getting Started

### Requirements

- Node.js compatible with the installed Vite version
- npm

### Installation

```bash
npm ci
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Code Quality

```bash
npm run lint
npm run test
```

### End-to-End Tests

Install the Playwright browser before running E2E tests:

```bash
npx playwright install chromium
npm run test:e2e
```

## Scope and Limitations

This is a frontend technical assessment using a mock API. It does not include a production backend, authentication, or server-side authorization. Data is stored locally in the browser and is not shared across users or devices.

A production implementation would integrate a real API, enforce authorization on the server, and support server-side data operations for larger datasets.

---

**Note:** Automated tests and the production build should be executed successfully before considering the project fully verified.
