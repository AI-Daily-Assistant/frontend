'use client';

import { apiRequest } from '@/src/shared/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PostForm() {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);

    try {
      await apiRequest('POST', '/api/board', formData);
      alert('글 등록이 완료되었습니다.');
      router.push('/board');
    } catch (err) {
      console.error('Failed to submit post:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
      <div>
        <label htmlFor='title' className='block font-bold'>
          Title
        </label>
        <input
          id='title'
          value={formData.title}
          onChange={handleChange}
          className='w-full rounded border border-gray-300 p-2'
          placeholder='Enter title'
        />
      </div>
      <div>
        <label htmlFor='content' className='block font-bold'>
          Content
        </label>
        <textarea
          id='content'
          value={formData.content}
          onChange={handleChange}
          className='h-32 w-full rounded border border-gray-300 p-2'
          placeholder='Enter content'
        />
      </div>
      <button
        type='submit'
        className='rounded bg-blue-500 p-2 text-white hover:bg-blue-700'
      >
        Submit
      </button>
    </form>
  );
}
