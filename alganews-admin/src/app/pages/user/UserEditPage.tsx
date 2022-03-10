import { useCallback, useEffect } from 'react';
import { User } from 'mauricio.girardi-sdk';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import { UserForm } from 'app/features/user/UseForm';
import { useUpdate } from 'core/hooks/user/useUpdate';
import { useUser } from 'core/hooks/user/useUser';
import { USERS } from 'core/constants-paths';
import { UseFormSkeleton } from 'app/features/user/UserFormSkeleton';

export default function UserEditPage() {
  const { fetchUser, user } = useUser();
  const { fetchUpdateUser } = useUpdate();
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

  const transformUserData = useCallback(
    (user: User.Detailed) => {
      return {
        ...user,
        createdAt: moment(user.createdAt),
        updatedAt: moment(user.updatedAt),
        birthdate: moment(user.birthdate),
      };
    },
    [],
  );

  const handleUserUpdate = (user: User.Input) => {
    fetchUpdateUser(userId, user);
  };

  if (!user) return <UseFormSkeleton />;

  return (
    <>
      <UserForm
        onUpdate={handleUserUpdate}
        user={transformUserData(user)}
      />
    </>
  );
}
