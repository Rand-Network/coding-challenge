import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/TransactionApi";

// Query transactions
export function useTransactions () {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })
}