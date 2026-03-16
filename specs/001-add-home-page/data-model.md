# Data Model & UI Mapping: Home Restructuring

## UI Components Mapping

| Component | Page | Responsibility |
|-----------|------|----------------|
| `SmartPrompt` | Home | Action-oriented search and AI command input |
| `ContextWidgets` | Home | Real-time insights and contextual snapshots |
| `OverviewStats` | Overview | Quantitative KPI summary cards |
| `OverviewCharts` | Overview | Visual performance breakdowns (Donut, Bar) |
| `OverviewBottom` | Overview | Operational map and activity feed |

## State Requirements

- **Current Route**: Needed in `AppLayout` to highlight the sidebar.
- **Cycle Filter**: (Assumption) Both pages should respect a global or user-selected cycle (currently hardcoded as 2026).

## Navigation Schema

- **Home**: `path: "/"`
- **Overview**: `path: "/overview"`
