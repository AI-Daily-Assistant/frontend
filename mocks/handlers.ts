import { http, HttpResponse } from 'msw';

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  age: number;
}

interface LoginRequest {
  email: string;
  password: string;
  name: string;
  age: number;
}

interface BoardRequest {
  title: string;
  content: string;
}

export const handlers = [
  http.get(
    'http://118.41.132.243:8080/api/member/info',
    async ({ request }) => {
      const authHeader = request.headers.get('Authorization');

      if (!authHeader || !authHeader.includes('mocked-access-token')) {
        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      return HttpResponse.json(
        {
          email: 'mock test email',
          name: 'mock test name',
        },
        { status: 200 },
      );
    },
  ),
  http.get('http://118.41.132.243:8080/api/board/all', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.includes('mocked-access-token')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json(
      [
        {
          title: 'mock title 입니당~',
          content: 'mock content 입니당~',
        },
        {
          title: 'mock title 222 입니당~',
          content: 'mock content 222 입니당~',
        },
      ],
      { status: 200 },
    );
  }),
  http.post(
    'http://118.41.132.243:8080/api/auth/register',
    async ({ request }) => {
      const body = (await request.json()) as RegisterRequest;

      if (!body.email || !body.password || !body.name || !body.age) {
        return HttpResponse.json(
          { message: 'Invalid request data' },
          { status: 400 },
        );
      }

      return HttpResponse.json(
        { message: 'Mocked registration success' },
        { status: 201 },
      );
    },
  ),

  http.post(
    'http://118.41.132.243:8080/api/auth/login',
    async ({ request }) => {
      const body = (await request.json()) as LoginRequest;

      if (!body.email || !body.password) {
        return HttpResponse.json(
          { message: 'Invalid request data' },
          { status: 400 },
        );
      }

      return HttpResponse.json(
        {
          message: 'Mocked registration success',
          accessToken: 'mocked-access-token',
          refreshToken: 'mocked-refresh-token',
        },
        { status: 201 },
      );
    },
  ),

  http.post('http://118.41.132.243:8080/api/board', async ({ request }) => {
    const body = (await request.json()) as BoardRequest;

    if (!body.title || !body.content) {
      return HttpResponse.json(
        { message: 'Invalid request data' },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        message: 'Mocked Board Request success',
      },
      { status: 201 },
    );
  }),
];
