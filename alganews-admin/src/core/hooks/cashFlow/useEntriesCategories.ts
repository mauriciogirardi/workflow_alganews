import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { RootState } from 'core/store';
import * as categoryActions from '../../store/cashFlow/entriesCategory.slice';
import { CashFlow } from 'mauricio.girardi-sdk';

export const useEntriesCategories = () => {
  const dispatch = useDispatch();
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
      dispatch(categoryActions.createCategory(category)),
    [dispatch],
  );

  return {
    expenses,
    revenues,
    fetchCategories,
    createCategory,
    isFetchingCategories,
  };
};
