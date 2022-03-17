import {
  Payment,
  PayrollService,
} from 'mauricio.girardi-sdk';
import { useCallback, useState } from 'react';

export const usePayments = () => {
  const [payments, setPayments] =
    useState<Payment.Paginated>();

  const fetchPayments = useCallback(
    async (query: Payment.Query) => {
      const payments = await PayrollService.getAllPayments(
        query,
      );
      setPayments(payments);
    },
    [],
  );

  return {
    payments,
    fetchPayments,
  };
};
