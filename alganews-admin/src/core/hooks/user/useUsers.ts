import { useCallback, useState } from 'react';
import { User } from 'mauricio.girardi-sdk';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'core/store';
import * as useActions from 'core/store/userReducer';

export const useUsers = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<number | null>(null);
  const { fetching, users } = useSelector(
    (state: RootState) => state.user,
  );
  const editors = useSelector((state: RootState) =>
    state.user.users.filter(
      (user) => user.role === 'EDITOR',
    ),
  );

  const fetchUsers = useCallback(() => {
    dispatch(useActions.getAllUsers());
  }, [dispatch]);

  const toggleUserStatus = useCallback(
    async (user: User.Detailed | User.Summary) => {
      setUserId(user.id);
      await dispatch(useActions.toggleUsersStatus(user));

      dispatch(useActions.getAllUsers());
      setUserId(null);
    },
    [dispatch],
  );

  return {
    toggleUserStatus,
    fetchUsers,
    fetching,
    users,
    userId,
    editors,
  };
};
