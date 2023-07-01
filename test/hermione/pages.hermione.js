const {ROUTES} = require('./helpers');

describe('Страницы', async function() {
    it('Главная страница существует и отображается с верным заголовком', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await browser.setWindowSize(1920,  1080);
      await page.goto(ROUTES.home);
      await expect(browser).toHaveTitleContaining('Welcome — Example store')
      await browser.assertView('mainPage', 'body');
    });
    it('Страница каталог существует и отображается с верным заголовком', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await browser.setWindowSize(1920,  1080);
      await page.goto(ROUTES.catalog);
      await expect(browser).toHaveTitleContaining('Catalog — Example store')
    });
    it('Страница доставка существует и отображается с верным заголовком', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await browser.setWindowSize(1920,  1080);
      await page.goto(ROUTES.devilery);

      await expect(browser).toHaveTitleContaining('Delivery — Example store')
      await browser.assertView('deliveryPage', 'body');
    });
    it('Страница с конактами существует и отображается с верным заголовком', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await browser.setWindowSize(1920,  1080);
      await page.goto(ROUTES.contacts);

      await browser.assertView('contactsPage', 'body');
      await expect(browser).toHaveTitleContaining('Contacts — Example store')
    });
    it('Конент страницы отдельного продукта существует и отображается с верным заголовком', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await browser.setWindowSize(1920,  9999);
      await page.goto(`${ROUTES.catalog}/0`);
      await browser.assertView('productId-0', 'body');
    });
});
