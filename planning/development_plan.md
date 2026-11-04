# Development plan

The confirmed initial scope is a React frontend and a basic read-only Express backend using sample data. PostgreSQL and write operations enter scope in the next pass. Later milestone sections remain plans.

## Delivery approach

Build a working event-browsing flow with sample API data first. Add event management in Milestone 4, then RSVP and final delivery in Unit 9. Each pass ends with working behavior, verification, and a GIF.

Use React with Vite, React Router, Express, PostgreSQL, and the `pg` database client. Use JavaScript and ordinary CSS for the initial implementation. Keep the existing wireframes as the page references.

The team chose sample data for this pass to focus on the frontend and basic Express setup. Keep the list/detail API contract stable when PostgreSQL queries replace the sample array in Milestone 4.

## Data model

Use the four entities in the existing [database design](entity_relationship_diagram.md). Add tables when their behavior enters scope.

| Entity | Main fields | First used |
| --- | --- | --- |
| Category | ID, name | Sample label now; database in Milestone 4 |
| Event | ID, category ID, title, description, location, start time, end time, optional image URL | Sample object now; database in Milestone 4 |
| Student | ID, name, unique email | Final milestone |
| RSVP | Event ID, student ID, status | Final milestone |

An event belongs to one category. RSVP connects students to events, with one row per event/student pair. RSVP status is either `going` or `interested`.

Store event times as PostgreSQL timestamps with time zones. Return ISO timestamps from the API and format them for display in the browser. Seed upcoming events relative to the reset date so demonstrations do not depend on expired dates.

The proposed final app uses a clearly identified seeded demo student for RSVP. Authentication and ownership enforcement are outside this scope. The demo event-management pages allow shared editing and deletion.

The current user stories mention club pages and host clubs, but the database design uses categories. This plan follows the category design. Club pages and automatic organizer RSVPs need team agreement before entering scope.

## Milestone 3: browse and view events

Deliver two working pages backed by the sample events in `server/data/events.js`.

| Frontend route | Behavior |
| --- | --- |
| `/` | Show upcoming event cards with title, date, location, and category. |
| `/events/:eventId` | Show the selected event's full description, time, location, and category. Include navigation back to the event list. |
| Unmatched routes | Show a page-not-found message with a home link. |

| Backend route | Behavior |
| --- | --- |
| `GET /api/events` | Read the sample event list, ordered by start time. |
| `GET /api/events/:eventId` | Read one sample event and its category. Return 404 when it does not exist. |

Implement `GET /api/health`, a sample event data module, and JSON 404 responses. Document dependency installation and startup commands. Defer the database schema and reset command to Milestone 4.

Use page components for fetching and page state, with reusable event cards and layout components for presentation. Keep the API calls in a small frontend module. For the basic server, define the small route set in `server/app.js` and keep the listener separate in `server/index.js`. Add database queries and route modules as the next pass requires them. No generic service framework or global state library is needed.

Include loading, empty-list, request-error, and missing-event states. Ensure keyboard navigation, labeled links, and usable layouts on desktop and mobile.

Create, edit, delete, RSVP, filtering, and sort controls enter scope in later passes. Show those controls when their behavior works.

Acceptance checks:

- Install dependencies and start both applications using the documented commands.
- Confirm that the homepage receives six sample events from the Express API.
- Open an event and refresh its URL directly. Confirm that the correct details remain visible.
- Confirm useful empty-list, unavailable-server, invalid-ID, and nonexistent-event responses.
- Inspect desktop and mobile rendering, browser console output, and failed network requests.
- Record browsing and event details in a GIF. Add ✅ to those completed README features and update the Unit 7 report.

Issues #3 and #4 are complete for sample browsing and read-only details. Issue #4 explicitly defers RSVP controls to #5 and edit links to #2.

## Milestone 4: event management and two custom features

Build on the existing event pages and read-only API. Add PostgreSQL categories/events tables, database queries, and a repeatable seed/reset command before implementing writes. Document the database connection variable. Keep reset as a local server command rather than a public destructive endpoint.

| Frontend route or interaction | Behavior |
| --- | --- |
| `/events/new` | Create an event using a labeled form. Navigate to its details after saving. |
| `/events/:eventId/edit` | Prefill the same form with existing values and save changes. |
| Delete action on event details | Confirm deletion, remove the event, and return to the homepage. |
| Homepage category and date-order controls | Update the visible list without leaving the page. |

| Backend route | Behavior |
| --- | --- |
| `GET /api/categories` | Supply category options for forms and filtering. |
| `POST /api/events` | Validate and persist a new event. Return 201 with the saved event. |
| `PATCH /api/events/:eventId` | Validate the resulting event and persist changes. |
| `DELETE /api/events/:eventId` | Delete an existing event. Return 204 on success. |
| `GET /api/events?categoryId=...&sort=date_asc` | Extend the existing list route with category filtering and ascending or descending date order. |

Target two required custom features explicitly:

- Category filtering and date sorting, with the results updating on the current page.
- Server validation before POST and PATCH writes. Reject missing required values, unknown categories, invalid timestamps, past start times, and end times before start times.

