export interface TProduct {
    image: string,
    id: string
}

/**
 * Parse a Product coming from the API
 * @param Product API Product
 * @returns TProduct
 */
export function parseProduct (product: any): TProduct {
    try {
        return {
            image: product.image,
            id: product.id
        }
    } catch (error) {
        throw new Error('Invalid product object.')
    }
}