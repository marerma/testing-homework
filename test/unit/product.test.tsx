import React from 'react';
import {describe, it, jest} from '@jest/globals'
import {screen } from '@testing-library/react';
import { renderWithProviders } from './helpers';
import { fakeFullProducts } from '../mocks';
import { ProductDetails } from '../../src/client/components/ProductDetails';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Страница с подробной информацией о продукте', () => {
  it('содержит название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', () => {
    const id = 1;  
    renderWithProviders(<ProductDetails product={fakeFullProducts[id]}/>)
    const {name, price, description, color, material } = fakeFullProducts[id];
    expect(screen.getByRole('heading', {level: 1}).textContent).toEqual(name);
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText(color)).toBeInTheDocument();
    expect(screen.getByText(material)).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes(`${price}`))).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Add to Cart');
  });
  it('если товар уже добавлен в корзину, на странице товара должно отображаться сообщение об этом', async () => {
    const id = 1;  
    renderWithProviders(<ProductDetails product={fakeFullProducts[id]}/>)
    const buttonCart = screen.getByRole('button', { name: 'Add to Cart'});
    await userEvent.click(buttonCart);
    expect((await screen.findByText('Item in cart'))).toBeVisible();
  });
  
})
