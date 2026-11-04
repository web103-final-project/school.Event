# User Stories

Reference the Writing User Stories final project guide in the course portal for more information about how to complete each of the sections below.

## Outline User Roles

1. Student (Attendee)
2. Organizer (Club Execs, Student Organizer)

## Delivery scope

Stories 1 and 2 work with sample data in the initial frontend/API. Story 10 is implemented for the current read-only flows; write-operation errors remain future work.

Milestone 4 targets event creation, editing, deletion, category filtering, date sorting, and validation using PostgreSQL. The final milestone adds persistent RSVP. Club pages in story 4 and automatic organizer RSVPs in story 6 are deferred beyond the current delivery scope.

Authentication and ownership restrictions are not implemented. The proposed demo uses shared event management and an identified demo student for RSVP. See the [development plan](development_plan.md) for the remaining work.

## User stories

1. As a student, I want to see all upcoming campus events in one place, so that I don’t miss things happening at my school.
2. As a student, I want to open an event’s page to see its full details, so that I know when and where it is and what to expect.
3. As a student, I want to RSVP as “Going” or “Interested” without leaving the page, so that I can respond quickly while browsing.
4. As a student, I want to visit a club’s page, so that I can see all the events a group I like is hosting.
5. As an organizer, I want to create an event with a title, description, time, location, host name, and category, so that students can find out about it.
6. As an organizer, I want to be automatically marked as “Going” to events I create, so that I don’t have to RSVP to my own event.
7. As an organizer, I want to delete an event, so that cancelled events don’t confuse students.
8. As an organizer, I want the app to warn me if I enter invalid details, such as a date in the past or an end time before the start time, so that I don’t post an event with mistakes.
9. As a student, I want to filter events by category and sort them by date, so that I can quickly find events that fit my interests and schedule.
10. As a student, I want to see a clear, friendly message when something goes wrong, such as a missing event or a server error, so that I understand what happened and what to do next.
