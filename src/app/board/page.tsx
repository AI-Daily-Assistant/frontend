import Link from 'next/link';
import BoardLists from './_components/BoardLists';

export default function BoardPage() {
  return (
    <div className='my-20 flex flex-col items-center'>
      <h1 className='text-2xl font-bold text-gray-700'>Board</h1>
      <BoardLists />
      <Link
        href='/board/post'
        className='w-[100px] rounded-md bg-blue-400 p-2 text-center font-semibold text-white duration-200 hover:scale-110'
      >
        글쓰기
      </Link>
    </div>
  );
}
