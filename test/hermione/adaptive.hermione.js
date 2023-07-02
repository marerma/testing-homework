const {ROUTES} = require('./helpers');

describe('Вёрстка должна адаптироваться под ширину экрана', async function() {
    it('Конент главной страницы не выходит за пределы вьюпорта при сужении экрана', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await page.goto(ROUTES.home);
      await browser.assertView('bodyL', 'body')
      await browser.setWindowSize(1200,  1080);
      await browser.assertView('bodyM', 'body')
      await browser.setWindowSize(767,  1080);
      await browser.assertView('bodyS', 'body')
      await browser.setWindowSize(500,  1080);
      await browser.assertView('bodyXS', 'body')
      await browser.setWindowSize(320,  1080);
    });
    it('Конент страницы о доставке не выходит за пределы вьюпорта при сужении экрана', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await page.goto(ROUTES.devilery);
      await browser.assertView('delivery-bodyL', 'body')
      await browser.setWindowSize(1200,  1080);
      await browser.assertView('delivery-bodyM', 'body')
      await browser.setWindowSize(767,  1080);
      await browser.assertView('delivery-bodyS', 'body')
      await browser.setWindowSize(500,  1080);
      await browser.assertView('delivery-bodyXS', 'body')
      await browser.setWindowSize(320,  1080);
    });
    it('Конент страницы каталога не выходит за пределы вьюпорта при сужении экрана на L-M размерах', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await page.goto(ROUTES.catalog);
      await browser.assertView('catalog-bodyL', 'body', {screenshotDelay: 2000, ignoreElements: ['.card-body']})
      await browser.setWindowSize(1200,  9999);
      await browser.assertView('catalog-bodyM', 'body', {screenshotDelay: 3000, ignoreElements: ['.card-body']})

    });
    it('Конент страницы каталога не выходит за пределы вьюпорта при сужении экрана  на XS-S размерах', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await browser.setWindowSize(767,  9999);
      await page.goto(ROUTES.catalog);
      await browser.assertView('catalog-bodyS', 'body', {screenshotDelay: 2000, ignoreElements: ['.card-body']} )
      await browser.setWindowSize(500,  9999);
      await browser.assertView('catalog-bodyXS', 'body', {screenshotDelay: 4000, ignoreElements: ['.card-body']})
      await browser.setWindowSize(320,  9999);
    });
    it('Конент страницы контакты не выходит за пределы вьюпорта при сужении экрана', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await page.goto(ROUTES.contacts);
      await browser.assertView('contacts-bodyL', 'body')
      await browser.setWindowSize(1200,  1080);
      await browser.assertView('contacts-bodyM', 'body')
      await browser.setWindowSize(767,  1080);
      await browser.assertView('contacts-bodyS', 'body')
      await browser.setWindowSize(500,  1080);
      await browser.assertView('contacts-bodyXS', 'body')
      await browser.setWindowSize(320,  1080);
    });
    it('Конент страницы корзины не выходит за пределы вьюпорта при сужении экрана', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await page.goto(ROUTES.cart);
      await browser.assertView('cart-bodyL', 'body')
      await browser.setWindowSize(1200,  1080);
      await browser.assertView('cart-bodyM', 'body')
      await browser.setWindowSize(767,  1080);
      await browser.assertView('cart-bodyS', 'body')
      await browser.setWindowSize(500,  1080);
      await browser.assertView('cart-bodyXS', 'body')
      await browser.setWindowSize(320,  1080);
    });
});
