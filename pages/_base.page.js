// Page Object Model: https://www.selenium.dev/documentation/en/guidelines_and_recommendations/page_object_models/

const { Builder, By, until } = require('selenium-webdriver');

jest.setTimeout(50000);

class Page {
  //#region Constructing
  constructor(driver) {
    this.rootUrl = 'http://localhost:3001';
    this.driver = driver || Page.createDriver();
  }

  static createDriver() {
    return new Builder().forBrowser('chrome').build();
  }

  static _trimSlashEnd(url) {
    return url.replace(/\/+$/g, '');
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
    return Page._trimSlashEnd(curUrl) === Page._trimSlashEnd(theUrl);
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

  // Don't work with React page (SPA):

  // //  https://stackoverflow.com/a/44318725/9787887
  // waitPageReady() {
  //   return this.driver.wait(async () => {
  //     const readyState = await this.driver.executeScript(
  //       'return document.readyState'
  //     );
  //     return readyState === 'complete';
  //   });
  // }

  // // https://stackoverflow.com/a/28549224/9787887
  // async waitForPageLoad(timeout = 5000) {
  //   let oldHtmlElement = await this.find('html');
  //   return this.driver.wait(async () => {
  //     let newHtmlElement = await this.find('html');
  //     let oldHtmlElementId = await oldHtmlElement.getId();
  //     console.log('> : Page -> waitForPageLoad -> oldHtmlElementId', oldHtmlElementId)
  //     let newHtmlElementId = await newHtmlElement.getId();
  //     console.log('> : Page -> waitForPageLoad -> newHtmlElementId', newHtmlElementId)
  //     return oldHtmlElementId !== newHtmlElementId;
  //   }, timeout);
  // }

  async find(css) {
    return await this.wait(css);
  }

  findAll(css) {
    return this.driver.findElements(By.css(css));
  }

  async exists(css) {
    return (await this.findAll(css)).length > 0;
  }

  async write(css, content) {
    const el = await this.find(css);
    return el.sendKeys(content);
  }

  async click(css) {
    const el = await this.find(css);
    return el.click();
  }

  async getText(css) {
    const el = await this.find(css);
    return el.getText();
  }

  async getTextInput(css) {
    const el = await this.find(css);
    return el.getAttribute('value');
  }

  //#endregion
}

module.exports = Page;
