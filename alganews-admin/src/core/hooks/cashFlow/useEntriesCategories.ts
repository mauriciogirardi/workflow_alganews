import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from 'core/store';
import * as categoryActions from 'core/store/cashFlow/entriesCategory.slice';
import { CashFlow } from 'mauricio.girardi-sdk';

export const useEntriesCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isFetchingCategories = useSelector(
    (state: RootState) => state.cashFlow.category.isFetchingCategories,
  );
  const expenses = useSelector(
    (state: RootState) => state.cashFlow.category.expenses,
  );
  const revenues = useSelector(
    (state: RootState) => state.cashFlow.category.revenues,
  );

  const fetchCategories = useCallback(
    () => dispatch(categoryActions.getCategories()),
    [dispatch],
  );

  const createCategory = useCallback(
    (category: CashFlow.CategoryInput) =>
      dispatch(categoryActions.createCategory(category)).unwrap(),
    [dispatch],
  );

  const deleteCategory = useCallback(
    (categoryId: number) =>
      dispatch(categoryActions.deleteCategory(categoryId)).unwrap(),
    [dispatch],
  );

  return {
    expenses,
    revenues,
    fetchCategories,
    createCategory,
    deleteCategory,
    isFetchingCategories,
  };
};
