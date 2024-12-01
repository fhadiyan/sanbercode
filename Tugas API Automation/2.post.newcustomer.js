import request from 'supertest';
import { expect } from 'chai';
import { authToken , BASE_URL }  from './config.js';


let customersid;
export { customersid };

describe('Customer', function () {
  this.timeout(5000);

  it('Positive - Menambahkan Customer Baru', async function () {
    const requestBody = {
      name: 'Gelato',
      phone: '082266559988',
      address: 'Planet Mars',
      description: 'Pelanggan Baru VIP',
    };

    const response = await request(BASE_URL)
      .post('/customers')
      .set('Content-Type', 'application/json')
      .set('Authorization', authToken)
      .send(requestBody);

    // Assert untuk response status
    expect(response.status).to.equal(201);

    // Assert untuk response body structure
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.include.keys('customerId', 'name');

    // Assert untuk response data matches request
    expect(response.body.data.customerId).to.exist;
    expect(response.body.data.name).to.exist;
    expect(response.body.status).to.exist;
    expect(response.body.message).to.exist;

    // Menyimpan customerId ke variabel
    customersid = response.body.data.customerId;
  });

  it('Negative - Menambahkan Customer Baru dengan Name yang Kosong', async function () {
    const requestBody = {
      phone: '082255991133',
      address: 'Jakarta',
      description: 'Pelanggan Lama',
    };

    const response = await request(BASE_URL)
      .post('/customers')
      .set('Content-Type', 'application/json')
      .set('Authorization', authToken)
      .send(requestBody);

    // Assert untuk response status
    expect(response.status).to.equal(400);

    // Assert untuk error message
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.include('\"name\" is required');
  });
});
