// Page Object Model: https://www.selenium.dev/documentation/en/guidelines_and_recommendations/page_object_models/

const { Builder, By, until } = require('selenium-webdriver');

jest.setTimeout(50000);

class Page {
  //#region Constructing
  static driver = new Builder().forBrowser('chrome').build();

  constructor(driver) {
    this.rootUrl = 'http://localhost:3001';
    this.driver = driver || Page.driver;
  }

  static quit() {
    return Page.driver.quit();
  }

  getBaseUrl() {
    return this.rootUrl;
  }
  //#endregion

  //#region Common Page methods

  visit(theUrl) {
    return this.driver.get(theUrl);
  }

  visitRoute(route) {
    return this.visit(this.getBaseUrl() + route);
  }

  getCurrentUrl() {
    return this.driver.getCurrentUrl();
  }

  async compareCurrentUrl(theUrl) {
    const curUrl = await this.getCurrentUrl();
    return curUrl === theUrl;
  }

  compareCurrentRoute(theRoute) {
    return this.compareCurrentUrl(this.getBaseUrl() + theRoute);
  }

  sleep(s) {
    return this.driver.sleep(s * 1000);
  }

  wait(css) {
    return this.driver.wait(until.elementLocated(By.css(css)), 5000);
  }

  waitTitle(title) {
    return this.driver.wait(until.titleIs(title), 5000);
  }

  async find(css) {
    return await this.wait(css);
  }

  findAll(css) {
    return this.driver.findElements(By.css(css));
  }

  async write(css, content) {
    const el = await this.find(css);
    return el.sendKeys(content);
  }

  async click(css) {
    const el = await this.find(css);
    return el.click();
  }

  //#endregion
}

module.exports = Page;
