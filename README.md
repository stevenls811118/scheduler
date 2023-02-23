# Interview Scheduler
## Project Description
Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database. For quality assurance, the project follows best practices of TDD (Test Driven Development), where individual Components are tested in isolation as well as End-to-End testing is performed.

## Project Feature

Appointment days (Monday to Friday) are displayed and colour-coordinated depending on availability
The days show the number of slots available as a snapshot of the week
A user can switch between days and see detailed information
Booked and available slots are clearly differentiated
A user can book interviews by typing in a student name and clicking on an interviewer from a list of interviewers
A user can change the details of an existing interview by pressing the edit icon
A user can cancel an existing interview, a pop-up message will ask to confirm the action before permanently deleting an interview
Days display currently remaining spots and capture updates after each modification

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```
## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
