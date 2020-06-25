const ProvidersPage = require('../../pages/providers.page');
const SignInPage = require('../../pages/signin.page');

describe('Edit a provider', () => {
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

  test('same id in url after click edit', async () => {
    const id = await providersPage.editFirstRow();
    const sameRoute = await providersPage.compareCurrentRoute('/' + id + '/update');
    expect(sameRoute).toBe(true);
  });

  test('same id in form after click edit', async () => {
    const idInListPage = await providersPage.editFirstRow();
    const idInDetailPage = await providersPage.getProviderIdInDetailPage();
    expect(idInListPage).toEqual(idInDetailPage);
  });

  test('not have history import', async () => {
    await providersPage.editFirstRow();
    const hasHistory = await providersPage.hasHistoryImport();
    expect(hasHistory).toBe(false);
  });

  test('add more to address', async () => {
    await providersPage.editFirstRow();
    await providersPage.submitProviderInfo({ address: 'Gò vấp' });
    await providersPage.sleep(1);
    const sameRoute = await providersPage.compareCurrentRoute('');
    expect(sameRoute).toBe(true);
  });

  test("can't add more to phone", async () => {
    await providersPage.editFirstRow();
    await providersPage.submitProviderInfo({ phone: '123' });
    const hasErrorPhone = await providersPage.hasErrorPhone();
    expect(hasErrorPhone).toBe(true);
  });

  test('add more to provider name', async () => {
    await providersPage.editFirstRow();
    await providersPage.submitProviderInfo({ name: 'Gò vấp' });
    await providersPage.sleep(1);
    const sameRoute = await providersPage.compareCurrentRoute('');
    expect(sameRoute).toBe(true);
  });
  
  test("Can't edit provider id anyway", async () => {
    const oldId = await providersPage.editFirstRow();
    const newId = await providersPage.editId('15');
    expect(oldId).toEqual(newId);
  });
});
