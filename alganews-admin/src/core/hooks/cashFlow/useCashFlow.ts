import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { CashFlow } from 'mauricio.girardi-sdk';

import { RootState } from 'core/store';
import { Key } from 'antd/lib/table/interface';

import * as expensesActions from '../../store/cashFlow/expense.slice';
import * as revenuesActions from '../../store/cashFlow/revenue.slice';

type CashFlowEntryType = CashFlow.EntrySummary['type'];

export const useCashFlow = (type: CashFlowEntryType) => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) =>
    type === 'EXPENSE'
      ? state.cashFlow.expense.query
      : state.cashFlow.revenue.query,
  );

  const entries = useSelector((state: RootState) =>
    type === 'EXPENSE'
      ? state.cashFlow.expense.expenses
      : state.cashFlow.revenue.revenues,
  );

  const isFetchingEntries = useSelector((state: RootState) =>
    type === 'EXPENSE'
      ? state.cashFlow.expense.isFetchingExpenses
      : state.cashFlow.revenue.isFetchingRevenue,
  );

  const selected = useSelector((state: RootState) =>
    type === 'EXPENSE'
      ? state.cashFlow.expense.selected
      : state.cashFlow.revenue.selected,
  );

  const fetchEntries = useCallback(
    () =>
      dispatch(
        type === 'EXPENSE'
          ? expensesActions.fetchExpenses()
          : revenuesActions.fetchRevenues(),
      ),
    [dispatch, type],
  );

  const removeEntriesInBatch = useCallback(
    (ids: number[]) =>
      dispatch(
        type === 'EXPENSE'
          ? expensesActions.removeEntriesInBatch(ids)
          : revenuesActions.removeRevenuesInBatch(ids),
      ),
    [dispatch, type],
  );

  const setSelected = useCallback(
    (keys: Key[]) =>
      dispatch(
        type === 'EXPENSE'
          ? expensesActions.setSelectedExpenses(keys)
          : revenuesActions.setSelectedRevenues(keys),
      ),
    [dispatch, type],
  );

  const setQuery = useCallback(
    (query: Partial<CashFlow.Query>) =>
      dispatch(
        type === 'EXPENSE'
          ? expensesActions.setQuery(query)
          : revenuesActions.setQuery(query),
      ),
    [dispatch, type],
  );

  return {
    query,
    entries,
    setQuery,
    selected,
    setSelected,
    fetchEntries,
    isFetchingEntries,
    removeEntriesInBatch,
  };
};
