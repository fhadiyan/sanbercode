import request from 'supertest';
import { expect } from 'chai';
import { authToken , BASE_URL }  from './config.js';
import { customersid }  from './2.post.newcustomer.js';

describe('Customer', function () {
  this.timeout(5000);

  it('Positive - Menghapus Customer', async function () {
    const response = await request(BASE_URL)
      .delete(`/customers/${customersid}`)
      .set('Authorization', authToken);

    // Assert untuk response status
    expect(response.status).to.equal(200);

    // Assert untuk response body structure
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status');
    expect(response.body.status).to.equal('success');
  });

  it('Negative - Customer Id tidak valid', async function () {
    const invalidCustomerId = 'invalid-id'; 

    const response = await request(BASE_URL)
      .delete('/customers/blablabla')
      .set('Authorization', authToken);

    // Assert untuk response status for customer not found
    expect(response.status).to.equal(404);

    // Assert untuk error message
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal('id tidak valid');
  });
});
