'use client';

import { useState } from 'react';

interface FormData {
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // API 요청 로직 추가
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='w-96 rounded-lg bg-white p-8 shadow-lg'>
        <h1 className='mb-8 text-center text-2xl font-bold text-gray-700'>
          Register
        </h1>
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
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
