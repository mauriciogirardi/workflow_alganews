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

        //TODO get error 400 here.

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
        setUserId(null);
      } catch (err) {
        setUserId(null);
        notification({
          title: 'Erro',
          description:
            'Ocorreu um erro ao ativar ou desativar um usuário tente novamente.',
          type: 'error',
        });
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
