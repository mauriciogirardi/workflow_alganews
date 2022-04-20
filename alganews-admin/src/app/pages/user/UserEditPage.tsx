import { useCallback, useEffect } from 'react';
import { User, UserService } from 'mauricio.girardi-sdk';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import { UserForm } from 'app/features/user/UseForm';
import { useUser } from 'core/hooks/user/useUser';
import { USERS } from 'core/constants-paths';
import { UseFormSkeleton } from 'app/features/user/UserFormSkeleton';
import { NotFoundError } from 'app/components/NotFoundError';
import { notification } from 'core/utils/notification';
import { usePageTitle } from 'core/utils/hooks/usePageTitle';
import { useBreadcrumb } from 'core/hooks/useBreadcrumb';

export default function UserEditPage() {
  usePageTitle('Editar de usuário');
  useBreadcrumb('Usuários/Cadastro/Editar usuário');

  const { fetchUser, user, notFound } = useUser();
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = Number(params.id);

  useEffect(() => {
    if (!isNaN(userId)) {
      fetchUser(userId);
    } else {
      navigate(USERS);
    }
  }, [fetchUser, userId, navigate]);

  const transformUserData = useCallback((user: User.Detailed) => {
    return {
      ...user,
      createdAt: moment(user.createdAt),
      updatedAt: moment(user.updatedAt),
      birthdate: moment(user.birthdate),
    };
  }, []);

  const handleUserUpdate = async (user: User.Input) => {
    await UserService.updateExistingUser(userId, user).then(() => {
      notification({
        title: 'Atializado',
        description: 'Usuário foi atualizado com sucesso.',
      });
      navigate(USERS);
    });
  };

  if (notFound) {
    return (
      <NotFoundError
        actionDestination={USERS}
        title='Usuário não encontrado'
        actionTitle='Voltar para a lista de usuário'
      />
    );
  }

  if (!user) return <UseFormSkeleton />;

  return (
    <>
      <UserForm onUpdate={handleUserUpdate} user={transformUserData(user)} />
    </>
  );
}
