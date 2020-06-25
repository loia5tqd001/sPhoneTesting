const Page = require('./_base.page');
const {
  BUTTON_ADD,
  BUTTON_VIEW_DETAIL,
  BUTTON_EDIT,
  BUTTON_DELETE,
  INPUTS_PROVIDER,
  INPUT_PROVIDER_ID,
  INPUT_PROVIDER_NAME,
  INPUT_PROVIDER_PHONE,
  INPUT_PROVIDER_ADDRESS,
  ERROR_PROVIDER_NAME,
  ERROR_PROVIDER_PHONE,
  ERROR_PROVIDER_ADDRESS,
  BUTTON_SAVE,
  BUTTON_REFRESH,
  FIRST_ROW_SELECT,
  FIRST_ROW_ID,
  HISTORY_IMPORT_TITLE,
} = require('./providers.locators');

class ProvidersPage extends Page {
  getBaseUrl() {
    return this.rootUrl + '/providers';
  }

  async clickButtonAdd() {
    await super.visitRoute('/');
    await super.click(BUTTON_ADD);
  }

  async getTextOfInputsInDetailPage() {
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

  async enterProviderInfo({ name = '', phone = '', address = '' }) {
    await super.write(INPUT_PROVIDER_NAME, name);
    await super.write(INPUT_PROVIDER_PHONE, phone);
    await super.write(INPUT_PROVIDER_ADDRESS, address);
  }

  async submitProviderInfo(info) {
    await this.enterProviderInfo(info);
    await super.click(BUTTON_SAVE);
    const stuck = await super.exists(INPUTS_PROVIDER);
    return !stuck;
  }

  async hasErrorName() {
    return super.exists(ERROR_PROVIDER_NAME);
  }

  async hasErrorPhone() {
    return super.exists(ERROR_PROVIDER_PHONE);
  }

  async hasErrorAddress() {
    return super.exists(ERROR_PROVIDER_ADDRESS);
  }

  async refreshForm() {
    await super.click(BUTTON_REFRESH);
    const allText = await this.getTextOfInputsInDetailPage();
    return allText.length === 0;
  }

  async selectFirstRow() {
    await super.visitRoute('');
    await super.sleep(0.5);
    await super.click(FIRST_ROW_SELECT);
    await super.sleep(0.5);
    return await super.getText(FIRST_ROW_ID);
  }

  async viewFirstRow() {
    const id = await this.selectFirstRow();
    await super.click(BUTTON_VIEW_DETAIL);
    await super.sleep(1);
    return id;
  }

  async editFirstRow() {
    const id = await this.selectFirstRow();
    await super.click(BUTTON_EDIT);
    await super.sleep(1);
    return id;
  }

  async editId(newContent) {
    await super.write(INPUT_PROVIDER_ID, newContent);
    return super.getTextInput(INPUT_PROVIDER_ID);
  }

  async hasData() {
    await super.visitRoute('');
    return super.exists(FIRST_ROW_SELECT);
  }

  async getProviderIdInDetailPage() {
    return await super.getTextInput(INPUT_PROVIDER_ID);
  }

  hasHistoryImport() {
    return super.exists(HISTORY_IMPORT_TITLE);
  }
}

module.exports = ProvidersPage;
