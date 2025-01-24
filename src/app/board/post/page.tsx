import PostForm from './_components/PostForm';

export default function BoardPostPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <h1>New Post</h1>
      <PostForm />
    </div>
  );
}
