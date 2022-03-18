// export const uploadImage = async (images: string[]) => {
//   let imgArray = [];
//   for (const item of images) {
//     const formData = new FormData();
//     formData.append('images', item);
//   }
// };

import axios from 'axios';
import { parseCookies } from 'nookies';

interface UploadImageReturnProps {
  filename: string;
}

export const uploadAvatar = async (image: File): Promise<UploadImageReturnProps> => {
  const formData = new FormData();
  formData.append('avatar', image);

  const { ozonaToken } = parseCookies();

  const { data } = await axios.patch('http://localhost:5000/user/update-avatar', formData, {
    headers: {
      Authorization: `Bearer ${ozonaToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
