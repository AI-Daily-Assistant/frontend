'use client';

import { apiRequest } from '@/app/api/apiRequest';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loginUser } from '../api';

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ accessToken: string } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(formData);
      if (response.accessToken) {
        setData(response);
        setIsSuccess(true);
      }
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess && data?.accessToken) {
      const getUserInfoWithAccessToken = async () => {
        try {
          sessionStorage.setItem('accessToken', data.accessToken);
          const userInfo = await apiRequest('GET', '/api/user');

          console.log('User Info:', userInfo);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          router.push('/');
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      };

      getUserInfoWithAccessToken();
    }
  }, [isSuccess, data, router]);

  return (
    <div className='flex flex-col'>
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

        {error && <p className='mb-4 text-sm text-red-500'>{error}</p>}

        <button
          type='submit'
          className='w-full rounded-md bg-blue-500 py-3 font-semibold text-white transition duration-200 hover:bg-blue-600 disabled:bg-gray-400'
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
