# School.Event

A campus event discovery and management app for the CodePath WEB103 final project.

## About

School.Event will give students and organizers one place to find and manage campus events. Students will be able to browse upcoming events, view details, and RSVP as "Going" or "Interested." Organizers will be able to create, update, and remove event posts.

Campus announcements often appear across flyers, group chats, and club social media accounts. School.Event aims to make events easier to discover and help organizers reach students beyond their existing members.

### Inspiration

The idea came from Homecoming Week, when many events relied on paper posters for publicity. A shared online event list could help students discover activities and express interest in attending. It could also give smaller events organized by students or alumni more visibility.

## Team

- Yannick-David Udechukwu
- Grace Sodipo
- Adhik Adhikari
- Kavya Gautam

## Project status

The initial React frontend and basic Express backend are implemented. The home page loads six sample events from the API, and each event opens a dedicated details page. The design follows the noticeboard wireframes from Milestone 2.

This pass uses read-only sample data in `server/data/events.js`. PostgreSQL persistence, event creation/editing/deletion, filtering, and RSVP remain for later passes. The app is not deployed yet.

Work is tracked on the [WEB103-Final-Project board](https://github.com/orgs/web103-final-project/projects/1). The board is private, and the grading account **codepathreview** has Reader access.

The [Milestone 3 Progress Report](milestones/progress_report_3.md) records the GitHub setup, issue titles, milestones, and completed frontend/API work for grading.

## Features

- [x] **✅ Browse school events.** Load sample events from Express and view their title, date, time, location, and category. Tracked in [issue #3](https://github.com/web103-final-project/school.Event/issues/3).

  ![Browse sample campus events](docs/demos/browse-events.gif)

- [ ] **Create events.** Post an event with a title, description, date, location, and category. Tracked in [issue #1](https://github.com/web103-final-project/school.Event/issues/1).
- [ ] **Edit events.** Update an existing event's date, time, location, or description. Tracked in [issue #2](https://github.com/web103-final-project/school.Event/issues/2).
- [ ] **Delete events.** Remove canceled events or posts that are no longer relevant. Tracked in [issue #10](https://github.com/web103-final-project/school.Event/issues/10).
- [ ] **RSVP to events.** Select "Going" or "Interested" without leaving the event page. Tracked in [issue #5](https://github.com/web103-final-project/school.Event/issues/5).
- [ ] **Filter events by category.** Find events in categories such as academic, social, sports, and career. Tracked in [issue #11](https://github.com/web103-final-project/school.Event/issues/11).
- [ ] **Sort events by date.** Arrange events by date to plan a schedule. Tracked in [issue #11](https://github.com/web103-final-project/school.Event/issues/11).
- [ ] **Validate event submissions.** Reject invalid dates and missing or inconsistent form values before saving. Tracked in [issue #12](https://github.com/web103-final-project/school.Event/issues/12).
- [x] **✅ View event details.** Open a dedicated sample event page with its description, date, time, location, category, and host. Direct URL reloads, missing events, and request failures are handled. RSVP controls remain planned. Tracked in [issue #4](https://github.com/web103-final-project/school.Event/issues/4).

  ![Open an event and return to the board](docs/demos/browse-events.gif)

## Technology stack

| Layer | Technology |
| --- | --- |
| Frontend | React with React Router |
| Backend | Node.js with Express |
| Database, planned | PostgreSQL |
| Deployment, planned | Render |

The [database design](planning/entity_relationship_diagram.md) defines categories, events, students, and RSVPs. A category can contain many events. The RSVP join table connects students and events and stores each student's response.

## Planning documents

- [User stories](planning/user_stories.md) describe the student and organizer roles and their needs.
- [Wireframes](planning/wireframes.md) cover the home, event details, create event, and edit event pages.
- [Entity relationship diagram](planning/entity_relationship_diagram.md) describes the planned tables and database relationships.
- [Development plan](planning/development_plan.md) separates the implemented sample-data pass from the remaining milestone work.

## Course milestones

| Unit | Deliverable | Status |
| --- | --- | --- |
| Unit 5 | [Milestone 1: project definition and user stories](milestones/milestone1.md) | Complete |
| Unit 6 | [Milestone 2: wireframes, database design, and pitch preparation](milestones/milestone2.md) | Complete |
| Unit 7 | [Milestone 3: project management and initial frontend/API](milestones/milestone3.md) | Complete |
| Unit 8 | [Milestone 4: implementation progress](milestones/milestone4.md) | Planned |
| Unit 9 | [Milestone 5: deployment and final demonstration](milestones/milestone5.md) | Planned |

The [GitHub milestones](https://github.com/web103-final-project/school.Event/milestones?state=all) track the issues assigned to each unit.

## Local setup

Use Node.js 22.12 or newer and npm. No database or environment file is required for this pass.

```bash
npm ci
npm run dev
```

Open [the frontend](http://127.0.0.1:5173). Express runs at `http://127.0.0.1:3001`; Vite forwards `/api` requests to it. Stop both processes with Ctrl+C.

```bash
npm test
npm run build
```

The tests exercise the API over HTTP. The build writes the frontend to `dist/`. To inspect the production frontend locally, run `npm run dev:server` in one terminal and `npm run preview` in another.

## API routes

| Method | Route | Response |
| --- | --- | --- |
| GET | `/api/health` | API health status. |
| GET | `/api/events` | All six sample events. |
| GET | `/api/events/:eventId` | One event, or a JSON 404 response. |

Frontend routes are `/` and `/events/:eventId`. Unknown frontend addresses show a page-not-found message. API write operations are outside this pass.

## Repository layout

- `client/src/pages/` contains the home and event details pages.
- `client/src/components/` contains event cards, metadata, and request-state messages.
- `client/src/api.js` loads API data and supports retry after errors.
- `client/src/styles.css` contains the noticeboard styling and responsive layouts.
- `server/app.js` defines the read-only API; `server/index.js` starts it.
- `server/data/events.js` holds the sample events for replacement with database queries later.
- `server/app.test.js` verifies list, detail, health, and missing-route behavior.

## Image sources

Sample event photos are stored locally for reliable loading. Original photos are from Unsplash:

- [Club Expo](https://images.unsplash.com/photo-1517486808906-6ca8b3f04846)
- [Guest lecture](https://images.unsplash.com/photo-1540575467063-178a50c2df87)
- [Career fair](https://images.unsplash.com/photo-1516321318423-f06f85e504b3)
- [Soccer](https://images.unsplash.com/photo-1574629810360-7efbbe195018)
- [Pancakes](https://images.unsplash.com/photo-1528207776546-365bb710ee93)
- [Open mic](https://images.unsplash.com/photo-1516280440614-37939bbacd81)
