import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'b1dfeea4-d632-4776-b494-723bac3c8eb2';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

const getData = async (endpoint, params = {}) => {
  let { data } = await axios.get(`${endpoint}`, params);
  return data;
};

const postData = async (endpoint, body = {}) => {
  let { data } = await axios.post(`${endpoint}`, body);
  return data;
};

const uploadData = async (endpoint, formData, headers = {}) => {
  let { data } = await axios.post(`${endpoint}`, formData, headers);
  return data;
};

export { getData, postData, uploadData };
