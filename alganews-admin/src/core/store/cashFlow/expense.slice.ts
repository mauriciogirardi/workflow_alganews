import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CashFlow, CashFlowService } from 'mauricio.girardi-sdk';
import { format } from 'date-fns';
import { Key } from 'antd/lib/table/interface';

import { getThunkStatus } from '../utils/getThunksStatus';
import { RootState } from '..';

interface ExpenseState {
  expenses: CashFlow.EntrySummary[];
  isFetchingExpenses: boolean;
  query: CashFlow.Query;
  selected: Key[];
}

const initialState: ExpenseState = {
  isFetchingExpenses: false,
  selected: [],
  expenses: [],
  query: {
    type: 'EXPENSE',
    sort: ['transactedOn', 'desc'],
    yearMonth: format(new Date(), 'yyyy-MM'),
  },
};

export const fetchExpenses = createAsyncThunk(
  'cash-flow/expenses/fetchExpenses',
  async (_, { getState, dispatch }) => {
    const { query } = (getState() as RootState).cashFlow.expense;
    const expenses = await CashFlowService.getAllEntries(query);
    await dispatch(storeExpenses(expenses));
  },
);

export const removeEntriesInBatch = createAsyncThunk(
  'cash-flow/expenses/removeEntriesInBatch',
  async (ids: number[], { dispatch }) => {
    await CashFlowService.removeEntriesBatch(ids);
    await dispatch(fetchExpenses());
  },
);

export const setQuery = createAsyncThunk(
  'cash-flow/expenses/setQuery',
  async (query: Partial<CashFlow.Query>, { dispatch }) => {
    await dispatch(_setQuery(query));
    await dispatch(fetchExpenses());
  },
);

export const createExpenses = createAsyncThunk(
  'cash-flow/expenses/createExpenses',
  async (expenses: CashFlow.EntryInput, { dispatch, rejectWithValue }) => {
    try {
      await CashFlowService.insertNewEntry(expenses);
      await dispatch(fetchExpenses());
    } catch (err) {
      if (typeof err === 'object') return rejectWithValue({ ...err });
    }
  },
);

const expenseSlice = createSlice({
  initialState,
  name: 'cash-flow/expense',
  reducers: {
    storeExpenses(state, action: PayloadAction<CashFlow.EntrySummary[]>) {
      state.expenses = action.payload;
    },
    setSelectedExpenses(state, action: PayloadAction<Key[]>) {
      state.selected = action.payload;
    },
    setQuery(state, action: PayloadAction<Partial<CashFlow.Query>>) {
      state.query = {
        ...state.query,
        ...action.payload,
      };
    },
    setIsFetchingExpenses(state, action: PayloadAction<boolean>) {
      state.isFetchingExpenses = action.payload;
    },
  },
  extraReducers(builder) {
    const { error, loading, success } = getThunkStatus([
      removeEntriesInBatch,
      fetchExpenses,
      createExpenses,
    ]);

    builder
      .addMatcher(success, (state) => {
        state.isFetchingExpenses = false;
      })
      .addMatcher(error, (state) => {
        state.isFetchingExpenses = false;
      })
      .addMatcher(loading, (state) => {
        state.isFetchingExpenses = true;
      });
  },
});

export const {
  setIsFetchingExpenses,
  setSelectedExpenses,
  storeExpenses,
  setQuery: _setQuery,
} = expenseSlice.actions;

const expenseReducer = expenseSlice.reducer;
export default expenseReducer;
