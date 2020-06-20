const Page = require('./_base.page');
const { INPUT_USERNAME, INPUT_PASSWORD, BUTTON_SIGNIN } = require('./signin.locators');

class SignInPage extends Page {
  getBaseUrl() {
    return this.rootUrl + '/signin';
  }

  async signIn(username, password) {
    await super.visitRoute('/');
    await super.write(INPUT_USERNAME, username);
    await super.write(INPUT_PASSWORD, password);
    await super.click(BUTTON_SIGNIN);
  }
}

module.exports = SignInPage;
