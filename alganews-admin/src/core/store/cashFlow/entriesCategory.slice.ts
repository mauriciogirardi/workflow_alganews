import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CashFlow, CashFlowService } from 'mauricio.girardi-sdk';
import { getThunkStatus } from '../utils/getThunksStatus';

interface EntriesCategoryState {
  isFetchingCategories: boolean;
  expenses: CashFlow.CategorySummary[];
  revenues: CashFlow.CategorySummary[];
}

const initialState: EntriesCategoryState = {
  isFetchingCategories: false,
  expenses: [],
  revenues: [],
};

export const getCategories = createAsyncThunk(
  'cash-flow/categories/getCategories',
  async (_, { dispatch }) => {
    const categories = await CashFlowService.getAllCategories({
      sort: ['id', 'desc'],
    });

    /* TODO: melhorar isso assim que a API prover um endpoint
     * Utilizando filtro local por que a API não prove uma forma
     * de recuperar as categorias separadamente por tipo.
     */
    const filterCategories = (type: 'EXPENSE' | 'REVENUE') =>
      categories.filter((category) => category.type === type);

    await dispatch(storeExpenses(filterCategories('EXPENSE')));
    await dispatch(storeRevenues(filterCategories('REVENUE')));
  },
);

export const createCategory = createAsyncThunk(
  'cash-flow/categories/createCategory',
  async (category: CashFlow.CategoryInput, { dispatch }) => {
    await CashFlowService.insertNewCategory(category);
    await dispatch(getCategories());
  },
);

const entriesCategorySlice = createSlice({
  initialState,
  name: 'cash-flow/categories',
  reducers: {
    storeExpenses(state, action: PayloadAction<CashFlow.CategorySummary[]>) {
      state.expenses = action.payload;
    },

    storeRevenues(state, action: PayloadAction<CashFlow.CategorySummary[]>) {
      state.revenues = action.payload;
    },

    storeFetching(state, action: PayloadAction<boolean>) {
      state.isFetchingCategories = action.payload;
    },
  },
  extraReducers(builder) {
    const { error, loading, success } = getThunkStatus([
      getCategories,
      createCategory,
    ]);

    builder
      .addMatcher(success, (state) => {
        state.isFetchingCategories = false;
      })
      .addMatcher(error, (state) => {
        state.isFetchingCategories = false;
      })
      .addMatcher(loading, (state) => {
        state.isFetchingCategories = true;
      });
  },
});

export const { storeExpenses, storeFetching, storeRevenues } =
  entriesCategorySlice.actions;

const entriesCategoryReducer = entriesCategorySlice.reducer;
export default entriesCategoryReducer;
