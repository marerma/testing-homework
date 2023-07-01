import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {describe, it, jest} from '@jest/globals'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Application} from '../../src/client/Application';
import { ROUTES, ShopTitle, checkNavLinkByHref, findLinkByName, renderWithProviders, setupTestStore } from './helpers';
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({
  data: [],
});


describe('Навигация', () => {

  it('В шапке отображаются ссылки на страницы магазина и корзину', () => {
      renderWithProviders(<BrowserRouter>
          <Application />
      </BrowserRouter>);
      const nav = screen.getByRole('navigation');
      const navLinks = Array.from(nav.querySelectorAll('.nav-link'));
      expect(navLinks).toHaveLength(4);  
      expect(navLinks.every(el => el.tagName === 'A')).toBeTruthy();
      expect(checkNavLinkByHref(navLinks, ROUTES.cart)).toBeTruthy();
      expect(checkNavLinkByHref(navLinks, ROUTES.catalog)).toBeTruthy();
      expect(checkNavLinkByHref(navLinks, ROUTES.devilery)).toBeTruthy();
      expect(checkNavLinkByHref(navLinks, ROUTES.contacts)).toBeTruthy();
      });

  it('Название магазина в шапке должно быть ссылкой на главную страницу', () => {
    renderWithProviders(<BrowserRouter>
      <Application />
  </BrowserRouter>);
    const nav = screen.getByRole('navigation');
    const title = nav.querySelector('.navbar-brand');
    expect(title).toHaveTextContent(ShopTitle);
    expect(title?.tagName).toEqual('A');
    expect(title).toHaveAttribute('href', ROUTES.home);
  });

  it('При клике на навигационную ссылку "Каталог" происходит переход на страницу с каталогом', async() => {
    renderWithProviders(<BrowserRouter>
      <Application />
  </BrowserRouter>);
    await userEvent.click(findLinkByName('Catalog'));
    expect(
       (await screen.findByRole('heading', {
         level: 1,
       }))).toHaveTextContent('Catalog');
  });
  it('При клике на навигационную ссылку "Доставка" происходит переход на страницу с доставкой', async() => {
    renderWithProviders(<BrowserRouter>
      <Application />
  </BrowserRouter>);
    await userEvent.click(findLinkByName('Delivery'));
    expect(
      (await screen.findByRole('heading', {
        level: 1,
      }))).toHaveTextContent('Delivery');
    });
    it('При клике на навигационную ссылку "Корзина" происходит переход на страницу с корзиной', async() => {
      renderWithProviders(<BrowserRouter>
        <Application />
    </BrowserRouter>);;
      await userEvent.click(findLinkByName(/Cart/));
      expect(
         (await screen.findByRole('heading', {
           level: 1,
         }))).toHaveTextContent('Shopping cart');
    });
  it('При клике на навигационную ссылку "Контакты" происходит переход на страницу с контактами', async() => {
    renderWithProviders(<BrowserRouter>
      <Application />
  </BrowserRouter>);
    await userEvent.click(findLinkByName('Contacts'));
    expect(
       (await screen.findByRole('heading', {
         level: 1,
       }))).toHaveTextContent('Contacts');
  });
  it('При клике на название магазина в шапке открывается главная страница', async() => {
    renderWithProviders(<BrowserRouter>
      <Application />
  </BrowserRouter>);
    const nav = screen.getByRole('navigation');
    const title = nav.querySelector('.navbar-brand') as HTMLElement;
    await userEvent.click(title);
    expect(
       (await screen.findByText('Welcome to Example store!'))
       ).toBeTruthy();
  });
})

