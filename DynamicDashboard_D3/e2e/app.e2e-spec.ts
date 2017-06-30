import { DynamicDashboardD3Page } from './app.po';

describe('dynamic-dashboard-d3 App', () => {
  let page: DynamicDashboardD3Page;

  beforeEach(() => {
    page = new DynamicDashboardD3Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to dd!!');
  });
});
