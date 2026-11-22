# Inclusion Content

This folder is the source of truth for expert-written advisor content.

## Structure

- `advisors/<advisor-id>/advisor.json` identifies the advisor.
- `advisors/<advisor-id>/categories.json` defines the browsable question categories.
- `advisors/<advisor-id>/questions.json` contains the curated question catalog.
- `schema/` documents validation rules.

The MVP may use large advisor catalog files. Individual question folders may replace these files later as content volume grows.

Only `published` content should be included in the public website and search index.
