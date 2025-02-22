export interface TTransaction {
  createdAt: string,
  name: string,
  amount: number,
  isExpense: boolean,
  id: number,
}

/**
 * Parse a transaction coming from the API
 * @param transaction API transaction
 * @returns TTransaction
 */
export function parseTransaction (transaction: any): TTransaction {
  try {
    return {
      createdAt: transaction.createdAt,
      name: transaction.name,
      amount: Math.round(parseFloat(transaction.amount) * 100),
      isExpense: Boolean(transaction.isExpense),
      id: +transaction.id
    }
  } catch (error) {
    throw new Error('Invalid transaction object.')
  }
}

/**
 * From a Transaction return the price formatted eg. -1.234,56€
 * @param transaction TTransaction - A transaction
 * @returns string - Price formatted
 */
export function formatPrices (transaction: TTransaction): string {
  const amount = transaction.isExpense ? -transaction.amount : transaction.amount

  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100) + "€"
}

/**
 * Sort an array of transactions by createdAt, newer first
 * @param transactions TTransactions Array
 * @returns TTransaction Array - sorted array
 */
export function sortTransactions (transactions: TTransaction[]): TTransaction[] {
  try {
    return transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (err) {
    console.error(err)
    return []
  }
}