// import axiosInstance from '@/app/api/axiosInstance';

// interface PostData {
//   title: string;
//   content: string;
// }

// export const getPosts = async (accessToken: string | null) => {
//   try {
//     const response = await axiosInstance.get('/api/board', {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     return response.data;
//   } catch (error: any) {
//     throw new Error(
//       error.response?.data?.errorMessage || '게시물 가져오기를 실패했습니다.',
//     );
//   }
// };

// export const postBoard = async (
//   formData: PostData,
//   accessToken: string | null,
// ) => {
//   try {
//     const response = await axiosInstance.post('/api/board', formData, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     return response.data;
//   } catch (error: any) {
//     throw new Error(
//       error.response?.data?.errorMessage || '게시물 등록을 실패했습니다.',
//     );
//   }
// };
