- Download dependencies:

```
yarn # install local modules
yarn global add chromedriver # this package needs to be installed globally
sudo yarn global add jest # this package needs to be installed globally
```

- Run:

```
yarn test # deliver test results on report folder
// or
yarn test-coverage # deliver test results on report and coverage folder 
```

## Structure

- Testing source code will be located in the `test` folder
- Reports for the testing will be located in the `report` folder

### Source code structure

Source code is organized using the ideaology of the [Page Object Models](https://www.selenium.dev/documentation/en/guidelines_and_recommendations/page_object_models/):

- `_base-page.lib.js` contains the `Page` class, which is the base class for all the pages to be tested. The `Page` class contains methods which are common actions of DOM behavior.

- Each page to be tested will have 3 files:

  - `pagename.lib.js`: contains the subclass of the `Page` class. That "subclass" contains methods which are actions specifically to that page. 
  - `pagename.test.js`: contains all the test suites, test cases of the page. 
  - `pagename.locators.js`: contains all the constant css specifically to that page. 


## Guidelines

### Tutorial

- https://www.youtube.com/watch?v=YWhxSsj1upg&list=PLA4JPGpQHctT__mDO9EHvOrWVW0Hkf5Mk&index=1 (obseleted though)

### Docs

- https://www.selenium.dev/documentation/en/getting_started_with_webdriver/locating_elements/
- https://www.selenium.dev/documentation/en/getting_started_with_webdriver/performing_actions_on_the_aut/
- https://www.selenium.dev/documentation/en/webdriver/
- https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Actions.html#click
- https://github.com/seleniumhq/selenium/wiki/webdriverjs
- https://jestjs.io/docs/en/getting-started
- https://jestjs.io/docs/en/expect