const BASE_URL = 'http://localhost:3000/hw/store';

const ROUTES = {
  home: `${BASE_URL}/`,
  catalog: `${BASE_URL}/catalog`,
  devilery: `${BASE_URL}/delivery`,
  contacts: `${BASE_URL}/contacts`,
  cart: `${BASE_URL}/cart`,
};

const fakeFullProducts = [
  {
    id: 1,
    name: 'Phone',
    price: 2000,
    description: 'An apple mobile which is nothing like apple',
    color: 'red',
    material: 'metal',
  },
  {
    id: 2,
    name: 'Laptop',
    price: 5000,
    color: 'red',
    description: 'An apple mobile which is nothing like apple',
    material: 'metal',
  },
  {
    id: 3,
    name: 'Table',
    price: 3000,
    color: 'black',
    description: 'A good basic table',
    material: 'wood',
  },
]

module.exports = {
  ROUTES,
  fakeFullProducts
};