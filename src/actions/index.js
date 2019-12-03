import coursesApi from '../api/axios';
import jwt_decode from 'jwt-decode';

const FETCH_COURSES = 'FETCH_COURSES';
const CHANGE_FILTER = 'CHANGE_FILTER';
const LOGIN = 'LOGIN';
const LOG_OUT = 'LOG_OUT';
const GET_FAVS = 'GET_FAVS';
const SELECT_COURSE = 'SELECT_COURSE';
const ADD_COURSE = 'ADD_COURSE';
const CLEAR_FAVS = 'CLEAR_FAVS';

const fetchCourses = () => async dispatch => {
  const response = await coursesApi.get('/courses');
  dispatch({ type: FETCH_COURSES, courses: response.data });
};

const changeFilter = filter => ({ type: CHANGE_FILTER, filter });

const signup = userInfo => async dispatch => {
  await coursesApi.post('/users', userInfo);
  const { email, password } = userInfo;
  const auth = { email, password };
  const token = await coursesApi.post('/user_token', { auth });
  if (token.statusText === 'Created') {
    const dec = jwt_decode(token.data.jwt, { complete: true });
    const currentUser = await coursesApi.get(`/users/${dec.sub}`);
    dispatch({
      type: LOGIN,
      user: {
        status: 'Logged In',
        token: token.data.jwt,
        user: currentUser.data.username,
      },
    });
  }
};

const login = userInfo => async dispatch => {
  const { email, password } = userInfo;
  const auth = { email, password };
  const token = await coursesApi.post('/user_token', { auth });
  if (token.statusText === 'Created') {
    const dec = jwt_decode(token.data.jwt, { complete: true });
    const currentUser = await coursesApi.get(`/users/${dec.sub}`);
    dispatch({
      type: LOGIN,
      user: {
        status: 'Logged In',
        token: token.data.jwt,
        user: currentUser.data.username,
      },
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

export {
  fetchCourses,
  changeFilter,
  signup,
  login,
  logOut,
  getFavourites,
  selectCourse,
  addToFavs,
};
