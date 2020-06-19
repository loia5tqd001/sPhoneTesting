const GooglePage = require('./google-page.lib');
let page;

describe('Searching', () => {

  beforeAll(() => {
    page = new GooglePage();
  });

  afterAll(() => {
    page.quit();
  });

  test('search for "webdriver"', async () => {
    await page.searchFor('webdriver', 'webdriver - Google Search');
  });

  test('search for "uit"', async () => {
    await page.searchFor('uit', 'uit - Google Search');
  });
  
});
