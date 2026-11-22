# Product Spec

## Product

Inclusion is a knowledge-sharing platform connecting parents, educators, and professionals to promote understanding and inclusion of autistic children.

## Purpose

Document product requirements, scope, decisions, and acceptance criteria here.

## Platform Concept

Inclusion is an AI-agent platform that gives people supporting a child on the autism spectrum role-specific, practical guidance. The platform is designed around a dedicated avatar for each relevant role, with access to a shared understanding of the child where the parent has granted consent.

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
2. **Child-aware context:** Agents share a parental-consented understanding of the child so guidance remains consistent across teachers, aides, siblings, and parents.
3. **Safety and escalation:** Agents must identify emergencies and crisis indicators, avoid giving unsafe or diagnostic guidance, and direct users to appropriate professionals or services.
4. **Clear boundaries:** Every agent must state when a request is outside its scope and route the user to the relevant agent or a professional.
5. **Practical output:** Responses should be situation-based, understandable, and oriented toward immediate safe next steps.
6. **Localization:** The platform must support relevant local rules, languages, and service pathways. Israeli administration information requires frequent maintenance and versioning.

## Target Users

### Primary users

- **Elementary school teachers and subject teachers:** Need classroom-level guidance on behavior, communication, sensory needs, transitions, conflicts, and whether an aide is available.
- **One-on-one classroom aides:** Need in-the-moment guidance on routines, de-escalation, participation, boundaries, and reporting.
- **Older siblings aged 10-18:** Need age-appropriate support while the autistic sibling is approximately 6-10 years old.
- **Parents:** Need both administrative guidance and emotional support.

### Supporting stakeholders

- School administrators
- Ministry of Education representatives
- Municipality and tax-authority service providers
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

### 3. Older Sibling Agent

**Primary users:** Siblings aged 10-18.

**Responsibilities:**

- Explain the sibling's possible experiences and behavior in age-appropriate language.
- Help siblings manage difficult moments.
- Support healthy boundaries and help-seeking.
- Address embarrassment, resentment, protectiveness, guilt, and concern.
- Adapt tone and complexity to the sibling's age and maturity.

**Required inputs:**

- Sibling age
- Relationship and household context
- Situation or feeling to discuss
- Any immediate safety concern

**Boundaries:**

- Does not provide therapy or replace a trusted adult or mental-health professional.
- Protects private family and child information.
- Escalates disclosures that indicate abuse, self-harm, or immediate danger.

### 4. Administration Agent

**Primary user:** Parents.

**Responsibilities:**

- Explain applicable entitlements and benefits.
- Cover tax authorities, municipality services, evaluation committees, and Ministry of Education processes.
- Provide step-by-step application and submission guidance.
- Summarize required documents and likely next steps.
- Use current, sourced, and jurisdiction-specific information.

**Required inputs:**

- User location
- Child age and relevant eligibility context
- Benefit or process requested
- Deadline or current application stage
- Documents already available

**Boundaries:**

- Purely administrative; does not provide emotional or clinical advice.
- Must identify the source and effective date for every rule or entitlement.
- Must state when information may be outdated or requires official confirmation.
- Does not submit applications or make legal representations unless an explicit approved workflow is added.

### 5. Parent Companion Agent

**Primary user:** Parents.

**Responsibilities:**

- Provide empathetic, encouraging, hope-oriented conversation.
- Acknowledge hardship and normalize difficult feelings.
- Offer perspective and practical next steps.
- Help parents identify whether to involve a school, clinician, peer support, or emergency service.

**Required inputs:**

- Parent's concern or situation
- Desired level of support
- Any immediate safety concern

**Boundaries:**

- Does not diagnose or treat the child or parent.
- Does not provide therapy.
- Does not override clinical or professional advice.
- Escalates crisis and self-harm indicators with clear local resources.

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
- Maintain an audit trail for sensitive administrative and safety decisions.

## Localization and Information Currency

- The initial administrative scope should be Israeli services and processes.
- Administration answers must cite authoritative sources and include the source date or last-verification date.
- Rules and forms must be reviewed on a documented update cadence.
- Content and speech quality must be tested in Hebrew and Arabic, with English available for comparison.
- Product interfaces should support Hebrew right-to-left presentation.

## Example End-to-End Workflows

### Teacher receives a classroom scenario

1. Teacher opens the Teacher Guide.
2. Teacher identifies whether an aide is present and describes what happened.
3. Agent asks only necessary clarifying questions.
4. Agent returns immediate, role-appropriate steps and escalation criteria.
5. Agent suggests what to record or communicate to the aide or parent.

### Parent administers a benefit

1. Parent opens the Administration Agent.
2. Parent describes the benefit or application stage.
3. Agent identifies location, eligibility context, documents, and deadlines.
4. Agent provides a sourced checklist and step-by-step workflow.
5. Agent directs the parent to official confirmation when the information is uncertain or changing.

### Sibling asks for support

1. Sibling enters or selects their age.
2. The agent asks what happened or how the sibling feels.
3. The agent responds with age-appropriate empathy and practical language.
4. The agent encourages boundaries and a trusted adult where appropriate.
5. The agent escalates self-harm or danger disclosures.

## MVP Scope

The MVP should validate usefulness, safety, and agent role differentiation. The proposed MVP includes:

- Teacher Guide
- Classroom Aide Agent
- Older Sibling Agent
- Parent Companion Agent
- Basic shared child profile with parental consent
- Hebrew and English conversational support
- Text-first interface
- Safety and professional escalation behavior
- Product demo with recorded or controlled avatar conversations

## Deferred or Later

- Full Administration Agent integration
- Live government-data synchronization
- Application submission on behalf of users
- Arabic conversational quality if provider validation succeeds
- Public availability for parents and investors
- Live conversational avatars at scale

## Open Decisions

- Which agent should lead initial implementation and content validation?
- Which interface modality should launch: text-first, text plus avatar, or live avatar?
- How should consent and child-profile fields be represented and revoked?
- What authoritative sources and update cadence should be used for Israeli administration?
- Which local emergency and professional resources must be included?
- What evidence and review process is required before a content answer is published?
- What are the minimum accessibility, privacy, and safety requirements for the MVP?

## Detailed Agent Specifications

- [Teacher Guide](teacher-guide.md)
- [Main Menu](main-menu.md)
- [Advisor Experience](advisor-experience.md)
- [Content Management](content-management.md)
