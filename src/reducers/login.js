const logInAndOutReducer = (state = { status: 'No Login' }, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user;
    case 'LOG_OUT':
      return action.currentUser;
    default:
      return state;
  }
};

export default logInAndOutReducer;
