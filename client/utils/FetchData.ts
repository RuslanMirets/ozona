import axios from 'axios';

export const postAPI = async (url: string, post: object, token?: string) => {
  const res = await axios.post(`http://localhost:5000/${url}`, post, {
    headers: { Authorization: `${token}` },
  });
  return res;
};
export const getAPI = async (url: string, token?: string) => {
  const res = await axios.get(`http://localhost:5000/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
