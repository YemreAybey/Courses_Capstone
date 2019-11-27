import { combineReducers } from 'redux';

import courseReducer from './courseReducer';
import filterReducer from './filterReducer';

export default combineReducers({
  courses: courseReducer,
  filter: filterReducer,
});
