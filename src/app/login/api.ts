import axiosInstance from '../api/axiosInstance';

// 로그인 요청
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/api/login', {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.errorMessage || '로그인을 실패했습니다.',
    );
  }
};

// 유저 정보 반환
export const getUserInfo = async (accessToken: string) => {
  try {
    const response = await axiosInstance.get('/api/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.errorMessage ||
        '유저 정보를 불러오는데 실패했습니다.',
    );
  }
};
