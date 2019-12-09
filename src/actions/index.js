import coursesApi from '../api/axios';
import jwt_decode from 'jwt-decode';
import ls from 'local-storage';

const FETCH_COURSES = 'FETCH_COURSES';
const CHANGE_FILTER = 'CHANGE_FILTER';
const LOGIN = 'LOGIN';
const LOG_OUT = 'LOG_OUT';
const GET_FAVS = 'GET_FAVS';
const SELECT_COURSE = 'SELECT_COURSE';
const ADD_COURSE = 'ADD_COURSE';
const CLEAR_FAVS = 'CLEAR_FAVS';
const CREATE_ERROR_MESSAGE = 'CREATE_ERROR_MESSAGE';
const DELETE_ERROR_MESSAGE = 'DELETE_ERROR_MESSAGE';

const fetchCourses = () => async dispatch => {
  const response = await coursesApi.get('/courses');
  dispatch({ type: FETCH_COURSES, courses: response.data });
};

const changeFilter = filter => ({ type: CHANGE_FILTER, filter });

const signup = userInfo => async dispatch => {
  try {
    await coursesApi.post('/users', userInfo);
    const { email, password } = userInfo;
    const auth = { email, password };
    const token = await coursesApi.post('/user_token', { auth });
    if (token.statusText === 'Created') {
      const dec = jwt_decode(token.data.jwt, { complete: true });
      const currentUser = await coursesApi.get(`/users/${dec.sub}`);
      const user = {
        status: 'Logged In',
        token: token.data.jwt,
        user: currentUser.data.username,
      };
      ls.set('currentUser', user);
      dispatch({
        type: LOGIN,
        user,
      });
    }
  } catch (err) {
    dispatch({
      type: CREATE_ERROR_MESSAGE,
      message: 'Please Provide Proper Info',
    });
  }
};

const login = userInfo => async dispatch => {
  const { email, password } = userInfo;
  const auth = { email, password };
  try {
    const token = await coursesApi.post('/user_token', { auth });
    if (token.statusText === 'Created') {
      const dec = jwt_decode(token.data.jwt, { complete: true });
      const currentUser = await coursesApi.get(`/users/${dec.sub}`);
      const user = {
        status: 'Logged In',
        token: token.data.jwt,
        user: currentUser.data.username,
      };
      dispatch({
        type: LOGIN,
        user,
      });
      ls.set('currentUser', user);
    }
  } catch (err) {
    dispatch({
      type: CREATE_ERROR_MESSAGE,
      message: 'Please Provide Proper Info',
    });
  }
};

const logOut = () => dispatch => {
  dispatch({ type: LOG_OUT, currentUser: { status: 'No Login' } });
  dispatch({ type: CLEAR_FAVS, favs: [] });
};

const getFavourites = jwt => async dispatch => {
  const headers = { Authorization: `Bearer ${jwt}` };
  const response = await coursesApi.get('/favourites', { headers });
  dispatch({ type: GET_FAVS, favs: response.data });
};

const selectCourse = course => ({ type: SELECT_COURSE, course });

const addToFavs = (jwt, course_id) => async dispatch => {
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  const response = await coursesApi.post(
    '/favourites',
    { course_id },
    { headers }
  );
  if (!response.data.error) {
    dispatch({ type: ADD_COURSE, course: response.data });
  }
};

const deleteErrorMessage = () => ({ type: DELETE_ERROR_MESSAGE, message: '' });

const createSession = data => ({ type: LOGIN, user: data });
const deleteSession = () => ({
  type: LOG_OUT,
  currentUser: { status: 'No Login' },
});

export {
  fetchCourses,
  changeFilter,
  signup,
  login,
  logOut,
  getFavourites,
  selectCourse,
  addToFavs,
  deleteErrorMessage,
  createSession,
  deleteSession,
};
