import request from 'supertest';
import { expect } from 'chai';
import { authToken , BASE_URL }  from './config.js';
import { customersid }  from './2.post.newcustomer.js';


describe('Customer', function () {
    this.timeout(5000);
  
    it('Positive - Menampilkan Data Customer', async function () {
      const response = await request(BASE_URL)
        .get(`/customers/${customersid}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', authToken)
  
      // Assert untuk response status
      expect(response.status).to.equal(200);
  
      // Assert untuk response body structure
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.include.keys('customer');
      expect(response.body.data.customer).to.have.property('name');

      // Assert untuk response data matches request
      expect(response.body.data.customer.name).to.exist;
      expect(response.body.data.customer.phone).to.exist;
      expect(response.body.data.customer.address).to.exist;
      expect(response.body.data.customer.description).to.exist;
    });
  });