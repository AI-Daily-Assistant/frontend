import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '../axiosInstance';

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json();
    const { email, password, name, age } = formData;

    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 입력해야 합니다.' },
        { status: 400 },
      );
    }

    const response = await axiosInstance.post('/api/auth/register', {
      email,
      password,
      name,
      age,
    });

    // 백엔드 API의 응답 반환
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('회원가입 요청 중 오류 발생:', error);

    if (error.response?.status === 400) {
      return NextResponse.json(
        {
          errorCode: error.response.data?.errorCode || 'BAD_REQUEST',
          errorMessage:
            error.response.data?.errorMessage || '이메일이 이미 존재합니다.',
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        errorCode: 'INTERNAL_SERVER_ERROR',
        errorMessage: '서버 내부 오류가 발생했습니다. 다시 시도해주세요.',
      },
      { status: 500 },
    );
  }
}
