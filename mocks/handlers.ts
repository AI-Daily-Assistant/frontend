import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get(`http://118.41.132.243:8080/api/auth/register`, () => {
    return HttpResponse.json({});
  }),
];
