import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '../../../src/shared/api/apiRequest';

if (process.env.NEXT_PUBLIC_MOCK_API === 'true') {
  import('@/../mocks/server').then(({ server }) => {
    server.listen();
    console.log('MSW server-side mocking enabled');
  });
}

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.headers.get('Authorization')?.split('Bearer ')[1];

    const response = await axiosInstance.get('/api/member/info', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('유저 정보 요청 중 오류 발생:', error);

    if (error.response?.status === 400) {
      return NextResponse.json(
        {
          errorCode: error.response.data?.errorCode || 'BAD_REQUEST',
          errorMessage:
            error.response.data?.errorMessage || '유저 정보 가져오기 실패',
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
