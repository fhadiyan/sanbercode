import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

import assert from 'assert';

describe('SauceDemo Test', () => {
it('should open saucedemo.com and assert the URL', async () => {
// Buka URL
await browser.url('https://www.saucedemo.com');

// Lakukan assertion pada URL
const currentURL = await browser.getUrl();
const expectedURL = 'https://www.saucedemo.com/';

assert.strictEqual(currentURL, expectedURL, `URL is not as expected. Actual: ${currentURL}, Expected: ${expectedURL}`);
    });
});

