'use client';

import { apiRequest } from '@/app/api/apiRequest';
import { useEffect, useState } from 'react';

export default function BoardLists() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiRequest('GET', '/api/board');
        setPosts(data.boards);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <p className='text-red-500'>오류 발생: {error}</p>;

  return (
    <div className='mt-5 w-full max-w-2xl'>
      {posts.length > 0 ? (
        <ul className='space-y-4'>
          {posts.map((post: any, idx) => (
            <li
              key={idx}
              className='rounded-md border p-4 shadow-sm hover:shadow-md'
            >
              <h2 className='text-lg font-bold'>{post.title}</h2>
              <p className='text-gray-600'>{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>게시물이 없습니다.</p>
      )}
    </div>
  );
}
