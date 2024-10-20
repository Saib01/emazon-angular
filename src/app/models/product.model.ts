import { BasicInfo } from "./basic-Info.model";

export type Product ={
    id?:number;
    name:string;
    description:string;
    amount:number;
    price:number;
    brandResponse:BasicInfo;
    categoryResponseList: BasicInfo[];
};

export type ProductRequest = Pick<Product,'name' | 'description' | 'amount' | 'price'> & {
    brandId: number;
    categoryIdsList: Array<number>;
};
