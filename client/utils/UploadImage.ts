// export const uploadImage = async (photo: any) => {
//   let req = new XMLHttpRequest();
//   let formData = new FormData();

//   formData.append('avatar', photo);
//   req.open('POST', 'http://localhost:5000/upload/user-avatar');
//   req.send(formData);
// };

import axios from 'axios';

interface UploadImageReturnProps {
  height: number;
  size: number;
  url: string;
  width: number;
}

export const uploadImage = async (image: File): Promise<UploadImageReturnProps> => {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await axios.post('http://localhost:5000/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
