# Milestone 4 Progress Report

## Milestone 4 Completion

Completion percentage for Milestone 4 - Unit 8: 100%

- Add PostgreSQL persistence and database reset — `server/schema.sql`, `server/reset.js`, `server/db.js`
- Create event page — `client/src/pages/EventEditor.jsx`, `server/app.js`
- Edit event page — `client/src/pages/EventEditor.jsx`, `server/app.js`
- Delete events — `client/src/pages/EventDetails.jsx`, `server/app.js`
- Filter events by category and sort by date — `client/src/pages/Home.jsx`, `server/events.js`
- Validate event submissions before database writes — `server/validate.js`

## Features Completed This Unit

- PostgreSQL categories and events, with `npm run db:reset` restoring six upcoming demo events.
- Create an event at `/events/new` and open the saved event. GIF: [docs/demos/create-event.gif](../docs/demos/create-event.gif).
- Edit an event at `/events/:eventId/edit` and keep the change after refresh. GIF: [docs/demos/edit-event.gif](../docs/demos/edit-event.gif).
- Delete an event after confirmation and return to the board. GIF: [docs/demos/delete-event.gif](../docs/demos/delete-event.gif).
- Filter by category and sort by date on the homepage without leaving the page. GIF: [docs/demos/filter-sort.gif](../docs/demos/filter-sort.gif).
- Server validation rejects missing fields, unknown categories, invalid or past start times, and end times that are not after the start. Invalid requests leave stored rows unchanged. The create GIF shows a rejected time and then a saved event.

RSVP and the full Render verification remain in the final milestone.
