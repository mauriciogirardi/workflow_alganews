import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

export const getThunkStatus = (thunks: [AnyAsyncThunk, ...AnyAsyncThunk[]]) => {
  const success = isFulfilled(...thunks);
  const error = isRejected(...thunks);
  const loading = isPending(...thunks);

  return { success, error, loading };
};
