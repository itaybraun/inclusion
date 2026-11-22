# Content Management Specification

## Purpose

The content folder is the source of truth for advisor questions and answers. It must make expert content easy to add, edit, remove, translate, review, and publish.

The repository must support:

- Adding or removing questions without rewriting application code
- Editing an answer in a text editor or pull request
- Organizing questions by advisor and category
- Publishing the same question and answer in English, Hebrew, and Arabic
- Recording who authored and reviewed an answer and when
- Keeping internal editorial comments private
- Linking optional MP4 media to a question

## Core Principle

High-quality expert content is the central product asset.

Every published answer should represent deliberate expert contribution, not an answer invented at chat time. The project should prioritize expert authorship, review, traceability, and regular maintenance over volume.

An answer may be written directly by an expert, written from reviewed source material, or initially drafted with AI assistance. It must not become publishable until a responsible expert or editor approves it.

## Repository Layout

Use one folder per advisor under `content`:

```text
content/
  advisors/
    teacher-guide/
      advisor.json
      categories/
        disclosure-and-privacy.json
        knowing-the-child.json
        daily-classroom-situations.json
      questions/
        meltdown-in-middle-of-lesson/
          question.json
          answer.md
          answer-he.md
          answer-ar.md
          media.json
          comments.md
    classroom-aide/
    older-sibling/
    administration/
    parent-companion/
  glossary/
  schema/
```

`answer.md` is the English answer. Language-specific filenames are permitted for the MVP. Category files may use the same language-keyed structure when that is easier for editing.

Markdown is preferred for answer prose because it supports headings, lists, emphasis, links, and accessibility-friendly structure.

JSON is preferred for identity and metadata because it is straightforward to validate and inspect.

Large category files are permitted if they remain readable, but separate question folders are recommended for:

- Long answers
- Multiple translations
- Media
- Frequent editorial changes
- Private comments
- Independent review history

## Advisor Definition

Each advisor should have a stable machine-readable definition.

Example `advisor.json`:

```json
{
  "id": "teacher-guide",
  "friendlyName": "Maya",
  "roleName": "Teacher Guide",
  "description": "Practical, classroom-focused guidance for teachers.",
  "color": "#D49A35",
  "avatar": "assets/maya.png",
  "status": "published",
  "defaultLanguage": "en",
  "supportedLanguages": ["en"]
}
```

The advisor identifier must remain stable when its friendly name or translated text changes.

## Question Definition

One question should have a stable machine-readable record.

Example `question.json`:

```json
{
  "id": "meltdown-middle-of-lesson",
  "advisorId": "teacher-guide",
  "categoryId": "daily-classroom-situations",
  "status": "published",
  "featured": true,
  "sortOrder": 10,
  "question": {
    "en": "What should I do if the child has a meltdown in the middle of a lesson?",
    "he": "",
    "ar": ""
  },
  "keywords": {
    "en": ["meltdown", "lesson", "distress", "classroom"],
    "he": [],
    "ar": []
  },
  "answerFiles": {
    "en": "answer.md",
    "he": "answer-he.md",
    "ar": "answer-ar.md"
  },
  "relatedAdvisors": [],
  "media": "media.json",
  "lastPublishedAt": "2026-11-23"
}
```

An empty localized field or missing answer file means that translation is unavailable. The interface must not silently display English for a Hebrew or Arabic user. A missing translation should show a clear "Not yet available" state or fall back only to an explicitly approved fallback language.

## Category Definition

Each category should have a stable identifier and localized display text.

Example `categories/daily-classroom-situations.json`:

```json
{
  "id": "daily-classroom-situations",
  "name": {
    "en": "Daily Classroom Situations",
    "he": "",
    "ar": ""
  },
  "description": {
    "en": "Practical help for distress, transitions, participation, and sensory conditions.",
    "he": "",
    "ar": ""
  },
  "sortOrder": 3
}
```

## Answer Metadata

Each answer must contain public and internal metadata.

The public metadata should include:

- Answer status
- Author or expert by name or organization
- Reviewer or reviewer organization
- Written date
- Last review date
- Last published date
- Source or evidence references
- Applicable locale or jurisdiction
- Optional expiration or next-review date

Internal metadata must be kept outside visible answer output. It may include:

- Exact author identity
- Editorial notes
- Internal review status
- Reviewer comments
- Source review notes
- Red team or safety review notes
- AI assistance disclosure
- Change history
- Reasons for not publishing
- Links to supporting documents

Example answer front matter:

