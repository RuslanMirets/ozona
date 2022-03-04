// export const uploadImage = async (photo: any) => {
//   let req = new XMLHttpRequest();
//   let formData = new FormData();

//   formData.append('avatar', photo);
//   req.open('POST', 'http://localhost:5000/upload/user-avatar');
//   req.send(formData);
// };

import axios from 'axios';

export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append('images', image);

  const { data } = await axios.post('http://localhost:5000/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
