# Product Decisions

## 2026-11-25 — Focus the product on school

**Status:** Accepted

### Decision

Inclusion will focus its initial product and content on supporting autistic students in school. The primary users are teachers, classroom aides, and other school staff. Families remain important collaborators, especially in sharing information that helps the school support the student, but family-only services are not a current advisor focus.

### Active advisor set

1. **Maya — Teacher Guide:** Classroom situations, teaching practices, inclusion, and coordination with the family and school team.
2. **Daniel — Classroom Aide:** In-the-moment classroom support and collaboration with the teacher.
3. **Ari — ASD Guide:** General, educational information about autism relevant to school teams and families.

The Teacher Guide is the only advisor with a reviewed question-and-answer library. Classroom Aide and ASD Guide remain not ready by default until their expert content is prepared, except for the time-limited ASD Guide development demo below.

### Temporary ASD Guide development demo

For 48 hours, through 2026-11-27 01:10 (UTC+02:00), Ari is temporarily available in the development demo. All 35 English and Hebrew questions are shown; only the first five questions have answer drafts in English and Hebrew. The advisor page must visibly warn that the content is unreviewed and may be inaccurate, and questions without answers must say so. When the demo expires, Ari returns to "The advisor is not ready yet." This temporary preview does not change the draft or expert-review status of the content.

### Removed from the current product scope

- Older Sibling advisor
- Administration advisor
- Parent Companion advisor

These are removed from the active advisor list and current MVP scope. This does not prevent reconsidering them in a future product decision. Teacher-parent communication remains part of school guidance; it does not make the product a parent-companion service.

### Implications

- The main menu lists only the three active school-focused advisors.
- The product specification, advisor experience, and content catalog should use this active advisor set.
- The ASD Guide explains autism and school-relevant support concepts but does not diagnose, prescribe treatment, or replace a qualified professional.
- Content remains expert-written or expert-reviewed. The ASD Guide must clearly distinguish general educational information from individual clinical advice.

## 2026-11-25 — Keep long answers in an inner scroll area

**Status:** Accepted

### Decision

When an answer is longer than its available reading area, scroll only the answer body. Keep the selected question, category/question layout, and surrounding page in place while the user reads.

### Implications

- Bound the answer body's height to the available viewport and allow it to scroll independently.
- Keep the selected question outside the scroll area so it remains visible.
- Contain scroll behavior at the answer boundary and support keyboard scrolling.
- Use the same inner-scroll behavior on narrow screens; no separate mobile scroll model is required for this iteration.
