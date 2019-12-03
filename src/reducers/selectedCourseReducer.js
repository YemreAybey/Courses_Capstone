const selectedCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_COURSE':
      return action.course;
    default:
      return state;
  }
};

export default selectedCourseReducer;