```yaml
---
id: meltdown-middle-of-lesson
status: published
public:
  writtenBy: "Example Special Education Expert"
  reviewedBy: "Clinical Review Team"
  writtenAt: "2026-11-23"
  reviewedAt: "2026-11-23"
  publishedAt: "2026-11-23"
  nextReviewAt: "2027-05-23"
  jurisdiction: "Israel"
  sources:
    - "Verified source name"
    - "Official ministry guidance"
internal:
  authorId: "expert-001"
  reviewerId: "reviewer-004"
  aiAssisted: false
  draftNotes: "See comments.md"
  reviewNotes: "Approved for classroom use."
  changeReason: "Initial publication"
---
```

Answer front matter is content metadata, not a substitute for human expert accountability. Human names or organizations shown to users should be reviewed for consent and accuracy.

## Private Editorial Comments

Comments must be visible only to repository editors and configured review tools. They must not be shipped to the public site or returned by search.

Use an unbuildable or editor-only location such as `comments.md` or `editorial/`:

```text
questions/meltdown-middle-of-lesson/
  answer.md
  comments.md
```

`comments.md` may contain:

- Open editorial questions
- Safety concerns
- Suggested wording
- Translation issues
- Source verification details
- Deferred follow-up work
- Reviewer decisions

The build must exclude internal fields, comment files, draft answers, and unpublished sources.

## Translation Model

Every supported language should maintain the same question identifier and answer purpose.

English is the initial authoring language. Hebrew and Arabic should be treated as separate expert-reviewed translations rather than automated output shown as final.

For each language, track:

- Translation status
- Translator or reviewer
- Translation date
- Review date
- Published date
- Source answer version
- Approval status

The UI should show a language badge or status only when useful. Missing translations must be explicit and not misrepresented as expert-reviewed.

## Content Lifecycle

A question can have these states:

1. **Draft:** Visible only to editors
2. **In review:** Under expert or safety review
3. **Needs translation:** Approved in one language but incomplete in others
4. **Published:** Available to users in the selected language
5. **Archived:** Removed from normal search and browsing

Archive a question instead of deleting its stable identifier. This preserves links, historical review, and future re-publication.

Changes to a published answer should create a clear revision:

- What changed
- Why it changed
- Who reviewed it
- When it took effect
- Whether existing MP4 media is still accurate

## Media Metadata

Each question may reference an MP4 file.

Example `media.json`:

```json
{
  "questionId": "meltdown-middle-of-lesson",
  "language": "en",
  "title": "What to do during a classroom meltdown",
  "mp4": "media/meltdown-middle-of-lesson.mp4",
  "poster": "media/meltdown-middle-of-lesson-poster.jpg",
  "durationSeconds": 180,
  "transcript": "transcript-en.vtt",
  "publishedAt": "2026-11-23",
  "status": "published"
}
```

Media changes require matching transcript updates and expert approval.

## Editing and Review Workflow

The repository should support the same workflow for individual questions or large category files:

1. Create or edit a question and answer.
2. Add sources and public attribution.
3. Add private editorial comments.
4. Submit for expert review.
5. Resolve safety or scope concerns.
6. Translate and review localized versions.
7. Publish only from approved content.
8. Schedule or trigger the next review.

Git history should be sufficient for MVP change tracking. Pull requests provide:

- Reviewable diffs
- Named contributors
- Comments
- Rollback
- Review approval

A future CMS may be built on top of the same file format. It should not require moving content out of version control.

## Validation

Before publishing, validate:

- Stable question ID
- Existing advisor and category IDs
- Matching answer file
- Public author and reviewer
- Written and review dates
- Required answer sections
- No internal comments in public output
- Valid language codes
- Valid media references
- Transcript exists for speech-heavy MP4 content
- Safety and escalation language where applicable
- RTL formatting where relevant

Unknown or missing metadata should block publication rather than show a success-shaped fallback.

## Search Index

The application should build a search index from published content only.

The index should contain:

- Advisor ID
- Category ID
- Question ID
- Localized question
- Localized keywords
- Short answer summary
- Publication status
- Language

The search index must exclude:

- Private comments
- Draft answers
- Internal metadata
- Unpublished translations
- Reviewer-only notes
- AI suggestions not approved for publication

## MVP Acceptance Criteria

1. Questions are stored in a `content` folder organized by advisor.
2. One question can be stored in its own folder or an approved large category file.
3. An answer can be edited independently of application code.
4. English, Hebrew, and Arabic fields or answer files can coexist.
5. Adding or removing a question does not require UI code changes.
6. Public metadata records authorship and review dates.
7. Internal comments are excluded from public pages and search.
8. Unpublished content cannot appear in the website.
9. MP4 media can reference a stable question ID.
10. Git and pull requests provide an auditable expert review workflow.
