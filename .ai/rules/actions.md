---
paths:
  - 'resources/js/actions/**'
---

# Actions

## Always generate Wayfinder routes with --with-form flag
When regenerating Wayfinder route definitions in this project, always pass the --with-form flag (e.g., php artisan wayfinder:generate --with-form --no-interaction) so that form helper methods (.form()) are generated on all route and controller actions.
