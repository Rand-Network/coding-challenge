import { ApiRequester } from "./requester"

const endpoint = '/transactions'

export async function getTransactions () {
  const transactions = await ApiRequester.get(endpoint)
  return transactions.data
}
