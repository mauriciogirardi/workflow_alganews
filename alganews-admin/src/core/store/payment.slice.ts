import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Payment, PayrollService } from 'mauricio.girardi-sdk';
import { Key } from 'antd/lib/table/interface';
import { RootState } from '.';
import { getThunkStatus } from './utils/getThunksStatus';

interface PaymentState {
  paginated: Payment.Paginated;
  fetching: boolean;
  query: Payment.Query;
  selected: Key[];
}

const initialState: PaymentState = {
  fetching: false,
  selected: [],
  query: {
    sort: ['scheduledTo', 'desc'],
    page: 0,
    size: 12,
  },
  paginated: {
    page: 0,
    size: 12,
    totalElements: 0,
    totalPages: 1,
    content: [],
  },
};

export const getAllPayments = createAsyncThunk(
  'payment/getAllPayments',
  async (_, { getState, dispatch }) => {
    const {
      payment: { query },
    } = getState() as RootState;
    const paymentPaginated = await PayrollService.getAllPayments(query);
    await dispatch(storeList(paymentPaginated));
  },
);

export const deletePayment = createAsyncThunk(
  'payment/deletePayment',
  async (id: number, { dispatch }) => {
    await PayrollService.removeExistingPayment(id);
    await dispatch(getAllPayments());
  },
);

export const approvedPaymentInBatch = createAsyncThunk(
  'payment/approvedPaymentInBatch',
  async (paymentId: number[], { dispatch }) => {
    await PayrollService.approvePaymentsBatch(paymentId);
    await dispatch(getAllPayments());
    await dispatch(storeSelectedKeys([]));
  },
);

export const setQuery = createAsyncThunk(
  'payment/setQuery',
  async (query: Payment.Query, { dispatch }) => {
    await dispatch(storeQuery(query));
    await dispatch(getAllPayments());
  },
);

const paymentSlice = createSlice({
  initialState,
  name: 'payment',
  reducers: {
    storeList(state, action: PayloadAction<Payment.Paginated>) {
      state.paginated = action.payload;
    },
    storeQuery(state, action: PayloadAction<Payment.Query>) {
      state.query = {
        ...state.query,
        ...action.payload,
      };
    },
    storeSelectedKeys(state, action: PayloadAction<Key[]>) {
      state.selected = action.payload;
    },
  },

  extraReducers(builder) {
    const { error, loading, success } = getThunkStatus([
      getAllPayments,
      approvedPaymentInBatch,
      deletePayment,
    ]);

    builder
      .addMatcher(success, (state) => {
        state.fetching = false;
      })
      .addMatcher(error, (state) => {
        state.fetching = false;
      })
      .addMatcher(loading, (state) => {
        state.fetching = true;
      });
  },
});

export const { storeList, storeQuery, storeSelectedKeys } =
  paymentSlice.actions;

const paymentReducer = paymentSlice.reducer;
export default paymentReducer;
