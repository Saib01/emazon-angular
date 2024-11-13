import { Product } from "./product.model";

export type ShoppingCartItem= Pick<Product,'id'|'name' | 'amount' | 'price'|'brandResponse'|'categoryResponseList'> & {
    unitsInCart:number,
    restockDate?:string,
}; 