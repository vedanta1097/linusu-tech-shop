export interface Order {
  totalPrice: number;
  buyer: string;
  email: string;
  items: Item[];
}

export interface Item {
  category: string;
  name: string;
  price: number;
}
