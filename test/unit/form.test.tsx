import React from "react";
import { renderWithProviders } from "./helpers";
import { Form } from '../../src/client/components/Form';
import {screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckoutFormData } from "../../src/common/types";

describe('Форма на странице корзины', () => {
  it('при вводе корректных данных срабатывает отправка данных', async () => {
    const user = userEvent.setup()
    const userData = {
      name: 'Иван Иванов',
      phone: '8911111111',
      address: 'Москва',
  }
    const onSubmit = jest.fn((data: CheckoutFormData)=> data)  
    renderWithProviders(<Form onSubmit={onSubmit} />)
    const nameInput = screen.getByTestId('f-name')
    const phoneInput = screen.getByTestId('f-phone')
    const addressInput = screen.getByTestId('f-address')
    const submitBtn = screen.getByRole('button', {name: 'Checkout'})

    await user.type(nameInput, userData.name);
    await user.type(addressInput, userData.address);
    await user.type(phoneInput, userData.phone);

    expect(nameInput).toHaveValue(userData.name)
    expect(phoneInput).toHaveValue(userData.phone)
    expect(addressInput).toHaveValue(userData.address)
    await user.click(submitBtn);

    expect(onSubmit).toHaveBeenCalledTimes(1) 
    expect(onSubmit).toHaveBeenCalledWith( {
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
    });
  });
  it('при вводе некорректного телефона появляется ошибка', async () => {
    const user = userEvent.setup()
    const userData = {
      name: 'Иван Иванов',
      phone: '891111111',
      address: 'Москва',
  }
    const onSubmit = jest.fn((data: CheckoutFormData)=> data)  
    renderWithProviders(<Form onSubmit={onSubmit} />)
    const phoneInput = screen.getByTestId('f-phone')
    const submitBtn = screen.getByRole('button', {name: 'Checkout'})

    await user.type(phoneInput, userData.phone);

    expect(phoneInput).toHaveValue(userData.phone)
    await user.click(submitBtn);

    expect(onSubmit).not.toBeCalled() 
    expect(screen.getByText('Please provide a valid phone')).toBeVisible();
  });
  it('если не ввести имя, появляется ошибка', async () => {
    const user = userEvent.setup();

    const onSubmit = jest.fn((data: CheckoutFormData)=> data)  
    renderWithProviders(<Form onSubmit={onSubmit} />);
    const nameInput = screen.getByTestId('f-name');
    expect(nameInput).toHaveValue('');
    const submitBtn = screen.getByRole('button', {name: 'Checkout'});
    
    await user.click(submitBtn);

    expect(onSubmit).not.toBeCalled() 
    expect(screen.getByText('Please provide your name')).toBeVisible();
  });
  it('если не ввести адрес, появляется ошибка', async () => {
    const user = userEvent.setup();

    const onSubmit = jest.fn((data: CheckoutFormData)=> data)  
    renderWithProviders(<Form onSubmit={onSubmit} />);
    const addressInput = screen.getByTestId('f-address')
    expect(addressInput).toHaveValue('');
    const submitBtn = screen.getByRole('button', {name: 'Checkout'});
    
    await user.click(submitBtn);

    expect(onSubmit).not.toBeCalled() 
    expect(screen.getByText('Please provide a valid address')).toBeVisible();
  });
})