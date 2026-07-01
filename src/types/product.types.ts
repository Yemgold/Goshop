
import type { ShippingRate } from "./shipping.types";


export type MediaType = "image" | "video";

export interface ProductMedia {
  _id?: string;
  type: MediaType;
  url: string;
  publicUrl?: string;
}


export type Product = {
  _id: string;
  id?: string;
  title?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  weight?: number;
  category?: string;
  inStock?: boolean;
  stock?: number;
  sku: string;
  reservedQuantity?: number; 

  vendor?:
    | string
    | {
        _id: string;
        businessName?: string;
      };

  businessId?: string;

  media?: ProductMedia[];
  shippingRates?: ShippingRate[];
};