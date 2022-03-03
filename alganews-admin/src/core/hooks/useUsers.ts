import { useCallback } from 'react';
import { User } from 'mauricio.girardi-sdk';
import { notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'core/store';
import * as useActions from 'core/store/userReducer';

export const useUsers = () => {
  const dispatch = useDispatch();
  const { fetching, users } = useSelector(
    (state: RootState) => state.user,
  );

  const fetchUsers = useCallback(() => {
    dispatch(useActions.getAllUsers());
  }, [dispatch]);

  const toggleUserStatus = useCallback(
    async (user: User.Detailed | User.Summary) => {
      try {
        await dispatch(useActions.toggleUsersStatus(user));

        user.active === false
          ? notification.success({
              message: `Ativo`,
              description: `O ${user.name} foi Ativo.`,
              placement: 'bottomLeft',
            })
          : notification.success({
              message: `Desativo`,
              description: `O ${user.name} foi Desativado.`,
              placement: 'bottomLeft',
            });

        dispatch(useActions.getAllUsers());
      } catch (err) {
        notification.error({
          message: `Error`,
          description: `Ocorreu um error ao ativar ou desativar um usuário tente novamente.`,
          placement: 'bottomLeft',
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
  };
};
