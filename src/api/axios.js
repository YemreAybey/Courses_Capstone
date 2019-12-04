import axios from 'axios';

export default axios.create({
  baseURL: 'https://capcourses-api.herokuapp.com/api/v1',
});
