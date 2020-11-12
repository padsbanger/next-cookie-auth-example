import axios from 'axios';

axios.defaults.withCredentials = true;

export const loginUser =  async (form) => {
  const { data } = await axios.post('/api/login', form)
  console.log(data);
}

export const getUserProfile = async () => {
  const { data } = await axios.get('/api/profile');
  return data
}