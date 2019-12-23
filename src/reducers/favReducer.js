const favReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_FAVS':
      return action.favs;
    case 'ADD_COURSE':
      return [...state, action.course];
    case 'REMOVE_COURSE':
      return state.filter(c => c.id !== action.course.id);
    case 'CLEAR_FAVS':
      return action.favs;
    default:
      return state;
  }
};

export default favReducer;
