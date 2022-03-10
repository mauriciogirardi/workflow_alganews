import { notification } from 'core/utils/notification';
import { User, UserService } from 'mauricio.girardi-sdk';
import { useCallback, useState } from 'react';

export const useUpdate = () => {
  const [error, setError] = useState<Error>();

  const fetchUpdateUser = useCallback(
    (userId: number, user: User.Input) => {
      UserService.updateExistingUser(userId, user)
        .then(() => {
          notification({
            title: 'Atializado',
            description:
              'Usuário foi atualizado com sucesso.',
          });
        })
        .catch((err) => setError(new Error(err.message)));
    },
    [],
  );

  return {
    error,
    fetchUpdateUser,
  };
};
