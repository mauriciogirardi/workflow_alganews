import { User, UserService } from 'mauricio.girardi-sdk';
import { ResourceNotFoundError } from 'mauricio.girardi-sdk/dist/errors';
import { useCallback, useState } from 'react';

export const useUser = () => {
  const [user, setUser] = useState<User.Detailed>();
  const [notFound, setNotFound] = useState(false);

  const fetchUser = useCallback(async (userId: number) => {
    try {
      await UserService.getDetailedUser(userId).then(
        setUser,
      );
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        setNotFound(true);
      }

      throw err;
    }
  }, []);

  return {
    user,
    fetchUser,
    notFound,
  };
};
