# Milestone 4

This document should be completed and submitted during **Unit 8** of this course. You **must** check off all completed tasks in this document in order to receive credit for your work.

## Planned sprint scope

Build on the working React noticeboard and read-only sample Express API. The next pass adds PostgreSQL persistence, a seed/reset command, event creation/editing/deletion, category filtering, date sorting, and server validation. Filtering/sorting and validation are the two selected custom features.

Implement persistence before write flows. Perform an early Render check for production build commands, API routing, environment variables, and database connectivity. Full deployment verification and RSVP remain in the final milestone.

See the [development plan](../planning/development_plan.md) for routes, acceptance checks, and GitHub issue links. The sprint below is complete. RSVP and full deployment verification remain in the final milestone.

## Checklist

This unit, be sure to complete all tasks listed below. To complete a task, place an `x` between the brackets.

- [x] Update the completion percentage of each GitHub Milestone. The milestone for this unit (Milestone 4 - Unit 8) should be 100% completed when you submit for full points.
- [x] In `readme.md`, check off the features you have completed in this unit by adding a ✅ emoji in front of the feature's name.
  - [x] Under each feature you have completed, include a GIF showing feature functionality.
- [x] In this document, complete all five questions in the **Reflection** section below.
- [x] Complete [progress_report_4.md](progress_report_4.md) with the actual completion percentage, completed issue titles and file paths, and demonstrated features.

## Reflection

### 1. What went well during this unit?

We kept the event list and detail responses stable while moving those reads onto PostgreSQL. Building the categories and events tables, plus a repeatable reset command, first meant create, edit, delete, filtering, and validation all used the same saved events. The homepage can now narrow that list by category and date without leaving the page, and invalid submissions come back as field errors instead of changing the database.

### 2. What were some challenges your group faced in this unit?

Connecting the API to PostgreSQL took more setup than the sample-data pass. We had to keep `DATABASE_URL` out of git, make reset restore upcoming demo dates, and teach the forms to preserve what the user typed when the server rejects a save. Partial edits were also tricky, because validation has to check the saved event plus the submitted changes, not only the fields in the request.

### 3. Did you finish all of your tasks in your sprint plan for this week? If you did not finish all of the planned tasks, how would you prioritize the remaining tasks on your list?

We finished the Milestone 4 issues: PostgreSQL persistence and reset, create, edit, delete, category filtering and date sorting, and server-side validation. RSVP and the full Render verification were planned for the final milestone, so they are still open. We would build RSVP next, because it is the remaining required relationship, and then use the leftover time to verify the deployed app.

### 4. Which features and user stories would you consider “at risk”? How will you change your plan if those items remain “at risk”?

RSVP and deployment are the items still at risk. The app now has the one-to-many relationship from categories to events, but the many-to-many RSVP join table is not built yet. If that work slips, we will add the students and RSVPs tables and the demo student's Going and Interested control before polishing the deployed walkthrough. Search and club pages stay out of scope.

### 5. What additional support will you need in upcoming units as you continue to work on your final project?

We will need a Render PostgreSQL database and a check that the production build can reach the API with `DATABASE_URL` set. A review of the deployed event URLs, including create, edit, and direct detail links, would help before the final submission. We do not need extra libraries for the remaining RSVP work.
