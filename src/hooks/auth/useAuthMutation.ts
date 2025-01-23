import { loginUser } from '@/app/login/api';
import { registerUser } from '@/app/register/api';
import { useMutation } from '@tanstack/react-query';

interface FormData {
  email: string;
  password: string;
  name: string;
  age: number;
}

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (formData: { email: string; password: string }) =>
      await loginUser(formData.email, formData.password),
    onSuccess: () => {
      console.log('로그인 성공!');
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error.message);
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (formData: FormData) =>
      await registerUser(
        formData.email,
        formData.password,
        formData.name,
        formData.age,
      ),
    onSuccess: () => {
      console.log('회원가입 성공!');
    },
    onError: (error: any) => {
      console.error('회원가입 실패:', error.message);
    },
  });
};
