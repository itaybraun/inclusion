# Advisor Experience Specification

## Purpose

The advisor experience lets a user explore a specific advisor and find practical answers before starting a live conversation. The page should feel personal and approachable while remaining clear, trustworthy, and professional.

Live chat is planned for a later phase and is not available in the MVP.

## Advisor Readiness

The MVP should expose advisor availability explicitly:

- Teacher Guide: ready for browsing curated expert-draft questions and answers.
- Classroom Aide: not ready yet.
- Older Sibling: not ready yet.
- Administration: not ready yet.
- Parent Companion: not ready yet.

Cards for not-ready advisors remain visible. They must not open a chat or route to missing content.

## Advisor Identity

Every advisor has two names:

1. **Friendly name:** A warm, memorable name that makes the advisor feel personable.
2. **Role name:** A clear functional name describing the advisor's scope.

The friendly name should lead the interface, for example "Maya" and "Teacher Guide."

Every advisor also has:

- A distinct face or avatar
- A distinct color
- A short purpose statement
- A clearly labeled scope

The identity color should be used consistently for:

- Avatar background or frame
- Page accents
- Category icons or separators
- Search focus state
- Primary action buttons
- Podcast progress and active state

The advisor's name must always accompany the color. Color must never be the only indicator of identity or action.

### Proposed Advisor Identity

| Role | Friendly name | Identity color |
| --- | --- | --- |
| Teacher Guide | Maya | Warm amber |
| Classroom Aide Agent | Daniel | Teal |
| Older Sibling Agent | Noa | Soft indigo |
| Administration Agent | Yael | Muted terracotta |
| Parent Companion Agent | Lev | Sage green |

## Advisor Detail Page Structure

### 1. Advisor Header

The header should contain:

- Advisor face
- Friendly name
- Functional role name
- One-sentence purpose
- Advisor identity color
- An optional "About this advisor" scope link

Example:

> **Maya**
>
> Teacher Guide
>
> Practical, classroom-focused guidance for teachers supporting an autistic student.

### 2. Primary Actions

The page should expose two actions:

- **Chat with Maya**
- **Browse questions**

Chat is visible to communicate the future capability, but it may be disabled in the MVP:

- Label: "Chat coming soon"
- Clear note: "Live chat requires a later LLM integration."
- The action must not imply that chat is already available.

"Browse questions" should move or scroll to the question library.

For the MVP, live chat should be represented by a compact round icon at the right side of the advisor header, not by a full-width or full-row button.

- Clicking the icon should show "Not ready yet."
- The icon may use a chat bubble or avatar message symbol.
- The advisor name and role should remain visible nearby.

### 3. Search

A search field should be displayed above the question categories:

- Placeholder: "Search Maya's guidance"
- Search button or icon
- Clear-search control
- Search results replace or filter the category list
- Search should match question titles, category names, and answer text
- Search should not expose answers that contain restricted or unsafe guidance

**Search states:**

- Empty query: show all categories and featured questions.
- Matching query: show matching questions under relevant categories.
- No matches: show a helpful empty state and suggest alternate terms.
- Search unavailable: preserve the category view rather than crashing or hiding content.

**MVP behavior:**

- English search first
- Hebrew and Arabic search after localization
- Avoid relying on AI retrieval; search curated question metadata and published answers

### 4. Question Categories

On wide screens, the advisor should present curated questions with categories in a side navigation and questions in a dedicated panel.

Each category should show:

- Category name
- Short category description
- Number of available questions
- A selected state
- A question count

Selecting a category replaces the question panel content with that category's questions. Categories should not expand and show all questions on the page at once.

On narrow screens, categories should become a compact horizontal list or a dropdown above the question panel.

Questions should be displayed as natural, first-person or teacher-facing prompts.

Example:

> "What should I do if the child has a meltdown in the middle of a lesson?"

Selecting a question opens its published answer.

An open or selected question should be bold and use the advisor's leading color. Its arrow should point down. Answer text should use compact spacing: short paragraphs, close list spacing, and minimal vertical gaps between sections.

The answer view should include:

- The question
- A clear, concise answer
- Immediate steps when relevant
- What to avoid
- Follow-up or escalation guidance
- Professional or cross-advisor referrals
- Optional podcast or MP4 recording

### 5. Related Advisor References

When a question crosses another role's scope, the answer should link to that advisor.

Examples:

- Administrative questions refer to **Yael / Administration**
- Parent communication or family hardship refers to **Lev / Parent Companion**
- Sibling questions refer to **Noa / Older Sibling**

## Teacher Advisor Example Categories

Maya / Teacher Guide should initially group questions into categories that match the work of a teacher.

### Disclosure and Privacy

