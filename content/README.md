# Inclusion Content

This folder is the source of truth for expert-written advisor content.

## Structure

- `advisors/<advisor-id>/advisor.json` identifies the advisor.
- `advisors/<advisor-id>/categories.json` defines the browsable question categories.
- `advisors/<advisor-id>/questions.json` contains the curated question catalog.
- `advisors/<advisor-id>/questions/<question-id>/answer.md` contains the editable rich answer for that question.
- `advisors/<advisor-id>/questions/<question-id>/answer-he.md` may contain a localized Hebrew answer.
- `advisors/<advisor-id>/questions/<question-id>/answer-ar.md` may contain a localized Arabic answer.
- `questions.json` stores localized question text and an `answerFiles` map keyed by language (`en`, `he`, `ar`).
- `schema/` documents validation rules.

Markdown is the primary answer format because it supports headings, lists, bold text, links, and images while remaining easy for experts to edit. HTML may be permitted only for a deliberate rich-content extension, such as supported media embeds, with strict allow-list sanitization.

By default, only `published` content should be included in the public website and search index. The time-limited ASD Guide development demo documented in `product/decisions.md` is an explicit exception: it may display Ari's draft questions and the first five bilingual draft answers until 2026-11-27 01:10 (UTC+02:00). The demo must show an unreviewed-content notice, leave all content marked as draft, and return Ari to not ready when it expires.
The current Hebrew content is a partial translation preview and is marked for human review. Missing translations are omitted rather than silently replaced with English.
