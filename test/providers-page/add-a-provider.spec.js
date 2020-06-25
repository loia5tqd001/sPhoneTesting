const ProvidersPage = require('../../pages/providers.page');
const SignInPage = require('../../pages/signin.page');

describe('Add a provider', () => {
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

  test('redirect to the "create" route when click button "Thêm mới"', async () => {
    await providersPage.clickButtonAdd();
    const sameRoute = await providersPage.compareCurrentRoute('/create');
    expect(sameRoute).toBe(true);
  });

  test('inputs are empty when the "create" route first loaded', async () => {
    await providersPage.clickButtonAdd();
    const allTexts = await providersPage.getTextOfInputsInDetailPage();
    expect(allTexts).toHaveLength(0);
  });

  test('case provider name has number', async () => {
    await providersPage.clickButtonAdd();
    await providersPage.enterProviderInfo({
      name: 'Nhà cung cấp 1',
      phone: '',
      address: '',
    });
    const hasErrorName = await providersPage.hasErrorName();
    expect(hasErrorName).toBe(true);
  });

  test('phone wrong format', async () => {
    await providersPage.clickButtonAdd();
    await providersPage.enterProviderInfo({
      name: 'Nhà cung cấp Thủ Đức',
      phone: '1212u39',
      address: '',
    });
    const hasErrorPhone = await providersPage.hasErrorPhone();
    expect(hasErrorPhone).toBe(true);
  });

  test('empty provider address', async () => {
    await providersPage.clickButtonAdd();
    await providersPage.submitProviderInfo({
      name: 'Nhà cung cấp',
      phone: '0961178682',
      address: '',
    });
    const hasErrorAddress = await providersPage.hasErrorAddress();
    expect(hasErrorAddress).toBe(true);
  });

  test('refresh button', async () => {
    await providersPage.clickButtonAdd();
    await providersPage.enterProviderInfo({
      name: 'Nhà cung cấp',
      phone: '0961178682',
      address: 'Thôn 2',
    });
    const refreshed = await providersPage.refreshForm();
    expect(refreshed).toBe(true);
  });

  test('submit a provider', async () => {
    await providersPage.clickButtonAdd();
    const success = await providersPage.submitProviderInfo({
      name: 'Nhà cung cấp',
      phone: '0961178682',
      address: 'Thôn 2',
    });
    expect(success).toBe(true);
  });
});
