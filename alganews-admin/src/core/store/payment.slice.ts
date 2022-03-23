import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Payment, PayrollService } from 'mauricio.girardi-sdk';
import { RootState } from '.';

interface PaymentState {
  paginated: Payment.Paginated;
  fetching: boolean;
  query: Payment.Query;
}

const initialState: PaymentState = {
  fetching: false,
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

export const approvedPaymentInBatch = createAsyncThunk(
  'payment/approvedPaymentInBatch',
  async (paymentId: number[]) => {
    await PayrollService.approvePaymentsBatch(paymentId);
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
  },

  extraReducers(builder) {
    const loading = isPending(getAllPayments, approvedPaymentInBatch);
    const success = isFulfilled(getAllPayments, approvedPaymentInBatch);
    const error = isRejected(getAllPayments, approvedPaymentInBatch);

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

export const { storeList, storeQuery } = paymentSlice.actions;

const paymentReducer = paymentSlice.reducer;
export default paymentReducer;
