const getAppointmentsForDay = (state, day) => {
  if (state.days.length !== 0) {
    const appointmentsArray = state.days.filter(i => i.name === day);
    if (appointmentsArray.length !== 0) {
      const result = Object.values(state.appointments).filter(i =>
        appointmentsArray[0].appointments.includes(i.id));
      return result;
    }
    return [];
  }
  return [];
};

export default getAppointmentsForDay;