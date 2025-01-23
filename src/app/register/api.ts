import axios from 'axios';

interface RegisterData {
  email: string;
  password: string;
}

// 회원가입 요청 함수
export const registerUser = async (email: string, password: string) => {
  const response = await axios.post<RegisterData>('/api/register', {
    email,
    password,
  });

  return response.data;
};
