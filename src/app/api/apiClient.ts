import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 기반 인증 (서버 사이드 쿠키 포함)
});

// 서버로 요청시 사용 불가능 (브라우저에서만 사용 - storage 사용)
// // 요청 인터셉터
// apiClient.interceptors.request.use(
//   (config) => {
//     if (typeof window !== 'undefined') {
//       const accessToken = localStorage.getItem('accessToken');
//       if (accessToken) {
//         config.headers['Authorization'] = `Bearer ${accessToken}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // 응답 인터셉터
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (typeof window !== 'undefined') {
//         try {
//           const refreshToken = localStorage.getItem('refreshToken');

//           if (!refreshToken) {
//             throw new Error('No refresh token found');
//           }

//           const { data } = await axios.post(
//             '/api/auth/refresh',
//             { refreshToken },
//             { withCredentials: true },
//           );

//           const { accessToken, refreshToken: newRefreshToken } = data;

//           localStorage.setItem('accessToken', accessToken);
//           localStorage.setItem('refreshToken', newRefreshToken);

//           // 새로운 액세스 토큰으로 요청 다시 보내기
//           originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//           return apiClient(originalRequest);
//         } catch (refreshError) {
//           console.error('토큰 갱신 실패', refreshError);
//           localStorage.removeItem('accessToken');
//           localStorage.removeItem('refreshToken');
//           window.location.href = '/login';
//         }
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export default apiClient;
