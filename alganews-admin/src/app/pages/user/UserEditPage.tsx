import { UserForm } from 'app/features/user/UseForm';
import { useUser } from 'core/hooks/user/useUser';
import { User } from 'mauricio.girardi-sdk';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

export default function UserEditPage() {
  const { fetchUser, user } = useUser();

  useEffect(() => {
    fetchUser(1);
  }, [fetchUser]);

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

  if (!user) return <Skeleton />;

  return (
    <>
      <UserForm user={transformUserData(user)} />
    </>
  );
}
