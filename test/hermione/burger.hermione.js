const {ROUTES} = require('./helpers');

describe('При ширине экрана меньше 576px ', async function() {
  it('Меню скрывается за бургер-иконкой', async function({browser}) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await browser.setWindowSize(575,  1080);
    await page.goto(ROUTES.home);
    await browser.assertView('burgerMenu', '.navbar');
  });
  it('при клике на иконку бургер-меню открывается меню с навигационными сслыками, при клике на ссылку меню закрывается', async function({browser}) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await browser.setWindowSize(575,  1080);
    await page.goto(ROUTES.home);
    await browser.assertView('menuHidden', '.navbar');
    const burgerBtn = await browser.$('.navbar button');
    const bodyOutOfBtn = await browser.$('h1')
    await burgerBtn.click();
    await bodyOutOfBtn.click(); // to remove focused btn style
    await browser.assertView('menuOpen', '.navbar', {screenshotDelay: 2000});
    const menuItem = await browser.$('.navbar .nav-link[href="/hw/store/delivery"]');
    await menuItem.click();
    await browser.assertView('menuClosedAfterCkilck', '.navbar', {screenshotDelay: 2000});
  });
});
