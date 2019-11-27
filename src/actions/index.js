import coursesApi from '../api/axios';

const FETCH_COURSES = 'FETCH_COURSES';
const CHANGE_FILTER = 'CHANGE_FILTER';

const fetchCourses = () => async dispatch => {
  const response = await coursesApi.get('/courses');
  dispatch({ type: FETCH_COURSES, courses: response.data });
};

const changeFilter = filter => ({ type: CHANGE_FILTER, filter });

export { fetchCourses, changeFilter };
