export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  priceFormatted: string;
  image: string;
  material: string;
  dimensions?: string;
  weight?: string;
  isNew?: boolean;
}

export interface CartItem {
  cartId: string;
  product: Product;
  quantity: number;
}
