const {ROUTES} = require('./helpers');
const assert = require('assert');

describe('Корзина', async function() {
    it('если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await browser.setWindowSize(1920,  1080);
      await page.goto(`${ROUTES.catalog}/0`);
      const addBtn = await browser.$('.ProductDetails-AddToCart');
      assert.ok((await addBtn.getText()) === 'Add to Cart', 'Кнопка добавления товара не найдена');
      await addBtn.click();
      await addBtn.click();
      await page.goto(ROUTES.cart);
      const productAmount = await browser.$('.Cart-Count').getText();
      assert.ok(productAmount === '2', 'Количество товара неверное');
    });

    it('содержимое корзины должно сохраняться между перезагрузками страницы', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await browser.setWindowSize(1920,  1080);
      await page.goto(`${ROUTES.catalog}/0`);
      const addBtn1 = await browser.$('.ProductDetails-AddToCart');
      await addBtn1.click();

      await page.goto(`${ROUTES.catalog}/1`);
      const addBtn2 = await browser.$('.ProductDetails-AddToCart');
      await addBtn2.click();

      await page.goto(ROUTES.cart);
      const totalPriceBeforeReload = await browser.$('.Cart-OrderPrice').getText();
      await page.reload();
      const totalPriceAfterReload = await browser.$('.Cart-OrderPrice').getText();
      await expect(totalPriceBeforeReload).toEqual(totalPriceAfterReload)
    });


    it('после заполнения формы, появляется сообщение об успешной отправке заказа', async function({browser}) {
      const puppeteer = await browser.getPuppeteer();
      const [page] = await puppeteer.pages();
      await browser.setWindowSize(1920, 1080);
      await page.goto(`${ROUTES.catalog}/1`);
      const addBtn1 = await browser.$('.ProductDetails-AddToCart');
      await addBtn1.click();

      await page.goto(ROUTES.cart);
      await browser.$('#f-name').setValue('Иван Иванович');
      await browser.$('#f-phone').setValue('8912345678');
      await browser.$('#f-address').setValue('Moscow');
      await browser.$('.Form-Submit').click();

      await expect(await browser.$('.alert-heading').getText()).toEqual('Well done!');

      await browser.assertView('formsuccess', '.Cart-SuccessMessage', {
        ignoreElements: ['.Cart-Number']
      });
    });
})