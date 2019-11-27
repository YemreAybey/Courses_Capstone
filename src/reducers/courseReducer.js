const courseReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_COURSES':
      return action.courses;
    default:
      return state;
  }
};

export default courseReducer;
