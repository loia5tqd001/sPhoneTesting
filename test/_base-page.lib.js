// Page Object Model: https://www.selenium.dev/documentation/en/guidelines_and_recommendations/page_object_models/

const { Builder, By, until } = require('selenium-webdriver');

jest.setTimeout(50000);

class Page {
  driver = new Builder().forBrowser('chrome').build();

  visit = (theUrl) => {
    return this.driver.get(theUrl);
  };

  quit = () => {
    return this.driver.quit();
  };

  sleep = (s) => {
    return this.driver.sleep(s * 1000);
  };

  wait = (css) => {
    return this.driver.wait(until.elementLocated(By.css(css)), 5000);
  };

  waitTitle = (title) => {
    return this.driver.wait(until.titleIs(title), 5000);
  };

  find = async (css) => {
    return await this.wait(css);
  };

  findAll = (css) => {
    return this.driver.findElements(By.css(css));
  };

  write = async (css, content) => {
    const el = await this.find(css);
    return el.sendKeys(content);
  };

  click = async (css) => {
    const el = await this.find(css);
    return el.click();
  };
}

module.exports = Page;
