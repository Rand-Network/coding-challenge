import { getRedirectUrl } from "../api/ProductApi"

export interface TProduct {
    image: string,
    id: string
}

/**
 * Parse a Product coming from the API
 * @param Product API Product
 * @returns TProduct
 */
export const parseProduct = async (product: any): Promise<TProduct> => {
    try {
        return {
            image: await getRedirectUrl(product.image),
            id: product.id
        }
    } catch (error) {
        throw new Error('Invalid product object.')
    }
}