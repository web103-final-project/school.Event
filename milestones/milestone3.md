# Milestone 3

This document should be completed and submitted during **Unit 7** of this course. You **must** check off all completed tasks in this document in order to receive credit for your work.

## Checklist

This unit, be sure to complete all tasks listed below. To complete a task, place an `x` between the brackets.

You will need to reference the GitHub Project Management guide in the course portal for more information about how to complete each of these steps.

- [x] In your repo, create a project board.
  - *Please be sure to share your project board with the grading team's GitHub **codepathreview**. This is separate from your repository's sharing settings.*
  - [WEB103-Final-Project board](https://github.com/orgs/web103-final-project/projects/1), linked to this repository.
  - [x] Verify that **codepathreview** has access to the project board.
    - Granted **codepathreview** the **Reader** role on the private project. GitHub confirmed the collaborator update.
- [x] In your repo, create at least 5 issues from the features on your feature list.
  - List the title of each issue you created:
    1. [Create event page #1](https://github.com/web103-final-project/school.Event/issues/1)
    2. [Edit event page #2](https://github.com/web103-final-project/school.Event/issues/2)
    3. [Create home page 1 #3](https://github.com/web103-final-project/school.Event/issues/3)
    4. [View event details #4](https://github.com/web103-final-project/school.Event/issues/4)
    5. [RSVP to events #5](https://github.com/web103-final-project/school.Event/issues/5)
- [x] In your repo, update the status of issues in your project board.
  - Issues #1, #2, #5, and #9 through #14 are **Todo** for later milestones. Browsing issue #3, read-only details issue #4, planning issues #6 and #7, and project-management issue #8 are **Done**.
- [x] In your repo, create a GitHub Milestone for each final project unit, corresponding to each of the 5 milestones in your `milestones/` directory.
  - List the name of each milestone you created:
    1. [Milestone 1 - Unit 5](https://github.com/web103-final-project/school.Event/milestone/4)
    2. [Milestone 2 - Unit 6](https://github.com/web103-final-project/school.Event/milestone/5)
    3. [Milestone 3 - Unit 7](https://github.com/web103-final-project/school.Event/milestone/1)
    4. [Milestone 4 - Unit 8](https://github.com/web103-final-project/school.Event/milestone/2)
    5. [Final Milestone - Unit 9](https://github.com/web103-final-project/school.Event/milestone/3)
  - [x] Set the completion percentage of each milestone. The GitHub Milestone for this unit (Milestone 3 - Unit 7) should be 100% completed when you submit for full points.
    - GitHub calculates completion from closed issues. Milestone 3 tracks project management in issue #8 and the initial sample-data frontend/API in issues #3 and #4. Event creation and editing remain in Milestone 4. RSVP is assigned to the final milestone.
- [x] In `readme.md`, check off the features you have completed in this unit by adding a ✅ emoji in front of the feature's name.
  - [x] Under each feature you have completed, include a GIF showing feature functionality.
  - `README.md` marks sample event browsing and read-only event details with ✅ and includes the [walkthrough GIF](../docs/demos/browse-events.gif) beneath both features. Data comes from the basic Express API; database persistence and writes remain planned.
- [x] In this document, complete all five questions in the **Reflection** section below.
- [x] Create [progress_report_3.md](progress_report_3.md) with the project board, grader access, issue titles, milestone names, completion percentage, completed work, and feature status.

## Milestone progress

These counts were checked on November 3, 2026, in America/Chicago.

| Milestone | Closed issues | Total issues | Completion |
| --- | ---: | ---: | --- |
| Milestone 1 - Unit 5 | 1 | 1 | 100% |
| Milestone 2 - Unit 6 | 1 | 1 | 100% |
| Milestone 3 - Unit 7 | 3 | 3 | 100% |
| Milestone 4 - Unit 8 | 0 | 6 | 0% |
| Final Milestone - Unit 9 | 0 | 3 | 0% |

Completed planning work is recorded in [issue #6](https://github.com/web103-final-project/school.Event/issues/6) and [issue #7](https://github.com/web103-final-project/school.Event/issues/7).

## Milestone completion

The board, grader access, issue statuses, milestone assignments, and reflection answers are complete. Project-management issue #8 and initial browsing/details issues #3 and #4 are closed. Milestone 3 is 100% complete. The remaining work is tracked in the [development plan](../planning/development_plan.md) and assigned to Milestone 4 or the final milestone. The implementation, GIF evidence, and reports are included on `milestone-3-kavya` for review and submission.

## Reflection

### 1. What went well during this unit?

We organized the project with a project board, feature issues, and milestones. We now have at least five feature issues and a milestone for each final project unit. This work helped us connect the feature list to specific tasks and understand how GitHub can track our progress. We also began development with a React noticeboard and event details pages connected to a basic Express API using sample events.

### 2. What were some challenges your group faced in this unit?

Navigating new project-management concepts was challenging. We needed to learn how to create milestones and a project board, create issues, and link the issues to the board and milestones. We also needed to understand how to update issue status and close an issue when its work is complete.

### 3. Did you finish all of your tasks in your sprint plan for this week? If you did not finish all of the planned tasks, how would you prioritize the remaining tasks on your list?

We completed the project-management tasks for this sprint. We created the feature-issue list and all five milestones, updated board statuses, granted grading-team access, and answered the reflection questions. We closed the project-management issue after checking those tasks, which brought Milestone 3 to 100%. We also completed the initial sample event browsing and read-only details flow. PostgreSQL, event management, filtering, and RSVP remain for later passes.

### 4. Which features and user stories would you consider “at risk”? How will you change your plan if those items remain “at risk”?

Database-backed event management and RSVP remain the main integration risks because the current app only reads sample data. We will connect PostgreSQL before adding event writes, then build RSVP on the saved event/student relationships. If time becomes tight, we will prioritize the baseline requirements, filtering/sorting, and validation over deferred features such as search and club pages.

### 5. What additional support will you need in upcoming units as you continue to work on your final project?

We need more practice with the GitHub project-management workflow, especially linking issues, updating board statuses, and deciding when to close issues. Guidance on how closed issues affect milestone completion would also help. We will use this workflow to track implementation work in the upcoming units.
