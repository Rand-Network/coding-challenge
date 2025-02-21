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
      id: transaction.id
    }
  } catch (error) {
    throw new Error('Invalid transaction object.')
  }
}

export function formatPrices (transaction: TTransaction): string {
  const amount = transaction.isExpense ? -transaction.amount : transaction.amount

  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100) + "€"
}