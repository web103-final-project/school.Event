# School.Event

A campus event discovery and management app for the CodePath WEB103 final project.

## Live Demo

School.Event is deployed on Render.

[Visit School.Event](https://school-event-kgni.onrender.com/)

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

The React noticeboard and Express API are backed by PostgreSQL. Students can browse, filter, and sort events, open an event, and create, edit, or delete posts. Server validation rejects incomplete or inconsistent submissions. RSVP controls are implemented on the event page (issue #5) and are awaiting database migration and team verification. The deployed walkthrough remains for the final milestone.

Work is tracked on the [WEB103-Final-Project board](https://github.com/orgs/web103-final-project/projects/1). The board is private, and the grading account **codepathreview** has Reader access.

The [Milestone 3 Progress Report](milestones/progress_report_3.md) records the GitHub setup, issue titles, milestones, and completed frontend/API work for grading.

## Features

- [x] **✅ Browse school events.** Load sample events from Express and view their title, date, time, location, and category. Tracked in [issue #3](https://github.com/web103-final-project/school.Event/issues/3).

  ![Browse sample campus events](docs/demos/browse-events.gif)

- [x] **✅ Create events.** Post an event with a title, description, date, location, and category. Tracked in [issue #1](https://github.com/web103-final-project/school.Event/issues/1).

  ![Post an event and open its page](docs/demos/create-event.gif)

- [x] **✅ Edit events.** Update an existing event's date, time, location, or description. Tracked in [issue #2](https://github.com/web103-final-project/school.Event/issues/2).

  ![Edit an event and save the new location](docs/demos/edit-event.gif)

- [x] **✅ Delete events.** Remove canceled events or posts that are no longer relevant. Tracked in [issue #10](https://github.com/web103-final-project/school.Event/issues/10).

  ![Remove an event and return to the board](docs/demos/delete-event.gif)

- [x] **RSVP to events.** Select "Going" or "Interested" without leaving the event page. The choice is saved in PostgreSQL and restored after a refresh. Implemented and awaiting verification; see [RSVP](#rsvp). Tracked in [issue #5](https://github.com/web103-final-project/school.Event/issues/5).
- [x] **✅ Filter events by category.** Find events in categories such as academic, social, sports, and career. Tracked in [issue #11](https://github.com/web103-final-project/school.Event/issues/11).

  ![Filter by category and sort by date](docs/demos/filter-sort.gif)

- [x] **✅ Sort events by date.** Arrange events by date to plan a schedule. Tracked in [issue #11](https://github.com/web103-final-project/school.Event/issues/11).

  ![Filter by category and sort by date](docs/demos/filter-sort.gif)

- [x] **✅ Validate event submissions.** Reject invalid dates and missing or inconsistent form values before saving. Tracked in [issue #12](https://github.com/web103-final-project/school.Event/issues/12).

  ![Reject a past event time, then save a valid event](docs/demos/create-event.gif)
- [x] **✅ View event details.** Open a dedicated sample event page with its description, date, time, location, category, and host. Direct URL reloads, missing events, and request failures are handled. RSVP controls remain planned. Tracked in [issue #4](https://github.com/web103-final-project/school.Event/issues/4).

  ![Open an event and return to the board](docs/demos/browse-events.gif)

## Technology stack

| Layer | Technology |
| --- | --- |
| Frontend | React with React Router |
| Backend | Node.js with Express |
| Database | PostgreSQL |
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
| Unit 8 | [Milestone 4: implementation progress](milestones/milestone4.md) | Complete |
| Unit 9 | [Milestone 5: deployment and final demonstration](milestones/milestone5.md) | Planned |

The [GitHub milestones](https://github.com/web103-final-project/school.Event/milestones?state=all) track the issues assigned to each unit.

## Local setup

Use Node.js 22.12 or newer, npm, and PostgreSQL. Copy the example environment file and point `DATABASE_URL` at your database. Do not commit `.env`.

```bash
npm ci
cp .env.example .env
npm run db:reset
npm run dev
```

`.env.example` uses `postgres://school:school@127.0.0.1:5432/school_event`. Create that local role and database, or change the URL. `npm run db:reset` drops and recreates the School.Event tables, then seeds six upcoming events and the RSVP demo student. It is a local command, not a public API route.

Open [the frontend](http://127.0.0.1:5173). Express runs at `http://127.0.0.1:3001`; Vite forwards `/api` requests to it. Stop both processes with Ctrl+C.

```bash
npm test
npm run build
```

The tests exercise the API over HTTP and reset the database named by `DATABASE_URL`. The build writes the frontend to `dist/`. To run the production setup locally, run `npm run build` and then `npm start`. Express then serves the built frontend and the API together at `http://127.0.0.1:3001`.

## Deploying to Render

School.Event runs on Render as **one web service**, which serves both the Express API and the built React app, plus **one PostgreSQL database**. In production, Express serves `dist/` and sends `index.html` for frontend routes such as `/events/3`, so refreshing a deep link works. Every `/api/...` request, including unknown API routes, gets a JSON response, never the React page. The frontend calls relative `/api/...` URLs, so it needs no API address setting.

### 1. Create the database

1. In the Render dashboard, choose **New → Postgres**.
2. Pick a name, the region you will also use for the web service, and a plan.
3. When it is available, open the database and copy the **Internal Database URL**. The web service uses it.

### 2. Create the web service

Choose **New → Web Service**, connect the GitHub repository, and use these settings:

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Root directory | *(leave blank: the repository root)* |
| Runtime | Node |
| Build command | `npm ci --include=dev && npm run build` |
| Start command | `npm run db:init && npm start` |
| Health check path | `/api/health` |

`--include=dev` keeps Vite installed for the build even when `NODE_ENV=production` is set.

### 3. Environment variables

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | The database's **Internal Database URL**. Required. |
| `NODE_ENV` | `production`. Recommended. |
| `NODE_VERSION` | `22.12.0` or a newer 22.x/24.x release. Optional; `package.json` already requires Node ≥ 22.12. |

Don't set `PORT`: Render provides it, and the server binds to `0.0.0.0` on Render automatically. Never commit the database URL. Add it only in Render's **Environment** settings.

### 4. Database initialization

`npm run db:init` runs before the server on every start. It is safe to repeat:

- It creates any missing tables (`categories`, `events`, `students`, `rsvps`) with their foreign keys, `CHECK` constraints, and the one-RSVP-per-student-per-event constraint.
- It adds any missing categories and the RSVP demo student.
- It seeds the six sample events **only on a brand-new database**, when the `events` table doesn't exist yet. Later starts never re-add sample events, even if all events were deleted.
- It never drops, truncates, or updates existing rows. If the database can't be reached, the start fails with an error in the deploy logs instead of serving fake data.

**Never run `npm run db:reset` against the Render database.** It deletes all events and RSVPs.

To run `db:init` from your own computer instead, put the database's **External Database URL** in your local `.env` as `DATABASE_URL`, then run `npm run db:init`. Render requires SSL for external connections. If the connection is refused over SSL, append `?sslmode=no-verify` to that local URL.

### 5. Verify the deployment

Replace `https://your-app.onrender.com` with the service's URL.

1. **Health:** `https://your-app.onrender.com/api/health` returns `{"status":"ok"}`. This only shows that Express is running; the next step checks the database.
2. **Events from PostgreSQL:** `/api/events` returns the six sample events, and the home page shows them with photos.
3. **Routing:** open an event, refresh the page, and confirm it still loads. `/api/missing` should return the JSON error `{"error":"API route not found."}`.
4. **CRUD:** post an event, edit it, refresh to confirm the change persisted, then remove it.
5. **RSVP:** on an event page, choose **Going**, refresh, and confirm it's still selected. Switch to **Interested** and refresh again. `/api/students/demo` should return the demo student.

### Free plan limitations

These were Render's free-plan limits at the time of writing. Check Render's pricing page for current terms.

- Free web services spin down after about 15 minutes without traffic. The next visit can take up to about a minute while the service, including `db:init`, starts again.
- Free PostgreSQL databases expire 30 days after creation unless upgraded, have limited storage, and have no backups. Recreating one gives a new URL to update in `DATABASE_URL`; the next start then seeds fresh sample data.
- Free services have no shell or pre-deploy command, which is why initialization runs in the start command.

## API routes

| Method | Route | Response |
| --- | --- | --- |
| GET | `/api/health` | API health status. |
| GET | `/api/categories` | Category options for the board and forms. |
| GET | `/api/events` | Events, with optional `categoryId` and `sort=date_asc` or `sort=date_desc`. |
| GET | `/api/events/:eventId` | One event, or a JSON 404 response. |
| POST | `/api/events` | Validate and save an event. Returns 201, or 400 with field errors. |
| PATCH | `/api/events/:eventId` | Validate the resulting event and save changes. |
| DELETE | `/api/events/:eventId` | Delete an event and its RSVPs. Returns 204, or a JSON 404. |
| GET | `/api/students/demo` | The demo student used for RSVP, or a JSON 404 if it hasn't been seeded. |
| GET | `/api/events/:eventId/rsvp?student_id=:id` | The student's RSVP for the event, or `{ "rsvp": null }`. |
| POST | `/api/events/:eventId/rsvp` | Save or change the student's RSVP. Returns 201 when created and 200 when updated. |

Frontend routes are `/`, `/events/new`, `/events/:eventId`, and `/events/:eventId/edit`. Unknown frontend addresses show a page-not-found message.

## RSVP

On an event's page, a student chooses **Going** or **Interested** without leaving the page. The choice is stored in PostgreSQL and shown again after a refresh. Choosing the other option changes the existing RSVP. It does not add a second one.

### Database

| Table | Columns | Constraints |
| --- | --- | --- |
| `students` | `id`, `name`, `email` | `email` is unique. |
| `rsvps` | `id`, `student_id`, `event_id`, `status` | `status` must be `Going` or `Interested` (`rsvps_status_valid`). One row per student and event (`rsvps_student_event_unique`). Deleting an event or student deletes its RSVPs. |

Fresh installs get both tables from `server/schema.sql`, through `npm run db:init` (safe, used on Render) or `npm run db:reset` (local only). `db:init` also adds them to an older database that predates RSVP. To apply only the RSVP tables to such a database by hand, use the additive migration:

```bash
psql "$DATABASE_URL" -f server/migrations/001_add_students_and_rsvps.sql
```

The migration only creates missing tables and inserts the demo student if that email isn't already present. It doesn't drop or change categories or events, and it is safe to run more than once. You can also paste it into any SQL client connected to the database. RSVP needs no new environment variables; the API still uses only `DATABASE_URL` (and optionally `PORT`).

### Student identification (demo only)

School.Event has no sign-in. Every visitor RSVPs as one shared **Demo Student** (`demo.student@school.event`), seeded by `db:init`, `db:reset`, and the migration. The server finds this student by email, so no student id is hardcoded. This is **not authentication**: anyone can RSVP as the demo student, and the API trusts the `student_id` it receives. Replace it with real sign-in before using RSVP for real students.

### API

`GET /api/students/demo` returns `{ "id": 1, "name": "Demo Student", "email": "demo.student@school.event" }`. The id depends on the database.

`GET /api/events/:eventId/rsvp?student_id=1` returns:

```json
{ "rsvp": { "id": 7, "studentId": 1, "eventId": 3, "status": "Going" } }
```

or `{ "rsvp": null }` when the student hasn't responded.

`POST /api/events/:eventId/rsvp` with body `{ "student_id": 1, "status": "Interested" }` returns `{ "rsvp": { … } }`. It uses `INSERT … ON CONFLICT (student_id, event_id) DO UPDATE`, so a changed answer updates the same row.

| Status | When |
| --- | --- |
| 400 | Missing or invalid `student_id`, a missing status, or a status other than `Going`/`Interested`. The status is case-sensitive. |
| 404 | The event or student doesn't exist, or the event id is malformed (matching the other event routes). |
| 500 | Database or unexpected error. Returns a generic JSON message. |

All errors are JSON objects with an `error` message.

### Frontend

`client/src/components/RsvpControls.jsx` appears on `/events/:eventId` below the description. It loads the demo student, then that student's saved RSVP, and shows "Checking your RSVP…" until both arrive. Clicking an option sends a `POST`, disables both buttons and shows "Saving…" while waiting, and marks the option as selected only after the server confirms the save. If saving fails, the previous confirmed choice stays selected and an error explains that the RSVP wasn't saved; clicking again retries. Load failures show a message with a **Try again** button.

## Repository layout

- `client/src/pages/` contains the home, event details, and event form pages.
- `client/src/components/` contains event cards, metadata, RSVP controls, and request-state messages.
- `client/src/api.js` loads API data and supports retry after errors.
- `client/src/styles.css` contains the noticeboard styling and responsive layouts.
- `server/app.js` defines the API and, after a build, serves `dist/`; `server/index.js` starts it.
- `server/schema.sql`, `server/reset.js`, and `server/events.js` own the PostgreSQL schema, seed reset, and queries.
- `server/init.js` safely creates missing tables and first-time seed data (`npm run db:init`); `server/seed.js` holds the seed data shared with `server/reset.js`.
- `server/students.js` holds the demo student and RSVP queries; `server/migrations/` holds additive SQL for existing databases.
- `server/validate.js` checks an event before a create or update is written.
- `server/app.test.js` verifies the API, including writes, filters, RSVPs, and rejected submissions.

## Image sources

Sample event photos are stored locally for reliable loading. Original photos are from Unsplash:

- [Club Expo](https://images.unsplash.com/photo-1517486808906-6ca8b3f04846)
- [Guest lecture](https://images.unsplash.com/photo-1540575467063-178a50c2df87)
- [Career fair](https://images.unsplash.com/photo-1516321318423-f06f85e504b3)
- [Soccer](https://images.unsplash.com/photo-1574629810360-7efbbe195018)
- [Pancakes](https://images.unsplash.com/photo-1528207776546-365bb710ee93)
- [Open mic](https://images.unsplash.com/photo-1516280440614-37939bbacd81)
