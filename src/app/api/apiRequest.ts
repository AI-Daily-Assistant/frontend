import axios, { AxiosError, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;

const getAccessToken = (): string | null => {
  return sessionStorage.getItem('accessToken');
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const apiRequest = async (
  HTTPMethod: HttpMethod,
  endPoint: string,
  data?: Object | null,
  param?: Object | null,
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      params: HTTPMethod === 'GET' && param ? param : undefined,
    };

    let response: AxiosResponse;
    switch (HTTPMethod) {
      case 'GET':
        response = await axiosInstance.get(endPoint, config);
        break;
      case 'POST':
        response = await axiosInstance.post(endPoint, data || {}, config);
        break;
      case 'PUT':
        response = await axiosInstance.put(endPoint, data || {}, config);
        break;
      case 'DELETE':
        response = await axiosInstance.delete(endPoint, config);
        break;
      default:
        throw new Error('Unsupported HTTP method');
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(`API request failed: ${axiosError.message}`);
    throw (
      axiosError.response?.data ||
      'An error occurred while processing the request'
    );
  }
};