- Should I tell the whole class about the student's diagnosis?
- What should I do if the student or parents do not want anyone told?
- What if the parents know but the child does not know their diagnosis?
- Which school staff should know, and how much should they know?
- What should I say when other students or parents ask why the child gets different support?

### Knowing the Child

- What are the ten most important things a teacher should know about autistic students?
- How do I learn this child's triggers, strengths, and routines?
- What should I ask the parents in our first meeting?
- How do I distinguish general autism information from this child's individual needs?

### Daily Classroom Situations

- What should I do if the child has a meltdown during a lesson?
- How do I handle transitions, schedule changes, or a substitute teacher?
- The child refuses to participate or leaves the room. How should I respond?
- How do I handle noise, bright lights, or crowded spaces?
- How should I give instructions so the child understands them?
- How do I adapt tests, homework, participation, and grading?

### Working with an Aide

- What changes when the child has an aide?
- What should I do when the aide is absent?
- How should responsibilities be divided between me and the aide?
- The child has no aide but appears to need one. What are my options?

### Social Dynamics

- How do I handle bullying or teasing?
- How can I encourage friendships without forcing them?
- What should I do when the child says or does something hurtful without meaning to?
- How do I protect the rest of the class's learning without sidelining this child?

### Parents and the School System

- How do I give parents honest feedback without alarming them?
- What should I do if I suspect autism but there is no diagnosis?
- How often should I communicate with parents, and how?
- When should I escalate to the counselor, principal, or outside professional?

### Boundaries and Safety

- What signs indicate a crisis, and what is the response protocol?
- Which questions are outside this advisor's scope?
- Where should medication or treatment questions be referred?
- What should I do if the situation involves immediate danger?

## Answer Requirements

Published answers must be:

- Practical
- Role-specific
- Calm and respectful
- Based on sourced or reviewed material
- Clearly within the advisor's scope
- Updated or dated when content depends on policy or best practice

Answers must not:

- Diagnose
- Prescribe medication or treatment
- Make legal or administrative guarantees
- Replace emergency or professional care
- Reveal private child information

## Podcast and MP4 Experience

The platform should support curated question-and-answer audio or video delivered from MP4 files supplied by the product owner.

### MVP assumptions

- Each MP4 is associated with one published question or answer.
- Files are provided as local or hosted assets.
- MP4 metadata is stored in the content catalog.
- The browser player should support viewing or listening through the MP4 file.
- The page must work with a slow or unavailable media file.

### Required content fields

For each MP4 recording:

- Advisor ID
- Language
- Question ID
- Media title
- MP4 URL or asset path
- Duration
- Optional poster image
- Optional transcript
- Publication date
- Source or review status

### Player behavior

An answer or category card may include a **Listen** button. Selecting it should open or start the advisor-branded media player.

The player should provide:

- Play and pause
- Seek
- Time elapsed and duration
- Volume
- Playback speed
- Fullscreen for video
- Picture-in-picture where supported
- Keyboard controls
- A transcript or text summary when available

The player should remain restrained in visual treatment. It may show the advisor name and identity color, but should not compete with the written answer.

### MP4 and podcast semantics

The feature may be described to users as "Listen" or "Audio & video," even though the underlying delivery format is MP4.

Podcast subscription feeds and RSS are not required for the MVP. They may be added only after a real feed, hosting strategy, and audio extraction process exist.

An MP4 containing video should use the normal MP4 player. An MP4 containing only a spoken track may be presented as audio with the advisor face as a poster.

## Live Chat State

For the MVP:

- Show "Chat with [friendly name]"
- Label it "Coming soon"
- Explain that the advisor will answer in a conversation in a later version
- Do not simulate live AI responses
- Do not store a fake chat history

When live chat is implemented later:

- The current advisor name and color should remain visible
- The chat should retain the child's parental-consented context only with explicit authorization
- Safety and emergency behavior must use the system-wide rules
- All answers should identify uncertainty and scope

## Accessibility

- All advisor names and faces must have meaningful accessible labels.
- Category controls must be keyboard accessible.
- Search results must be announced.
- Expanded categories must expose correct open and closed state.
- MP4 controls must be keyboard operable.
- Transcripts must be available for prerecorded speech.
- Identity must not depend on color.
- The detail page must support right-to-left layout for Hebrew and Arabic.

## MVP Acceptance Criteria

1. A user can open an advisor from the main menu.
2. The advisor page identifies the friendly name, role name, face, and distinct color.
3. Maya / Teacher Guide exposes at least six useful question categories.
4. Each category contains several representative questions.
5. Users can search question titles and published answer content.
6. Selecting a question displays a published, role-specific answer.
7. Chat is clearly labeled as coming soon.
8. MP4 media can be played from the question or answer page.
9. Media has a fallback, loading state, and transcript or text summary.
10. Cross-advisor referrals are clearly labeled.
