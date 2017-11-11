import { AxisFrontEndPage } from './app.po';

describe('axis-front-end App', function() {
  let page: AxisFrontEndPage;

  beforeEach(() => {
    page = new AxisFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
