import { User, UserService } from 'mauricio.girardi-sdk';
import { useCallback, useState } from 'react';

export const useUser = () => {
  const [error, setError] = useState<Error>();
  const [user, setUser] = useState<User.Detailed>();

  const fetchUser = useCallback((userId: number) => {
    UserService.getDetailedUser(userId)
      .then(setUser)
      .catch((err) => setError(new Error(err.message)));
  }, []);

  return {
    user,
    error,
    fetchUser,
  };
};
