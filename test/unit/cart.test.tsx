import React from 'react';
import { MemoryRouter } from 'react-router';
import {screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Catalog } from '../../src/client/pages/Catalog';
import { CartApi, ExampleApi } from '../../src/client/api';
import { ROUTES, renderWithProviders } from './helpers';
import { fakeFullProducts, fakeShortProducts } from './mocks';
import {Application} from '../../src/client/Application';
import { ProductDetails } from '../../src/client/components/ProductDetails';
import { Cart } from '../../src/client/pages/Cart';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { CartState } from '../../src/common/types';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Корзина', () => {
 it('если корзина пустая, должна отображаться ссылка на каталог товаров', () => {
  const {store} = renderWithProviders(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>);
  expect(screen.getByText(/Cart is empty/)).toBeInTheDocument();
  expect(screen.getByRole('link', {name: 'catalog'})).toHaveAttribute('href', ROUTES.catalog)
 });

 it('в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
  const {store} = renderWithProviders(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>);
  store.dispatch({type: 'ADD_TO_CART', product: fakeFullProducts[0]});
  store.dispatch({type: 'ADD_TO_CART', product: fakeFullProducts[1]});
  
  const clearBtn = screen.getByRole('button', {name: 'Clear shopping cart'});
  expect(screen.getByRole('table')).toBeInTheDocument();
  const allProductsInCart = [screen.getByTestId(fakeFullProducts[0].id), screen.getByTestId(fakeFullProducts[1].id)];
  allProductsInCart.forEach((item) => expect(screen.getByRole('table')).toContainElement(item))
  expect(allProductsInCart).toHaveLength(2);
  await userEvent.click(clearBtn);
  const table = screen.queryByRole('table');
  expect(table).toBeNull();
  expect(await screen.findByText(/Cart is empty/)).toBeInTheDocument();
 });

 it('в корзине для каждого товара должны отображаться название, цена, количество, стоимость, а также должна отображаться общая сумма заказа', async () => {
  const {store} = renderWithProviders(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>);
  store.dispatch({type: 'ADD_TO_CART', product: fakeFullProducts[0]});
  store.dispatch({type: 'ADD_TO_CART', product: fakeFullProducts[1]});

  expect(screen.getByRole('table')).toBeInTheDocument();

  const allProductsInCart = [screen.getByTestId(fakeFullProducts[0].id), screen.getByTestId(fakeFullProducts[1].id)];

  for (let i = 0; i < allProductsInCart.length; i++) {
    const {id, name, price} = fakeFullProducts[i];
    const productInCart = screen.getByTestId(id);
    expect(productInCart.querySelector('.Cart-Name')).toHaveTextContent(name);
    expect(productInCart.querySelector('.Cart-Price')).toHaveTextContent(`${price}`);
    expect(productInCart.querySelector('.Cart-Count')).toHaveTextContent('1');
    expect(productInCart.querySelector('.Cart-Total')).toHaveTextContent(`${price}`);
  }

  expect(screen.getByTestId('total')).toHaveTextContent(`${fakeFullProducts[0].price + fakeFullProducts[1].price}`)

 });

 it('в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async () => {
  const {store} = renderWithProviders(
    <BrowserRouter>
      <Application />
    </BrowserRouter>);
  
  expect(screen.getByRole('link', {name: /Cart/})).toHaveTextContent('Cart');

  store.dispatch({type: 'ADD_TO_CART', product: fakeFullProducts[0]});
  store.dispatch({type: 'ADD_TO_CART', product: fakeFullProducts[1]});

  expect(screen.getByRole('link', {name: /Cart/})).toHaveTextContent('Cart (2)');
  store.dispatch({type: 'ADD_TO_CART', product: fakeFullProducts[0]});
  expect(screen.getByRole('link', {name: /Cart/})).toHaveTextContent('Cart (2)');
  store.dispatch({type: 'ADD_TO_CART', product: fakeFullProducts[2]});
  expect(screen.getByRole('link', {name: /Cart/})).toHaveTextContent('Cart (3)');
 });

});
