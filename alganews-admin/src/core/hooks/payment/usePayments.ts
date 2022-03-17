import {
  Payment,
  PayrollService,
} from 'mauricio.girardi-sdk';
import { useCallback, useState } from 'react';

export const usePayments = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [payments, setPayments] =
    useState<Payment.Paginated>();

  const fetchPayments = useCallback(
    async (query: Payment.Query) => {
      setIsFetching(true);
      const payments = await PayrollService.getAllPayments(
        query,
      );
      setPayments(payments);
      setIsFetching(false);
    },
    [],
  );

  return {
    payments,
    fetchPayments,
    isFetching,
  };
};
