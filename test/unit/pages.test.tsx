import React from 'react';
import { MemoryRouter } from "react-router-dom";
import {describe, it, expect, jest} from '@jest/globals'
import {Application} from '../../src/client/Application';
import { ROUTES, STATIC_PAGES_CONTENT, renderWithProviders } from './helpers';
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({
  data: [],
});

describe('Страницы', () => {

  it('Главная страница отображает корректное статическое содержание', () => {
      const {container } = renderWithProviders(
      <MemoryRouter initialEntries={[ROUTES.home]}>
          <Application />
      </MemoryRouter>);
      expect(container.textContent).toContain(STATIC_PAGES_CONTENT[ROUTES.home])
      });
  it('Cтраница о доставке отображает корректное статическое содержание', () => {
    const {container } = renderWithProviders(
    <MemoryRouter initialEntries={[ROUTES.devilery]}>
      <Application />
    </MemoryRouter>);  

      expect(container.textContent).toContain(STATIC_PAGES_CONTENT[ROUTES.devilery])
      });
  it('Страница с контактами отображает корректное статическое содержание', () => {
    const {container } = renderWithProviders(
    <MemoryRouter initialEntries={[ROUTES.contacts]}>
      <Application />
    </MemoryRouter>);  
      expect(container.textContent).toContain(STATIC_PAGES_CONTENT[ROUTES.contacts])
      });
    })