# Main Menu Specification

## Purpose

The main menu is the first screen users see. It should explain the school-focused Inclusion platform briefly, provide access to the three active advisors, and make the main areas of the product discoverable.

The page should help a user answer one question quickly:

> Who can help me, and what can they help with?

## Page Goals

- Explain the project in a short, understandable sentence or paragraph.
- Let users discover all available agents.
- Show a concise description of each agent's purpose.
- Provide access to Advisors, Accessories, Books, and About us.
- Allow language switching.
- Make the platform feel calm, inclusive, and approachable.

## Page Structure

### 1. Header

The header should contain:

- Inclusion brand icon
- Inclusion name
- Language selector

The language selector should be visible and easy to use on the first screen.

### 2. Project Introduction

The introduction should be short and immediately understandable.

**Proposed English copy:**

> Inclusion helps schools and families support autistic children with practical, role-specific guidance. Choose an advisor for classroom support or a general understanding of autism.

The introduction must not imply diagnosis, therapy, or guaranteed outcomes.

### 3. Advisors

This section is the primary content of the main menu.

All three active advisors should be visible together in a simple responsive grid.

Each agent card should contain:

- Agent icon or avatar
- Agent name
- One-sentence description
- A clear call to action
- Optional availability or scope label

**Required agent names and descriptions:**

| Agent | Short description |
| --- | --- |
| Teacher Guide | Practical classroom guidance for teachers, situations, and inclusion. |
| Classroom Aide Agent | In-the-moment support for routines, de-escalation, and classroom collaboration. |
| ASD Guide | Clear, general information about autism and school-relevant support. |

### Advisor identity

Each advisor should have:

- A friendly, memorable name in addition to its functional role name.
- A distinct face or avatar.
- A dedicated identity color.
- A short description of what the advisor can help with.

**Proposed friendly names:**

| Functional name | Friendly name |
| --- | --- |
| Teacher Guide | Maya |
| Classroom Aide Agent | Daniel |
| ASD Guide | Ari |

The advisor's face and identity color should appear in the advisor card and throughout the advisor detail page. The friendly name may lead the interface, while the functional role remains visible for clarity.

The Teacher Guide should remain the clearest starting point for initial user testing. ASD Guide content should address school teams and support understanding across the school community.

### Advisor readiness

Each advisor must expose an explicit readiness state:

- The Teacher Guide is the only advisor whose content is available in the MVP.
- Classroom Aide and ASD Guide content are not ready yet.
- Cards for these unready advisors remain visible for future discoverability.
- Unready cards show "The advisor is not ready yet."
- Unready cards must not open chat or imply that content is available.
- Selecting an unready advisor should open an informational state, not a broken page.

### 4. Main Navigation

The main menu should expose four primary destinations:

1. **Advisors**
2. **Accessories**
3. **Books**
4. **About us**

**Destination behavior:**

- **Advisors:** Opens or scrolls to the agent selection area.
- **Accessories:** Opens tools or supportive resources planned for the platform. The MVP should explain that this area is available only if content exists.
- **Books:** Opens approved educational books or resource material.
- **About us:** Opens product mission, team or organization information, privacy principles, and professional boundaries.

For the MVP, a destination should not be displayed as completed if no real content or workflow exists.

## Language Selector

### Supported languages

- English
- Hebrew
- Arabic

### Rollout decision

The implementation order is:

1. English: MVP and initial development language.
2. Hebrew: first localized language after English copy and flows are stable.
3. Arabic: final planned language, pending voice and text-quality validation.

The language selector should show all three languages, but a not-yet-supported language must not appear as a selectable live option unless the product owner decides to expose it as coming soon.

**Required MVP behavior:**

- Default language is English.
- Remembering the user's last selected language is not required for MVP.
- Hebrew must trigger right-to-left layout when implemented.
- Arabic must trigger right-to-left layout when implemented.
- Agent names and descriptions should be localized together; mixed-language cards are not acceptable.
- Untranslated content must not be silently shown in another language.

## Layout

### Desktop

- Header across the top
- Brief introduction below the header
- Primary navigation prominently visible
- Agent cards in a maximum of 2-3 columns
- All three active advisors visible without a carousel

### Mobile

- Header with compact brand and language control
- Introduction above the agents
- Primary navigation available as tabs or a clear compact menu
- Agent cards in a single column
- Long descriptions truncated only by the card layout, not by the number of agents

### Responsive Rules

- No horizontal page scrolling.
- Agent cards should remain equal in visual priority.
- Text should scale without overlap or loss.
- Language direction should update the full page, not only the text.

## Visual and Interaction Requirements

- Use the Inclusion brand icon consistently.
- Use calm, accessible colors and strong text contrast.
- Give each advisor a distinct professional color used consistently on its card, icon area, and active state.
- When an advisor is selected, retain that advisor's color in the conversation header or active badge so the user always knows which advisor is in use.
- Never rely on color alone; include the advisor name in the active state.
- Each agent card should be keyboard accessible.
- Selecting an agent should open or route to that agent's conversation.
- The main navigation and language selector should be reachable by keyboard.
- Avoid playful or medical imagery that may imply diagnosis or therapy.
- Do not use claims such as "cures," "treats," or "guarantees."
- Keep actions obvious and avoid nested menus on the first screen.

## Content Hierarchy

The main menu should prioritize content in this order:

1. Project introduction
2. Advisors
3. Main navigation
4. Optional supporting content

About us and educational resources are important but should not compete with agent selection on the first screen.

## Accessibility Requirements

- WCAG 2.2 AA target.
- Minimum clear text contrast.
- Visible keyboard focus.
- Meaningful accessible names for agent cards and language controls.
- Screen-reader announcement when the language changes.
- Right-to-left support for Hebrew and Arabic.
- No information conveyed by color alone.

## Empty and Future States

- If an agent is unavailable, show the agent name and a "Coming soon" label rather than hiding the entire card.
- If Accessories or Books has no content, show a clear empty state and return action.
- Do not show placeholder sample content as a real product result.

## MVP Acceptance Criteria

1. A first-time user immediately understands that the platform offers role-specific advisors.
2. All three active advisors are visible from the main menu.
3. Every agent card includes a name and short, accurate description.
4. Selecting an agent opens or routes to a working agent experience.
5. The page exposes Advisors, Accessories, Books, and About us.
6. English is the default language.
7. Hebrew and Arabic appear according to the rollout decision.
8. The layout remains usable on desktop and mobile.
9. The project does not imply diagnosis or treatment.
