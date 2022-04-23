import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { CashFlow } from 'mauricio.girardi-sdk';

import { AppDispatch, RootState } from 'core/store';
import { Key } from 'antd/lib/table/interface';

import * as expensesActions from '../../store/cashFlow/expense.slice';
import * as revenuesActions from '../../store/cashFlow/revenue.slice';

type CashFlowEntryType = CashFlow.EntrySummary['type'];

export const useCashFlow = (type: CashFlowEntryType) => {
  const [forbidden, setForbidden] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
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
      )
        .unwrap()
        .catch((err) => {
          if (err?.data?.status === 403) {
            return setForbidden(true);
          }

          throw err;
        }),
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

  const removeEntry = useCallback(
    (id: number) =>
      dispatch(
        type === 'EXPENSE'
          ? expensesActions.removeExpense(id)
          : revenuesActions.removeRevenue(id),
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

  const createEntry = useCallback(
    (entry: CashFlow.EntryInput) =>
      dispatch(
        type === 'EXPENSE'
          ? expensesActions.createExpenses(entry)
          : revenuesActions.createRevenue(entry),
      ).unwrap(),
    [dispatch, type],
  );

  const updateEntry = useCallback(
    (entryId: number, entry: CashFlow.EntryInput) =>
      dispatch(
        type === 'EXPENSE'
          ? expensesActions.updateExpenses({
              entryId,
              entry,
            })
          : revenuesActions.updateRevenues({
              entryId,
              entry,
            }),
      ).unwrap(),
    [dispatch, type],
  );

  return {
    query,
    entries,
    forbidden,
    setQuery,
    selected,
    createEntry,
    setSelected,
    removeEntry,
    updateEntry,
    fetchEntries,
    isFetchingEntries,
    removeEntriesInBatch,
  };
};
