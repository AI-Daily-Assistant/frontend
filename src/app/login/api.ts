import axios from 'axios';
import apiClient from '../api/apiClient';

// 로그인 요청
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/api/login', {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.errorMessage || '로그인을 실패했습니다.',
    );
  }
};

export const loginTest = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'http://118.41.132.243:8080/api/auth/login',
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.errorMessage || '로그인을 실패했습니다.',
    );
  }
};
