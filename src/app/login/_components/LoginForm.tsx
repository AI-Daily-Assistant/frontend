'use client';

import { useRegisterMutation } from '@/hooks/auth/useAuthMutation';
import { useState } from 'react';

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const { mutate, isPending, isError, error, isSuccess } =
    useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className='flex flex-col'>
      {isPending && (
        <p className='mb-4 text-center text-blue-500'>회원가입 진행 중...</p>
      )}
      {isError && (
        <p className='mb-4 text-center text-red-500'>{error?.message}</p>
      )}
      {isSuccess && (
        <p className='mb-4 text-center text-green-500'>회원가입 성공!</p>
      )}

      <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className='mb-4 flex flex-col'>
          <label
            htmlFor='email'
            className='mb-2 text-sm font-medium text-gray-600'
          >
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='example@example.com'
            className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
            required
          />
        </div>

        <div className='mb-6 flex flex-col'>
          <label
            htmlFor='password'
            className='mb-2 text-sm font-medium text-gray-600'
          >
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter your password'
            className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full rounded-md bg-blue-500 py-3 font-semibold text-white transition duration-200 hover:bg-blue-600'
          disabled={isPending}
        >
          {isPending ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
