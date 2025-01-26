import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axiosInstance from '@/src/shared/api/axiosInstance';

if (process.env.NEXT_PUBLIC_MOCK_API === 'true') {
  import('@/mocks/server').then(({ server }) => {
    server.listen();
    console.log('MSW server-side mocking enabled');
  });
}

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json();
    const { email, password } = formData;

    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 입력해야 합니다.' },
        { status: 400 },
      );
    }

    // 로그인 요청 보내기
    const response = await axiosInstance.post('/api/auth/login', formData);

    const { accessToken, refreshToken } = response.data;

    // refreshToken을 쿠키에 저장
    const cookieStore = await cookies();
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true, // 클라이언트에서 접근 불가
      secure: process.env.NODE_ENV === 'production', // 프로덕션에서는 HTTPS 사용
      sameSite: 'strict', // 크로스사이트 요청 방지
      path: '/', // 쿠키를 모든 경로에서 사용 가능
      maxAge: 60 * 60 * 24 * 7, // 7일 동안 유지
    });

    return NextResponse.json({ accessToken }, { status: response.status });
  } catch (error: any) {
    console.error('로그인 요청 중 오류 발생:', error);

    if (error.response?.status === 400) {
      return NextResponse.json(
        {
          errorCode: error.response.data?.errorCode || 'BAD_REQUEST',
          errorMessage:
            error.response.data?.errorMessage ||
            '로그인 정보가 일치하지 않습니다.',
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
