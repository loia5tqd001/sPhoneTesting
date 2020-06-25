const ProvidersPage = require('../../pages/providers.page');
const SignInPage = require('../../pages/signin.page');

describe('View a provider', () => {
  let driver = ProvidersPage.createDriver();
  let providersPage, signInPage;

  beforeAll(async () => {
    providersPage = new ProvidersPage(driver);
    signInPage = new SignInPage(driver);

    await signInPage.signIn('khai', '123');
  });

  afterAll(() => {
    driver.quit();
  });

  test('has data in table', async () => {
    const hasData = await providersPage.hasData();
    expect(hasData).toBe(true);
  })

  test('same id in url after view detail', async () => {
    const id = await providersPage.viewFirstRow();
    const sameRoute = await providersPage.compareCurrentRoute('/' + id);
    expect(sameRoute).toBe(true);
  });

  test('same id in form after view detail', async () => {
    const idInListPage = await providersPage.viewFirstRow();
    const idInDetailPage = await providersPage.getProviderIdInDetailPage();
    expect(idInListPage).toEqual(idInDetailPage);
  });

  test('has history import', async () => {
    await providersPage.viewFirstRow();
    const hasHistory = await providersPage.hasHistoryImport();
    expect(hasHistory).toBe(true);
  });
});
