const ProvidersPage = require('../../pages/providers.page');
const SignInPage = require('../../pages/signin.page');

describe('Add a provider', () => {
  let providersPage, signInPage;

  beforeAll(async () => {
    providersPage = new ProvidersPage();
    signInPage = new SignInPage();

    await signInPage.signIn('khai', '123');
  });

  afterAll(() => {
    ProvidersPage.quit();
  });

  test('redirect to the "create" route when click button "Thêm mới"', async () => {
    await providersPage.clickButtonAdd();
    const sameRoute = await providersPage.compareCurrentRoute('/create');
    expect(sameRoute).toBe(true);
  });

  test('inputs are empty when the "create" route first loaded', async () => {
    await providersPage.clickButtonAdd();
    const allTexts = await providersPage.getTextOfInputs();
    expect(allTexts).toHaveLength(0);
  });
});
