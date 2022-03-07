import { useCallback, useState } from 'react';
import { User } from 'mauricio.girardi-sdk';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'core/store';
import * as useActions from 'core/store/userReducer';
import { notification } from 'core/utils/notification';

export const useUsers = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<number | null>(null);
  const { fetching, users } = useSelector(
    (state: RootState) => state.user,
  );

  const fetchUsers = useCallback(() => {
    dispatch(useActions.getAllUsers());
  }, [dispatch]);

  const toggleUserStatus = useCallback(
    async (user: User.Detailed | User.Summary) => {
      try {
        setUserId(user.id);
        await dispatch(useActions.toggleUsersStatus(user));

        const isActive = user.active;
        const description = `O ${user.name} foi ${
          isActive ? 'Desativado' : 'Ativo'
        }.`;

        isActive
          ? notification({
              title: 'DESATIVADO',
              description,
            })
          : notification({
              title: 'ATIVO',
              description,
            });

        dispatch(useActions.getAllUsers());
      } catch (err) {
        notification({
          type: 'error',
          title: 'Houve um error',
          description: 'Houve um erro tente novamente.',
        });
      } finally {
        setUserId(null);
      }
    },
    [dispatch],
  );

  return {
    toggleUserStatus,
    fetchUsers,
    fetching,
    users,
    userId,
  };
};
