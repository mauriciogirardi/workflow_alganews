import { useCallback, useState } from 'react';
import { User, UserService } from 'mauricio.girardi-sdk';
import { useNavigate } from 'react-router-dom';

import { notification } from 'core/utils/notification';
import { USERS } from 'core/constants-paths';

export const useUpdate = () => {
  const navigate = useNavigate();
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
          navigate(USERS);
        })
        .catch((err) => setError(new Error(err.message)));
    },
    [navigate],
  );

  return {
    error,
    fetchUpdateUser,
  };
};
