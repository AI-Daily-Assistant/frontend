'use client';

import { UseMutateFunction } from '@tanstack/react-query';
import { useState } from 'react';

interface FormData {
  email: string;
  password: string;
}

interface RegisterFormProps {
  mutate: UseMutateFunction<FormData, unknown, FormData, unknown>;
  isPending: boolean;
}

export default function RegisterForm({ mutate, isPending }: RegisterFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

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
    <form onSubmit={handleSubmit}>
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
          className='rounded-md p-2 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400'
          required
        />
      </div>
      <div className='mb-4 flex flex-col'>
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
          className='rounded-md p-2 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400'
          required
        />
      </div>
      <button
        type='submit'
        className='w-full rounded-md bg-blue-500 py-2 font-semibold text-white transition duration-200 hover:bg-blue-600'
        disabled={isPending}
      >
        {isPending ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
