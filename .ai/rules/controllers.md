---
paths:
  - 'app/Http/Controllers/**'
---

# Controllers

## Scope queries and statistics to authenticated user
Always scope Eloquent queries, counts, and category statistics to the authenticated user ($user->id / auth()->id()) so that each user only views and interacts with their own data.
