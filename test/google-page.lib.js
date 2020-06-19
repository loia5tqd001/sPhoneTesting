const Page = require('./_base-page.lib');
const { SEARCH_INPUT, SEARCH_BUTTON } = require('./google-page.locators');

class GooglePage extends Page {

  searchFor = async (content, title) => {
    await this.visit('https://www.google.com/ncr');
    await this.write(SEARCH_INPUT, content);
    await this.sleep(1);
    await this.click(SEARCH_BUTTON);
    const titleDisplayed = await this.waitTitle(title);
    expect(titleDisplayed).toBe(true);
  };

}

module.exports = GooglePage;
