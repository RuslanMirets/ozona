import axios from 'axios';

export const postAPI = async (url: string, post: object, token?: string) => {
  const response = await axios.post(`http://localhost:5000/${url}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const getAPI = async (url: string, token?: string) => {
  const response = await axios.get(`http://localhost:5000/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const patchAPI = async (url: string, post: object, token?: string) => {
  const response = await axios.patch(`http://localhost:5000/${url}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const putAPI = async (url: string, post: object, token?: string) => {
  const response = await axios.put(`http://localhost:5000/${url}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const deleteAPI = async (url: string, token?: string) => {
  const response = await axios.delete(`http://localhost:5000/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
