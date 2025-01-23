import { registerUser } from '@/app/register/api';
import { useMutation } from '@tanstack/react-query';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (formData: { email: string; password: string }) =>
      await registerUser(formData.email, formData.password),
    onSuccess: () => {
      console.log('회원가입 성공!');
    },
    onError: (error: any) => {
      console.error('회원가입 실패:', error.message);
    },
  });
};
