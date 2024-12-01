import request from 'supertest';

const BASE_URL = 'https://kasir-api.zelz.my.id';

let authToken;

  // Autentikasi dan mendapatkan Bearer Token
  const authResponse = await request(BASE_URL)
    .post('/authentications')
    .set('Content-Type', 'application/json')
    .send({
      email: 'tokobaru@mail.com',
      password: 'tokobaru',
    });

  if (authResponse.status === 201 && authResponse.body.data?.accessToken) {
    authToken = `Bearer ${authResponse.body.data.accessToken}`;
  } else {
    throw new Error('Authentication failed');
  }

  export { authToken, BASE_URL };
