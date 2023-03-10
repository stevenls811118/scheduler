import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useReducerForApplicationData from "./hooks/useReducer";

export default function Application(props) {
  // destructure from custom hook
  const { state, setDay, bookInterview, cancelInterview } =
    useReducerForApplicationData();

  const interviewersForDay = getInterviewersForDay(state, state.day);
  let dailyAppointmentsArray = getAppointmentsForDay(state, state.day).map(
    (i) => {
      const interview = getInterview(state, i.interview);

      return (
        <Appointment
          key={i.id}
          id={i.id}
          time={i.time}
          interview={interview}
          interviewers={interviewersForDay}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  dailyAppointmentsArray = [
    ...dailyAppointmentsArray,
    <Appointment key="last" id="last" time="5pm" />,
  ];

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{dailyAppointmentsArray}</section>
    </main>
  );
}
