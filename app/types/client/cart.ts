// Product related
export interface ProductImage {
  path: string;
  // add more fields if needed (e.g. alt, publicId, etc.)
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image?: ProductImage;
  images?: ProductImage[];
  // add other product fields you use
}
// Cart Item
export interface CartItem {
  _id?: string;
  product: Product | string; // can be populated object or just id
  quantity: number;
  price?: number; // unit price stored in cart
  variant?: string;
}
// Cart Response from API
export interface CartData {
  items: CartItem[];
  // add other fields if your getMyCart returns more
}

export interface CartResponse {
  data: CartData;
  // success, message etc. if your API has them
}
// Type Guard
export function isPopulatedProduct(
  product: Product | string
): product is Product {
  return typeof product === "object" && product !== null;
}
// Component Props
export interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (
    productId: string,
    quantity: number,
    variant?: string
  ) => void;
  onRemove: (productId: string, variant?: string) => void;
  isUpdating: boolean;
  isRemoving: boolean;
}
export interface CartItemsListProps {
  items: CartItem[];
  onUpdateQuantity: (
    productId: string,
    quantity: number,
    variant?: string
  ) => void;
  onRemove: (productId: string, variant?: string) => void;
  isUpdating: boolean;
  isRemoving: boolean;
}

export interface OrderSummaryProps {
  subtotal: number;
  totalSavings: number;
  shippingFee: number;
  totalAmount: number;
  onCheckout: () => void;
}