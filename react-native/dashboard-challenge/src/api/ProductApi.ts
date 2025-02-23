import { ApiRequester } from "./requester"

const endpoint = '/products'

export async function getProducts () {
  const products = await ApiRequester.get(endpoint)
  return products
}

/**
 * Function to resolve a single image URL
 * @param initialUrl string - url to resolve redirect
 * @returns string - the final jpg url
 */
export const getRedirectUrl = async (initialUrl: string): Promise<string> => {
  try {
    const response = await ApiRequester.get(initialUrl)
    const redirectUrl = response.request.responseURL
    return redirectUrl ? redirectUrl : initialUrl
  } catch (error) {
    console.error(error)
    return initialUrl
  }
}