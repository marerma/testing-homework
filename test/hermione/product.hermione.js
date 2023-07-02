const {ROUTES, fakeFullProducts} = require('./helpers');

  it('Конент страницы отдельного продукта существует и отображается с полными данными товаре', async function({browser}) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.goto(`${ROUTES.catalog}/5`);
    
    await expect(await browser.$('.ProductDetails-Name')).toExist();
    await expect(await browser.$('.ProductDetails-Description')).toExist();
    await expect(await browser.$('.ProductDetails-Price')).toExist();
    await expect(await browser.$('.ProductDetails-Color')).toExist();
    await expect(await browser.$('.ProductDetails-Material')).toExist();
  });

  it('Конент страницы отдельного продукта содержит большую кнопку "добавить в корзину"', async function({browser}) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    
    const mock = await browser.mock('http://localhost:3000/hw/store/api/products/1', {
      method: 'get'
    })

    mock.respond(fakeFullProducts[0], {
      statusCode: 200,
      fetchResponse: true
    });
    
    await page.goto(`${ROUTES.catalog}/1`);
    await browser.assertView('addButton','.ProductDetails-AddToCart')
  });