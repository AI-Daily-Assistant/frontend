import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '../apiRequest';

if (process.env.NEXT_PUBLIC_MOCK_API === 'true') {
  import('@/../mocks/server').then(({ server }) => {
    server.listen();
    console.log('MSW server-side mocking enabled');
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    console.log('테스트', formData);

    const { email, password, name, age } = formData;

    // 필수 필드 검증
    const errors: Record<string, string> = {};

    if (!email) errors.email = '이메일을 입력해야 합니다.';
    if (!password) errors.password = '비밀번호를 입력해야 합니다.';
    if (!name) errors.name = '이름을 입력해야 합니다.';
    if (!age) errors.age = '나이를 입력해야 합니다.';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const response = await axiosInstance('/api/auth/register', formData);

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
