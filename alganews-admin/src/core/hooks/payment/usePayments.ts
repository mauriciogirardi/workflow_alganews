import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { AppDispatch, RootState } from 'core/store';

import * as paymentActions from '../../store/payment.slice';
import { Payment } from 'mauricio.girardi-sdk';
import { Key } from 'antd/lib/table/interface';

export const usePayments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isFetching = useSelector((state: RootState) => state.payment.fetching);
  const payments = useSelector((state: RootState) => state.payment.paginated);
  const query = useSelector((state: RootState) => state.payment.query);
  const selected = useSelector((state: RootState) => state.payment.selected);

  const fetchPayments = useCallback(
    () => dispatch(paymentActions.getAllPayments()).unwrap(),
    [dispatch],
  );

  const approvingPaymentsInBatch = useCallback(
    (ids: number[]) => dispatch(paymentActions.approvedPaymentInBatch(ids)),
    [dispatch],
  );

  const setQuery = useCallback(
    (query: Payment.Query) => dispatch(paymentActions.setQuery(query)),
    [dispatch],
  );

  const setSelected = useCallback(
    (Keys: Key[]) => dispatch(paymentActions.storeSelectedKeys(Keys)),
    [dispatch],
  );

  const deletePayment = useCallback(
    (id: number) => {
      dispatch(paymentActions.deletePayment(id));
    },
    [dispatch],
  );

  return {
    query,
    setQuery,
    payments,
    selected,
    isFetching,
    setSelected,
    deletePayment,
    fetchPayments,
    approvingPaymentsInBatch,
  };
};
