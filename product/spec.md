# Product Spec

## Product

Inclusion is a school-focused knowledge-sharing platform helping educators and school teams understand and include autistic students, in collaboration with their families.

## Purpose

Document product requirements, scope, decisions, and acceptance criteria here.

## Platform Concept

Inclusion is a school-focused platform that gives teachers, classroom aides, and school teams role-specific, practical guidance about supporting autistic students. It also offers a general educational guide to autism. Where appropriate, school-facing advisors can use information shared with parental consent.

The platform is not a substitute for clinicians, therapists, emergency services, or qualified professionals.

## Core Content Principle

The core value of Inclusion is high-quality, expert-written content. The product should not depend on loosely generated answers or pretend that AI has created trusted guidance.

The MVP, advisor catalog, and future chat agent should be grounded in curated questions and answers written or reviewed by qualified professionals and domain experts. Expert content must be:

- Accurate and specific to the advisor's role
- Practical rather than theoretical
- Reviewed before publication
- Dated and attributable to responsible authors or reviewers
- Clearly distinguishable from draft, internally reviewed, or AI-suggested content
- Updated when guidance, law, policy, or educational practice changes

AI chat may later help users navigate this expert content or draft suggestions, but it must not introduce unsupported advice as though it were expert-reviewed.

## Core Principles

1. **Role-specific guidance:** Each agent answers for the context and responsibilities of its user.
2. **Child-aware context:** School-facing advisors use an appropriately scoped, parental-consented understanding of the student so guidance remains consistent across teachers and aides.
3. **Safety and escalation:** Agents must identify emergencies and crisis indicators, avoid giving unsafe or diagnostic guidance, and direct users to appropriate professionals or services.
4. **Clear boundaries:** Every agent must state when a request is outside its scope and route the user to the relevant agent or a professional.
5. **Practical output:** Responses should be situation-based, understandable, and oriented toward immediate safe next steps.
6. **Localization:** The platform must support relevant languages and school contexts. Hebrew and English are the initial languages; Arabic remains a later localization goal.

## Target Users

### Primary users

- **Elementary school teachers and subject teachers:** Need classroom-level guidance on behavior, communication, sensory needs, transitions, conflicts, and whether an aide is available.
- **One-on-one classroom aides:** Need in-the-moment guidance on routines, de-escalation, participation, boundaries, and reporting.
- **School support staff:** Need a clear, general understanding of autism and practical ways to support inclusion.

### Supporting stakeholders

- Parents and guardians, as collaborators with the school
- School administrators
- Ministry of Education representatives
- Clinicians and therapists

## Agents

### 1. Teacher Guide

**Primary users:** Homeroom and subject teachers in elementary schools.

**Responsibilities:**

- Explain typical behaviors and appropriate responses.
- Support meltdowns, transitions, sensory overload, social conflicts, and classroom distress.
- Adapt guidance based on whether a one-on-one aide is present.
- Provide concrete situation-and-response examples.
- Explain how to communicate with the aide and parent.

**Example request:**

> The child covered their ears and left the room. What should I do now?

**Required inputs:**

- Classroom role and student age or grade
- Whether an aide is present
- The observed situation
- Known sensitivities or agreed support plan
- Any immediate safety concerns

**Boundaries:**

- Does not diagnose or prescribe therapy.
- Does not replace the aide, school principal, student support team, or clinician.
- Escalates immediate physical danger or self-harm concerns.

### 2. Classroom Aide Agent

**Primary users:** A child's one-on-one aide.

**Responsibilities:**

- Support daily routines and transitions.
- Guide de-escalation and crisis prevention.
- Help the aide decide when to intervene and when to give space.
- Clarify collaboration with the teacher.
- Define appropriate observations and reports for parents.

**Required inputs:**

- Aide and teacher context
- Observed behavior and setting
- Current routine or transition
- Known supports and parental-consented child profile
- Immediate safety concerns

**Boundaries:**

- Does not direct restraint or other unsafe interventions.
- Does not act as a medical or behavioral clinician.
- Refers significant, repeated, or unclear patterns to the responsible professional.

### 3. ASD Guide

**Primary users:** Teachers, classroom aides, and school support teams; families may use it as a shared educational reference.

**Responsibilities:**

- Explain autism-related concepts in clear, respectful, non-stereotyping language.
- Cover communication, sensory experiences, strengths, support needs, and inclusion in school.
- Correct common misconceptions using reviewed, sourced content.
- Help school staff understand how general information relates to classroom support.

**Boundaries:**

- Provides general education, not individual diagnosis or clinical assessment.
- Does not prescribe medication, therapy, or treatment.
- Directs individual medical or diagnostic concerns to a qualified professional.
- Defers classroom-specific implementation to the Teacher Guide or Classroom Aide advisor.

## Consistency Model

All role-specific agents should reference a shared child profile containing information approved by the parent. The profile may include:

- Communication preferences
- Sensory and environmental needs
- Known triggers and calming supports
- Current routines and school arrangements
- Educational and professional plans
- Parental communication preferences

Agents must not expose or infer information outside their authorized scope. A parent should be able to review, edit, revoke, or withdraw consent for shared profile fields.

## Safety Requirements

- Detect emergency, crisis, abuse, neglect, self-harm, or immediate physical-danger indicators.
- Provide a clear, direct escalation response and route to local emergency or professional resources.
- Avoid diagnostic conclusions, prescriptive medical advice, unsafe restraint guidance, and guarantees of outcomes.
- Make confidence and uncertainty visible when guidance is derived from uncertain or changing information.
- Maintain an audit trail for sensitive school, privacy, and safety decisions.

## Localization and Information Currency

- School-specific content should clearly state its applicable education context.
- Content and speech quality must be tested in Hebrew and English; Arabic remains a later localization goal.
- Product interfaces should support Hebrew right-to-left presentation.

## Example End-to-End Workflows

### Teacher receives a classroom scenario

1. Teacher opens the Teacher Guide.
2. Teacher identifies whether an aide is present and describes what happened.
3. Agent asks only necessary clarifying questions.
4. Agent returns immediate, role-appropriate steps and escalation criteria.
5. Agent suggests what to record or communicate to the aide or parent.

### School staff asks a general autism question

1. The user opens the ASD Guide.
2. The user browses or searches expert-reviewed educational content.
3. The guide explains the concept, avoids stereotypes, and links to school-specific guidance where relevant.
4. The guide refers individual diagnostic or treatment questions to a qualified professional.

## MVP Scope

The MVP should validate usefulness, safety, and agent role differentiation. The proposed MVP includes:

- Teacher Guide
- Classroom Aide Agent
- ASD Guide
- Basic shared child profile with parental consent
- English content with a partial Hebrew preview
- Text-first interface
- Safety and professional escalation behavior
- Product demo with recorded or controlled avatar conversations

## Deferred or Later

- Reconsideration of non-school-focused advisor concepts only through a future product decision
- Arabic localization and conversational quality validation
- Public availability for parents and investors
- Live conversational avatars at scale

## Open Decisions

- What should the initial ASD Guide categories and expert reviewers be?
- Which interface modality should launch: text-first, text plus avatar, or live avatar?
- How should consent and child-profile fields be represented and revoked?
- Which local emergency and professional resources must be included?
- What evidence and review process is required before a content answer is published?
- What are the minimum accessibility, privacy, and safety requirements for the MVP?

## Detailed Agent Specifications

- [Teacher Guide](teacher-guide.md)
- [Main Menu](main-menu.md)
- [Advisor Experience](advisor-experience.md)
- [Content Management](content-management.md)
- [Product Decisions](decisions.md)
