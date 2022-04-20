import { RootState } from 'core/store';
import { setBreadcrumb } from 'core/store/ui.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useBreadcrumb = (newBreadcrumb?: string) => {
  const dispatch = useDispatch();
  const breadcrumb = useSelector((state: RootState) => state.ui.breadcrumb);

  useEffect(() => {
    if (newBreadcrumb) {
      dispatch(setBreadcrumb(newBreadcrumb.split('/')));
    }
  }, [newBreadcrumb, dispatch]);

  return {
    breadcrumb,
  };
};
