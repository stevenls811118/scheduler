import React, { useState }from "react";
import { useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({...state, day});
  
  useEffect(() => {
    
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ])
    .then((res) => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data}));
    })
    .catch(err => console.log(err));
  }, []);

  const bookInterview = (id, interview) => {
    
    const appointment = {...state.appointments[id], interview: {...interview}};
    const appointments = {...state.appointments, [id]: appointment};
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then((res) => setState({...state, appointments}));
  };

  const cancelInterview = (id) => {
    const appointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: appointment};
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((res) => setState({...state, appointments}));
  };

  const interviewersForDay = getInterviewersForDay(state, state.day);
  let dailyAppointmentsArray = getAppointmentsForDay(state, state.day).map(i => {
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
  });
  
  dailyAppointmentsArray = [...dailyAppointmentsArray, <Appointment key="last" time="5pm" />];

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
          <DayList 
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointmentsArray}
      </section>
    </main>
  );
}
