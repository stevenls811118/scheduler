import { useEffect, useReducer }from "react";
import axios from "axios";

const W3CWebSocket = require('websocket').w3cwebsocket;


const useReducerForApplicationData = () => {

const SET_DAY = "SET_DAY";
const SET_DAYS = "SET_DAYS";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.day};
    case SET_DAYS:
      return {...state, days: action.days};
    case SET_APPLICATION_DATA:
      return {...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers};
    case SET_INTERVIEW:
      return {...state, appointments: {...state.appointments, [action.id]: {...state.appointments[action.id], interview: action.interview}}};
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => dispatch({type: SET_DAY, day});
  
  useEffect(() => {
    
    const ws = new W3CWebSocket(process.env.REACT_APP_WEBSOCKET_URL, 'echo-protocol');

    ws.onerror = function() {
      console.log('Connection Error');
    };
  
    ws.onopen = function() {
      console.log('WebSocket Client Connected');
      ws.send('ping');
    };

    ws.onmessage = function(e) {
      if (typeof e.data === 'string') {
        let respondAction = JSON.parse(e.data);
        dispatch({type: SET_INTERVIEW, id: respondAction.id, interview: respondAction.interview});
        axios.get(`http://localhost:8001/api/days`)
        .then((res) => dispatch({type: SET_DAYS, days: res.data}));  
      }
    };

    ws.onclose = function() {
      console.log('echo-protocol Client Closed');
    };

    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ])
    .then((res) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data
      });
    })
    .catch(err => console.log(err));
  }, []);

  const bookInterview = (id, interview) => {
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then((res) => dispatch({type: SET_INTERVIEW, id, interview}))
    .then(() => axios.get(`http://localhost:8001/api/days`))
    .then((res) => dispatch({type: SET_DAYS, days: res.data}));
  };

  const cancelInterview = (id) => {

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((res) => dispatch({type: SET_INTERVIEW, id, interview: null}))
    .then(() => axios.get(`http://localhost:8001/api/days`))
    .then((res) => dispatch({type: SET_DAYS, days: res.data}));
  };

  return {state, setDay, bookInterview, cancelInterview};
};

export default useReducerForApplicationData;