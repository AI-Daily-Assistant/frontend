import axios from 'axios';
import axiosInstance from '../api/apiRequest';

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (formData: LoginData) => {
  try {
    const response = await axios.post('/api/login', {
      formData,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.errorMessage || '로그인을 실패했습니다.',
    );
  }
};

// // 유저 정보 반환
// export const getUserInfo = async (accessToken: string) => {
//   try {
//     const response = await axiosInstance.get('/api/user', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     return response.data;
//   } catch (error: any) {
//     throw new Error(
//       error.response?.data?.errorMessage ||
//         '유저 정보를 불러오는데 실패했습니다.',
//     );
//   }
// };
