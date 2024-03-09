NOTE: This is a work in progress

## Contributions

### Edwin Yee:
1. created initial popup logic with Garvin through pair programming
2. handled the medicine alert popup when it is time for a user to take a medicine (current time matches the medicine time)
3. added information icon and implemented functionality to retrieve the most common side effects for medicines using the FDA API, which queries by both brand name and generic name (and I use the one with more results)
4. miscellaneous improvements to the MedMinder web app, such as making the escape key close the add medicine popup and implementing scrolling when the users have many medicines on the screen at the same time

### Garvin Young:

Coding:
- created initial popup logic -> added fields and more functionality to the popup once the database was implemented for mvp -> updated popup ui, fields, and logic to more accurately reflect the final product
- delete button for medicine -> adjusted delete to only delete medicine for that specific day
- edit button for medicine (just an adjusted add medicine using the same path)
- other simple and straightforward final touches before code freeze

NonCoding:
- managed and added issues to the kanban board
- helped make demo recording for mvp
- Retro #2 Leader, User Manual Coordinator
- managed/organized feedback for mvp and team evaluation

### Hanson Yu:

1. Set up the initial base app codebase with Google Oath through firebase integration
2. Created the way to render alert data in the app and render only the alerts for the day of the week selected
3. Coded logic for alert sorting by time
4. Coded logic for alert frequency-based rendering
5. Added way for user to mark specific alerts as complete for one day
6. Added a date picker for the user to jump to any date through a calendar input
7. Added user profiles and a way to switch between them and add user profiles

### James Pflagging

1. Created authcontext and sign out logic.
2. Added protected routes connected to auth status.
3. Created google calendar integration.

### Michael Cheng

1. Set up Firebase Database
2. Initialize folder + fields for new user in Database
3. Set up Firebase Deployment + Github Actions (deploy on PR + merge to main)
4. Create Email notifications via Google Cloud Functions + Google Cloud Scheduler

### Vaishnavi Himakunthala

1. Made design doc
2. Made preliminary design for UI
3. Made a PR template
4. Added speech to text feature for medicine name

### Timothy Choi
1. Created DateNavigator component to go back and forth through the days of the week
2. Worked on UI for dashboard (header, alerts component, buttons)
3. Worked on UI for sign in page
4. Worked on DeleteAlert component and confirmation popup

