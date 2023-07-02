import { RenderOptions, render, screen } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { initStore } from '../../src/client/store'
import { CartApi, ExampleApi } from "../../src/client/api";
import { Provider } from 'react-redux';

export const BASENAME = '/hw/store';

export const ROUTES = {
  home:  '/',
  catalog:  '/catalog',
  devilery:  '/delivery',
  contacts:  '/contacts',
  cart:  '/cart',
};

export const ShopTitle = 'Example store'
export const checkNavLinkByHref = (nodeList: Element[], href: string) => {
  return Boolean(nodeList.find(node => node?.getAttribute('href') === href))
}

export const findNavLinkByText = (nodeList: Element[], text: string | RegExp) => {
  return nodeList.find(el => el.textContent?.match(text) || el.textContent === text)
}

export const findLinkByName = (linkName: string | RegExp) => {
   const nav = screen.getByRole('navigation');
   const navLinks = Array.from(nav.querySelectorAll('.nav-link'));
   const link = findNavLinkByText(navLinks, linkName) as Element;
   return link
}

export const STATIC_PAGES_CONTENT = {
  [ROUTES.home]: 'Sed voluptatum quis voluptates laudantium incidunt laudantium. Illo non quos eos vel ipsa. Explicabo itaque est optio neque rerum provident enim qui sed. Corrupti commodi voluptatem vero soluta hic.',
  [ROUTES.devilery]: 'Deserunt occaecati tempora. Qui occaecati est aliquam. Enim qui nulla ipsam. Incidunt impedit enim consequuntur amet at consequuntur vero.',
  [ROUTES.contacts]: 'Ut non consequatur aperiam ex dolores. Voluptatum harum consequatur est totam. Aut voluptatum aliquid aut optio et ea.'
}


type TestStore = ReturnType<typeof initStore>;

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: TestStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    store = initStore(new ExampleApi('http://localhost:3000/hw/store'), new CartApi()),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (<>
    <Provider store={store}> {children} </Provider>
    </>);
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
