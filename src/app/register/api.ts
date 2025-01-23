import axiosInstance from '../api/axiosInstance';

// 회원가입 요청
export const registerUser = async (
  email: string,
  password: string,
  name: string,
  age: number,
) => {
  try {
    const response = await axiosInstance.post('/api/register', {
      email,
      password,
      name,
      age,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.errorMessage || '회원가입에 실패했습니다.',
    );
  }
};
