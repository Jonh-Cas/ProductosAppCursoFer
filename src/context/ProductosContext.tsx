import React, { createContext, useState } from "react";
import { Producto } from "../interfaces/appInterfaces";

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (category: string, productName: string ) => Promise<void>; 
    updateProduct: (category: string, productName: string, productId: string ) => Promise<void>; 
    deleteProduct: (  id: string ) => Promise<void>;
    loadProductById: (id :string ) => Promise<Producto>;
    loadImage: (data: any, id: string, ) => Promise<void>;  
}


const ProductContext =  createContext({} as ProductsContextProps );

export const ProductProvider = ({children }: any) => {

    const [products, setProducts] = useState<Producto[]>([])



    return (
        <ProductContext.Provider value={{
            products,
            
        }} >
            { children }
        </ProductContext.Provider>
    );

}