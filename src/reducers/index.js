import { combineReducers } from 'redux';

import { reducer as formReducer} from 'redux-form'
import courseReducer from './courseReducer';
import filterReducer from './filterReducer';
import logInAndOutReducer from './login';
import favReducer from './favReducer';
import selectedCourseReducer from './selectedCourseReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  courses: courseReducer,
  filter: filterReducer,
  currentUser: logInAndOutReducer,
  favs: favReducer,
  selectedCourse: selectedCourseReducer,
  errorMessage: errorReducer,
  form: formReducer,
});
