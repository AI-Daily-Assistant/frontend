import apiClient from '../api/apiClient';

interface RegisterData {
  email: string;
  password: string;
}

// 회원가입 요청
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post<RegisterData>('/api/register', {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.errorMessage || '회원가입에 실패했습니다.',
    );
  }
};
