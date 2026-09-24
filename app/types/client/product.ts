
// Common / Shared Types
export interface ProductImage {
  path: string;
  publicId?: string;
}
export interface WishlistProduct {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image?: ProductImage;
  images?: ProductImage[];
  // add any other fields you need
}
export interface WishlistResponse {
  data: WishlistProduct[];
}
export interface Category {
  _id: string;
  name: string;
  slug?: string;
}

export interface Brand {
  _id: string;
  name: string;
  logo?: { path?: string };
}
// Product Types
export interface ProductListItem {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  stock?: number;
  image?: ProductImage;
  images?: ProductImage[];
  averageRating?: number;
  is_feature?: boolean;
  new_arrival?: boolean;
  category?: Category | string;
  brand?: Brand | string;
}

// Full product (detail page)
export interface ProductDetail {
  _id: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  image?: ProductImage;
  images?: ProductImage[];
  tags?: string[];
  new_arrival?: boolean;
  is_feature?: boolean;
  averageRating?: number;
  category?: Category | string;
  brand?: Brand | string;
}
// API Response Types

export interface Pagination {
  total?: number;
  totalPages?: number;
  page?: number;
  limit?: number;
}

export interface ProductsListResponse {
  data: ProductListItem[];
  meta?: Pagination;
}

export interface CategoriesResponse {
  data: Category[];
}

export interface BrandsResponse {
  data: Brand[];
}

export interface ProductDetailResponse {
  data: ProductDetail;
}
// Component Props
export interface ProductsEmptyProps {
  onClearFilters: () => void;
}

export interface ProductsGridProps {
  products: ProductListItem[];
  isLoading: boolean;
  onClearFilters: () => void;
}

export interface ProductsHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  productsCount: number;
  totalProducts: number;
  onSearchSubmit: (e: React.SyntheticEvent) => void;
}

export interface ProductsFiltersProps {
  categories: Category[];
  brands: Brand[];
  selectedCategory: string;
  selectedBrand: string;
  searchTerm: string;
  onCategoryChange: (id: string) => void;
  onBrandChange: (id: string) => void;
  onClearFilters: () => void;
}

export interface ProductCardProps {
  product: ProductListItem;
  isWishlisted?: boolean;
}
export interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  hasDiscount: boolean;
  discountPercent: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export interface ProductInfoProps {
  product: ProductDetail;
  hasDiscount: boolean;
  discountPercent: number;
  finalUnitPrice: number;
  perItemSavings: number;
  brandName: string;
  categoryName: string;
}
export interface ProductPurchaseSectionProps {
  product: ProductDetail;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  totalPrice: number;
  totalRealPrice: number;
  totalSavings: number;
  hasDiscount: boolean;
  added: boolean;
  isAddingToCart: boolean;
  isAddingToWishlist: boolean;
  onAddToCart: () => void;
  onWishlist: () => void;
}