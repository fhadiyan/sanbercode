import request from 'supertest';
import { expect } from 'chai';

const BASE_URL = 'https://kasir-api.zelz.my.id';

let authToken;
export { authToken };

describe('POST /authentications', function () {
  this.timeout(10000);

  // Autentikasi dan mendapatkan Bearer Token
  it('should authenticate user successfully with valid credentials', async function () {
    const response = await request(BASE_URL)
      .post('/authentications')
      .set('Content-Type', 'application/json')
      .send({
        email: 'tokobaru@mail.com',
        password: 'tokobaru',
      });

    // Assert untuk response status
    expect(response.status).to.equal(201);

    // Assert untuk response body structure
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.have.property('accessToken');
    expect(response.body.data).to.have.property('refreshToken');

    // Menyimpan token ke variabel
    authToken = `Bearer ${response.body.data.accessToken}`;
  });

  it('should return 401 for invalid credentials', async function () {
    const response = await request(BASE_URL)
      .post('/authentications')
      .set('Content-Type', 'application/json')
      .set(
        'Authorization', authToken)
      .send({
        email: 'invalid@mail.com',
        password: 'wrongpassword',
      });

    // Assert untuk response status
    expect(response.status).to.equal(401);

    // Assert untuk error message
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal('Kredensial yang Anda berikan salah');
  });
});

