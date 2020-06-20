const Page = require('./_base.page');
const { BUTTON_ADD, INPUTS_PROVIDER } = require('./providers.locators');

class ProvidersPage extends Page {
  getBaseUrl() {
    return this.rootUrl + '/providers';
  }

  async clickButtonAdd() {
    await super.visitRoute('/');
    await super.click(BUTTON_ADD);
  }

  async getTextOfInputs() {
    const allInputs = await super.findAll(INPUTS_PROVIDER);

    // == How to use reduce with async/await in JS: https://stackoverflow.com/a/41243567/9787887
    // const allTexts = await allInputs.reduce(async(acc, cur) => {
    //   acc += await cur.getText();
    // }, Promise.resolve(''));

    // == Better just use a for loop:
    let allTexts = '';
    for (const input of allInputs) {
      allTexts += await input.getText();
    }

    return allTexts;
  }
}

module.exports = ProvidersPage;
