import axiosInstance from '../api/axiosInstance';

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (formData: LoginData) => {
  try {
    const response = await axiosInstance.post('/api/login', {
      formData,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.errorMessage || '로그인을 실패했습니다.',
    );
  }
};
