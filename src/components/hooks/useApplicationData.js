import { useState, useEffect }from "react";
import axios from "axios";

const useApplicationData = () => {
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

  return {state, setDay, bookInterview, cancelInterview};
};

export default useApplicationData;