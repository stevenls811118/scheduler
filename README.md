# Interview Scheduler
## Project Description
Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database. For quality assurance, the project follows best practices of TDD (Test Driven Development), where individual Components are tested in isolation as well as End-to-End testing is performed.

## Project Feature

- Appointment days (Monday to Friday) are displayed and colour-coordinated depending on availability
- The days show the number of slots available as a snapshot of the week
- A user can switch between days and see detailed information
Booked and available slots are clearly differentiated
- A user can book interviews by typing in a student name and clicking on an interviewer from a list of interviewers
- A user can change the details of an existing interview by pressing the edit icon
- A user can cancel an existing interview, a pop-up message will ask to confirm the action before permanently deleting an interview
- Days display currently remaining spots and capture updates after each modification

## Setup

Install dependencies with `npm install`.

### Running Webpack Development Server

```sh
npm start
```
### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```
## API server/*Database Setup
For full functionality both must run concurrently: the client and the API server applications.

- Start by forking and cloning the scheduler-api server here
- Follow the steps outlined in README to install and setup the database
- Fork and clone this repo
- Navigate to the root directory and install dependencies with npm install
- Once you have the database setup and the scheduler-api server running, run the following command from the root directory of the project npm start

## Final Product

### Home Page
!["final product"](/public/images/Final%20product.PNG)
### Create Appointment
!["Create Appointment"](/public/images/Create%20appointment.gif)
### Edit Appointment
!["Edit Appointment"](/public/images/Edit%20appointment.gif)
### Delete Appointment
!["Delete Appointment"](/public/images/Delete%20appointment.gif)
### WebSocket Server Feature
!["WebSocket Server Feature"](/public/images/Websocket%20server%20feature.gif)

## Dependencies

  - axios
  - classnames
  - normalize.css
  - react
  - react-dom
  - react-scripts
  - websocket
  - @babel/core
  - @storybook/addon-actions
  - @storybook/addon-backgrounds
  - @storybook/addon-links
  - @storybook/addons
  - @storybook/react
  - @testing-library/jest-dom
  - @testing-library/react
  - @testing-library/react-hooks
  - babel-loader
  - react-test-renderer
  - sass