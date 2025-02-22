import { ApiRequester } from "./requester"

const endpoint = '/products'

export async function getProducts () {

  const products = await ApiRequester.get(endpoint)
  return products
}
