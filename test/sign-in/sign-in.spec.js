const SignInPage = require('../../pages/signin.page');

describe('Sign in', () => {
  let driver = SignInPage.createDriver();
  let signInPage;

  beforeAll(() => {
    signInPage = new SignInPage(driver);
  });

  afterAll(() => {
    driver.quit();
  });

  test('Sign in with empty username and password', async () => {
    const success = await signInPage.signIn('', '');
    expect(success).toBe(false);
  });

  test('Sign in with wrong username and password', async () => {
    const success = await signInPage.signIn('1', '1');
    expect(success).toBe(false);
  });

  test('Sign in with username and empty password', async () => {
    const success = await signInPage.signIn('khai', '');
    expect(success).toBe(false);
  });

  test('Sign in with empty username and password', async () => {
    const success = await signInPage.signIn('', '123');
    expect(success).toBe(false);
  });
  
  test('Sign in with the right username and password', async () => {
    const success = await signInPage.signIn('khai', '123');
    expect(success).toBe(true);
  });
});
