import RegisterForm from './_components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='h-[400px] w-2/5 rounded-lg shadow-lg'>
        <h1 className='text-center text-2xl font-bold text-gray-700'>
          Register
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}
