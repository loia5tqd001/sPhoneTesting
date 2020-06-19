const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Signin Functionality', () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  test('example', async () => {
    await driver.get('https://www.google.com/ncr');

    await driver.findElement(By.name('q')).sendKeys('webdriver');
    await driver.findElement(By.name('btnK')).click();

    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    expect(1).toBe(1);
  });
});
