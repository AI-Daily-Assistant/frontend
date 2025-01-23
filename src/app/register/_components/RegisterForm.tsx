'use client';

import { useState } from 'react';
import { registerUser } from '../api';

interface FormData {
  email: string;
  password: string;
  name: string;
  age: number;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    age: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await registerUser(formData);
      alert('Registration successful!');
      setFormData({
        email: '',
        password: '',
        name: '',
        age: 0,
      });
    } catch (err) {
      setError('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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

        <div className='mb-6 flex flex-col'>
          <label
            htmlFor='name'
            className='mb-2 text-sm font-medium text-gray-600'
          >
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter your name'
            className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
            required
          />
        </div>

        <div className='mb-6 flex flex-col'>
          <label
            htmlFor='age'
            className='mb-2 text-sm font-medium text-gray-600'
          >
            Age
          </label>
          <input
            id='age'
            name='age'
            type='number'
            value={formData.age}
            onChange={handleChange}
            placeholder='Enter your age'
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
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
