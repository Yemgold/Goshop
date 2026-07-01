



export interface Product {
  _id: string;
  businessId: string;

  name: string;
  description: string;

  price: number;
  stock: number;

  sku: string;

  media: {
    type: string;
    url: string;
    publicUrl: string;
  }[];

  category: string;

  inStock: boolean;

  reservedQuantity: number;
}

export interface AddStockPayload {
  productId: string;

  businessId: string;

  quantity: number;

  unitCost?: number;

  expiryDate?: string;
}

export interface AddStockResponse {
  success: boolean;

  message: string;

  data: {
    productId: string;

    businessId: string;

    quantityAdded: number;

    currentStock: number;

    unitCost?: number;

    expiryDate?: string;
  };
}