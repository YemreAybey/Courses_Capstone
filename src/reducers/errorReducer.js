const errorReducer = (state = '', action) => {
  switch (action.type) {
    case 'CREATE_ERROR_MESSAGE':
      return action.message;
    case 'DELETE_ERROR_MESSAGE':
      return action.message;
    default:
      return state;
  }
};

export default errorReducer;