Return readable field errors and preserve the form values when saving fails. Validate partial updates against the saved event plus submitted changes. Use parameterized SQL and constrain supported sort options.

Keep the database reset usable after schema changes. Test event creation, refresh persistence, editing, deletion, filtering, and rejected writes. Record GIFs, update feature checkmarks, and complete `milestone4.md` and the required `progress_report_4.md`.

Perform an early Render deployment check this week to test the production build, database connection, environment variables, and direct frontend URLs. Final deployment verification remains part of Unit 9.

Use the linked Milestone 4 issues below for persistence, creation, editing, deletion, filtering/sorting, and validation. All are planned and have board status Todo.

## Final milestone: RSVP and delivery

Add the students and RSVPs tables, seeded demo students, and the event/student uniqueness constraint. Extend the reset command to restore the full database in dependency order.

| Backend route | Behavior |
| --- | --- |
| `GET /api/events/:eventId/rsvp` | Return the demo student's saved selection, or no selection. |
| `PUT /api/events/:eventId/rsvp` | Insert or update the demo student's `going` or `interested` selection without duplicate rows. |

The server chooses the configured demo student. The UI identifies that student and makes no authentication claim. The initial RSVP feature supports changing between the two statuses; removing an RSVP is optional later work.

Add Going and Interested controls to event details. Persist the selection without page navigation and restore it after refresh. Show a clear error when saving fails.

Use issue #5 for RSVP. Aim to finish its implementation early in the final week, leaving the remainder for deployed testing and submission.

Final verification and submission tasks:

- Verify database persistence and all event CRUD flows on Render.
- Verify RSVP changes update one join-table row and survive refresh.
- Verify category filtering, date sorting, and rejected invalid submissions on the deployed app.
- Verify direct event URLs and all visible controls on desktop and mobile.
- Check console errors, failed network requests, empty states, and missing-event behavior.
- Add the deployment URL and verified setup instructions to the README.
- Record per-feature GIFs and the complete walkthrough required by `milestone5.md`.
- Complete the final baseline/custom feature checklist and reflections using only demonstrated behavior.
- Reconcile board statuses, issue closure, and milestone progress before submission.

## Final rubric coverage

| Requirement | Planned evidence |
| --- | --- |
| React frontend and Express backend | Running browser-to-API flow from Milestone 3 onward. |
| PostgreSQL one-to-many relationship | Categories to events in Milestone 4. |
| PostgreSQL many-to-many relationship with a join table | Students to events through RSVP in the final milestone. |
| GET, POST, PATCH, and DELETE for one entity | Events API complete in Milestone 4. |
| Database reset | Documented reset command introduced in Milestone 4 and extended for RSVP. |
| Dynamic frontend and backend routes | Event details in Milestone 3. |
| Navigation to a new URL | Event card to details, then form save to details. |
| Interaction without page navigation | Filtering in Milestone 4 and RSVP in the final milestone. |
| Hierarchical page and presentation components | Page components, shared layout, event cards, and a shared event form. |
| Two custom features | Filtering/sorting and server-side submission validation in Milestone 4. |
| Working Render deployment | Early check in Milestone 4, complete deployed verification in the final milestone. |

## GitHub work by milestone

Milestone 3 is complete with [browsing #3](https://github.com/web103-final-project/school.Event/issues/3), [read-only event details #4](https://github.com/web103-final-project/school.Event/issues/4), and [project management #8](https://github.com/web103-final-project/school.Event/issues/8).

Milestone 4 contains the next implementation pass:

- [PostgreSQL persistence and database reset #9](https://github.com/web103-final-project/school.Event/issues/9).
- [Create events #1](https://github.com/web103-final-project/school.Event/issues/1).
- [Edit events #2](https://github.com/web103-final-project/school.Event/issues/2).
- [Delete events #10](https://github.com/web103-final-project/school.Event/issues/10).
- [Category filtering and date sorting #11](https://github.com/web103-final-project/school.Event/issues/11).
- [Server-side submission validation #12](https://github.com/web103-final-project/school.Event/issues/12).

The final milestone contains:

- [Persistent RSVP #5](https://github.com/web103-final-project/school.Event/issues/5).
- [Render deployment and complete verification #13](https://github.com/web103-final-project/school.Event/issues/13).
- [Final walkthrough and submission documentation #14](https://github.com/web103-final-project/school.Event/issues/14).

Start with persistence, then implement event writes and the two custom features. Run the early deployment checkpoint in issue #13 during Milestone 4. Finish RSVP early in the final week and reserve the remaining time for deployed verification and grading evidence.

## Scope limits

Search, club pages, authentication, image uploads, automatic organizer RSVPs, and additional stretch features are outside the proposed two-week delivery scope. Existing wireframes or stories that mention them do not make them implemented features.

If time becomes tight, simplify presentation and optional media before cutting required CRUD, database relationships, the reset command, the two selected custom features, or deployment verification.

Track initial browsing and read-only details in Milestone 3 after verification. Keep event management and RSVP issues in their later milestones. Record the sample-data limitation and the actual GIF evidence in the Unit 7 report.
