import apiClient from '../api/apiClient';

interface LoginData {
  email: string;
  password: string;
}

// 로그인 요청
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post<LoginData>('/api/login', {
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
