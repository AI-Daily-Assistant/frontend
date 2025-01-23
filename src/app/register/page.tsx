import { useRegisterMutation } from '@/hooks/auth/useAuthMutation';
import RegisterForm from './_components/RegisterForm';

export default function RegisterPage() {
  const { mutate, isPending, isError, error, isSuccess } =
    useRegisterMutation();

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='w-96 rounded-lg bg-white p-8 shadow-lg'>
        <h1 className='mb-8 text-center text-2xl font-bold text-gray-700'>
          Register
        </h1>

        {isPending && (
          <p className='mb-4 text-center text-blue-500'>회원가입 진행 중...</p>
        )}

        {isError && (
          <p className='mb-4 text-center text-red-500'>{error?.message}</p>
        )}

        {isSuccess && (
          <p className='mb-4 text-center text-green-500'>회원가입 성공!</p>
        )}

        <RegisterForm mutate={mutate} isPending={isPending} />
      </div>
    </div>
  );
}
