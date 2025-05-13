import { ProductCollelction, ProductSize, ProductStatus } from "../enums/product.enum";

export interface Product {
    _id: string,
    productStatus: ProductStatus,
    productCollection: ProductCollelction,
    productName: String,
    productPrice: Number,
    productLeftCount: Number,
    productSize: ProductSize,
    productVolume: Number,
    productDesc?: String,
    productImages: String[],
    productViews: String,
    createAt: Date,
    updateAt: Date
}

export interface ProductInquiry {
    order: string;
    page: number;
    limit: number;
    productCollection?: ProductCollelction;
    search?: string;
}