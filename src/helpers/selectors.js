const getAppointmentsForDay = (state, day) => {
  if (state.days.length !== 0) {
    const appointmentsArray = state.days.filter((i) => i.name === day);
    if (appointmentsArray.length !== 0) {
      const result = Object.values(state.appointments).filter((i) =>
        appointmentsArray[0].appointments.includes(i.id)
      );
      return result;
    }
    return [];
  }
  return [];
};

const getInterviewersForDay = (state, day) => {
  if (state.days.length !== 0) {
    const interviewersArray = state.days.filter((i) => i.name === day);
    if (interviewersArray.length !== 0) {
      const result = Object.values(state.interviewers).filter((i) =>
        interviewersArray[0].interviewers.includes(i.id)
      );
      return result;
    }
    return [];
  }
  return [];
};

const getInterview = (state, interview) => {
  if (interview && typeof interview.interviewer === "number") {
    interview.interviewer = state.interviewers[`${interview.interviewer}`];
  }
  return interview;
};

export { getAppointmentsForDay, getInterviewersForDay, getInterview };
