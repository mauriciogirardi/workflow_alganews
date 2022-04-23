import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CashFlow, CashFlowService } from 'mauricio.girardi-sdk';
import { format } from 'date-fns';
import { Key } from 'antd/lib/table/interface';

import { RootState } from '..';
import { getThunkStatus } from '../utils/getThunksStatus';

interface RevenueState {
  revenues: CashFlow.EntrySummary[];
  isFetchingRevenue: boolean;
  query: CashFlow.Query;
  selected: Key[];
}

const initialState: RevenueState = {
  isFetchingRevenue: false,
  selected: [],
  revenues: [],
  query: {
    type: 'REVENUE',
    sort: ['transactedOn', 'desc'],
    yearMonth: format(new Date(), 'yyyy-MM'),
  },
};

export const fetchRevenues = createAsyncThunk(
  'cash-flow/revenues/fetchRevenues',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { query } = (getState() as RootState).cashFlow.revenue;
      const revenues = await CashFlowService.getAllEntries(query);
      await dispatch(storeRevenues(revenues));
    } catch (err) {
      if (typeof err === 'object') {
        return rejectWithValue({ ...err });
      }
    }
  },
);

export const removeRevenuesInBatch = createAsyncThunk(
  'cash-flow/revenues/removeRevenuesInBatch',
  async (ids: number[], { dispatch }) => {
    await CashFlowService.removeEntriesBatch(ids);
    await dispatch(fetchRevenues());
  },
);

export const removeRevenue = createAsyncThunk(
  'cash-flow/revenue/removeRevenue',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await CashFlowService.removeExistingEntry(id);
      await dispatch(fetchRevenues());
    } catch (err) {
      if (typeof err === 'object') {
        return rejectWithValue({ ...err });
      }
    }
  },
);

export const setQuery = createAsyncThunk(
  'cash-flow/revenues/setQuery',
  async (query: Partial<CashFlow.Query>, { dispatch }) => {
    await dispatch(_setQuery(query));
    await dispatch(fetchRevenues());
  },
);

export const createRevenue = createAsyncThunk(
  'cash-flow/revenues/createRevenue',
  async (revenue: CashFlow.EntryInput, { dispatch, rejectWithValue }) => {
    try {
      await CashFlowService.insertNewEntry(revenue);
      await dispatch(fetchRevenues());
    } catch (err) {
      if (typeof err === 'object') return rejectWithValue({ ...err });
    }
  },
);

export const updateRevenues = createAsyncThunk(
  'cash-flow/revenues/updateRevenues',
  async (
    { entry, entryId }: { entry: CashFlow.EntryInput; entryId: number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await CashFlowService.updateExistingEntry(entryId, entry);
      await dispatch(fetchRevenues());
    } catch (err) {
      if (typeof err === 'object') return rejectWithValue({ ...err });
    }
  },
);

const revenueSlice = createSlice({
  initialState,
  name: 'cash-flow/expense',
  reducers: {
    storeRevenues(state, action: PayloadAction<CashFlow.EntrySummary[]>) {
      state.revenues = action.payload;
    },
    setSelectedRevenues(state, action: PayloadAction<Key[]>) {
      state.selected = action.payload;
    },
    setQuery(state, action: PayloadAction<Partial<CashFlow.Query>>) {
      state.query = {
        ...state.query,
        ...action.payload,
      };
    },
    setIsFetchingRevenue(state, action: PayloadAction<boolean>) {
      state.isFetchingRevenue = action.payload;
    },
  },
  extraReducers(builder) {
    const { error, loading, success } = getThunkStatus([
      removeRevenuesInBatch,
      fetchRevenues,
      createRevenue,
      updateRevenues,
      removeRevenue,
    ]);

    builder
      .addMatcher(success, (state) => {
        state.isFetchingRevenue = false;
      })
      .addMatcher(error, (state) => {
        state.isFetchingRevenue = false;
      })
      .addMatcher(loading, (state) => {
        state.isFetchingRevenue = true;
      });
  },
});

export const {
  setIsFetchingRevenue,
  setSelectedRevenues,
  storeRevenues,
  setQuery: _setQuery,
} = revenueSlice.actions;

const revenueReducer = revenueSlice.reducer;
export default revenueReducer;
