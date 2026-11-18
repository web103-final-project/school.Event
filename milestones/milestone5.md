# Milestone 5

This document should be completed and submitted during **Unit 9** of this course. You **must** check off all completed tasks in this document in order to receive credit for your work.

## Planned final sprint scope

Add the students and RSVP join table, persist Going/Interested selections, and extend the database reset for all tables. Complete Render deployment, verify the complete app, record feature GIFs and the final walkthrough, and finish the grading checklist and reflections.

That work is in the repository. The React app and Express API use PostgreSQL. Students can browse, filter, sort, open, create, edit, and delete events, and save an RSVP on the event page. Server validation rejects incomplete or inconsistent submissions. The boxes below are checked only for behavior the deployed walkthrough shows.

See the [development plan](../planning/development_plan.md) for issue links, routes, dependencies, and acceptance checks.

## Checklist

This unit, be sure to complete all tasks listed below. To complete a task, place an `x` between the brackets.

- [x] Deploy your project on Render
  - [x] In `readme.md`, add the link to your deployed project
- [x] Update the status of issues in your project board as you complete them
- [x] In `readme.md`, check off the features you have completed in this unit by adding a ✅ emoji in front of their title
  - [x] Under each feature you have completed, **include a GIF** showing feature functionality
- [x] In this document, complete the **Reflection** section below
- [x] 🚩🚩🚩**Complete the Final Project Feature Checklist section below**, detailing each feature you completed in the project (ONLY include features you implemented, not features you planned)
- [x] 🚩🚩🚩**Record a GIF showing a complete run-through of your app** that displays all the components included in the **Final Project Feature Checklist** below
  - [x] Include this GIF in the **Final Demo GIF** section below

## Final Project Feature Checklist

Complete the checklist below detailing each baseline, custom, and stretch feature you completed in your project. This checklist will help graders look for each feature in the GIF you submit.

### Baseline Features

👉🏾👉🏾👉🏾 Check off each completed feature below.

- [x] The project includes an Express backend app and a React frontend app
- [x] The project includes these backend-specific features:
  - [x] At least one of each of the following database relationships in Postgres
    - [x] one-to-many
    - [x] many-to-many with a join table
  - [x] A well-designed RESTful API that:
    - [x] supports all four main request types for a single entity (ex. tasks in a to-do list app): GET, POST, PATCH, and DELETE
      - [x] the user can **view** items, such as tasks
      - [x] the user can **create** a new item, such as a task
      - [x] the user can **update** an existing item by changing some or all of its values, such as changing the title of task
      - [x] the user can **delete** an existing item, such as a task
    - [x] Routes follow proper naming conventions
  - [x] The web app includes the ability to reset the database to its default state
- [x] The project includes these frontend-specific features:
  - [x] At least one redirection, where users are able to navigate to a new page with a new URL within the app
  - [x] At least one interaction that the user can initiate and complete on the same page without navigating to a new page
  - [x] Dynamic frontend routes created with React Router
  - [x] Hierarchically designed React components
    - [x] Components broken down into categories, including Page and Component types
    - [x] Corresponding container components and presenter components as appropriate
- [x] The project includes dynamic routes for both frontend and backend apps
- [x] The project is deployed on Render with all pages and features that are visible to the user are working as intended

### Custom Features

👉🏾👉🏾👉🏾 Check off each completed feature below.

- [x] The project gracefully handles errors
- [ ] The project includes a one-to-one database relationship
- [ ] The project includes a slide-out pane or modal as appropriate for your use case that pops up and covers the page content without navigating away from the current page
- [x] The project includes a unique field within the join table
- [x] The project includes a custom non-RESTful route with corresponding controller actions
- [x] The user can filter or sort items based on particular criteria as appropriate for your use case
- [ ] Data is automatically generated in response to a certain event or user action. Examples include generating a default inventory for a new user starting a game or creating a starter set of tasks for a user creating a new task app account
- [x] Data submitted via a POST or PATCH request is validated before the database is updated (e.g. validating that an event is in the future before allowing a new event to be created)
  - [x] *To receive full credit, please be sure to demonstrate in your walkthrough that for certain inputs, the item will NOT be successfully created or updated.*

### Stretch Features

👉🏾👉🏾👉🏾 Check off each completed feature below.

- [ ] A subset of pages require the user to log in before accessing the content
  - [ ] Users can log in and log out via GitHub OAuth with Passport.js
- [ ] Restrict available user options dynamically, such as restricting available purchases based on a user's currency
- [ ] Show a spinner while a page or page element is loading
- [x] Disable buttons and inputs during the form submission process
- [ ] Disable buttons after they have been clicked
  - *At least 75% of buttons in your app must exhibit this behavior to receive full credit*
- [ ] Users can upload images to the app and have them be stored on a cloud service
  - *A user profile picture does **NOT** count for this rubric item **only if** the app also includes "Login via GitHub" functionality.*
  - *Adding a photo via a URL does **NOT** count for this rubric item (for example, if the user provides a URL with an image to attach it to the post).*
  - *Selecting a photo from a list of provided photos does **NOT** count for this rubric item.*
- [ ] 🍞 [Toast messages](https://www.patternfly.org/v3/pattern-library/communication/toast-notifications/index.html) deliver simple feedback in response to user events

## Final Demo GIF

Recorded on the deployed app at [https://school-event-kgni.onrender.com/](https://school-event-kgni.onrender.com/). The walkthrough shows the board, a category filter and date sort, an event page, an RSVP change that is still selected after refresh, a missing event, a rejected past start time, a saved event, an edit to the location, and deletion back to the six seeded events.

![Complete School.Event walkthrough](../docs/demos/final-walkthrough.gif)

## Reflection

### 1. What went well during this unit?

RSVP fit on the event page we already had. A student chooses Going or Interested, the API stores one row for that student and event, and a refresh shows the same choice. Render runs the API and the built React app as one service, and `npm run db:init` creates any missing tables without deleting events that are already there.

### 2. What were some challenges your group faced in this unit?

The demo student is a shared profile, and we had to say that plainly so it would not look like sign-in. Production also had to serve event URLs such as `/events/3` after a refresh, and return JSON for unknown `/api` routes. A rejected save had to stay on the form with the typed values and a field error, which we show in the walkthrough with a start time in 2020.

### 3. What were some of the highlights or achievements that you are most proud of in this project?

The board started as sample data and now reads and writes PostgreSQL. Categories relate to many events, and students relate to events through the RSVP join table. The deployed app lets someone post an event, change its location, remove it, filter the board, and keep an RSVP after refresh.

### 4. Reflecting on your web development journey so far, how have you grown since the beginning of the course?

Unit 5 was the idea and the user stories. Unit 6 was the wireframes and the database drawing. By this unit those pages are a React app, an Express API, and a Postgres database with a public URL. We got more comfortable splitting a page into components, checking input on the server, and proving a feature with a GIF instead of a description.

### 5. Looking ahead, what are your goals related to web development, and what steps do you plan to take to achieve them?

We want to replace the shared demo student with real sign-in, and to test the pages the same way `server/app.test.js` already tests the API. The next step is a small login flow on this app, then browser tests for the board, the form, and RSVP.
