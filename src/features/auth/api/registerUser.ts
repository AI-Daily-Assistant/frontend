import axios from 'axios';

interface RegisterUser {
  email: string;
  password: string;
  name: string;
  age: number;
}

export const registerUser = async (formData: RegisterUser) => {
  try {
    const response = await axios.post('/api/register', {
      formData,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.errorMessage || '회원가입에 실패했습니다.',
    );
  }
};
