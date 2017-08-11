import { BiologistWebPage } from './app.po';

describe('biologist-web App', () => {
  let page: BiologistWebPage;

  beforeEach(() => {
    page = new BiologistWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
