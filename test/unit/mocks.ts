import { ProductShortInfo, Product } from "../../src/common/types";

export const fakeShortProducts: ProductShortInfo[] = [
  {
    id: 1,
    name: 'Phone',
    price: 2000,
  },
  {
    id: 2,
    name: 'Laptop',
    price: 5000,
  },
  {
    id: 3,
    name: 'Table',
    price: 3000,
  },
]

export const fakeFullProducts: Product[] = [
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