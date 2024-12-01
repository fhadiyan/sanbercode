import request from 'supertest';
import { expect } from 'chai';
import { authToken , BASE_URL }  from './config.js';
import { customersid }  from './2.post.newcustomer.js';

describe('Customer', function () {
  this.timeout(5000);

  it('Positive - Merubah Data Customer', async function () {
    const requestBody = {
        name: 'Gelato Golate',
        phone: '082266559988',
        address: 'Planet Mars',
        description: 'Pelanggan Lama VIP',
    };

    const response = await request(BASE_URL)
      .put(`/customers/${customersid}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', authToken)
      .send(requestBody);

    // Assert untuk response status
    expect(response.status).to.equal(200);

    // Assert untuk response body structure
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.include.keys('name');
  });

  it('Negative - Customer Id tidak valid', async function () {
    const invalidCustomerId = 'invalid-id';
    const requestBody = {
      name: 'Invalid Customer',
      phone: '082255991133',
      address: 'Jakarta',
      description: 'Not Found Customer',
    };

    const response = await request(BASE_URL)
      .put('/customers/blablabla')
      .set('Content-Type', 'application/json')
      .set('Authorization', authToken)
      .send(requestBody);

    // Assert untuk response status for customer not found
    expect(response.status).to.equal(404);

    // Assert untuk error message
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal('id tidak valid');
  });
});
