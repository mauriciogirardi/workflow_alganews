import { useCallback, useState } from 'react';
import { User, UserService } from 'mauricio.girardi-sdk';

export default function useUser() {
    const [user, setUser] = useState<User.Detailed>();

    const fetchUser = useCallback(async function () {
        UserService.getDetailedUser(6).then(setUser);
    }, []);

    return {
        user,
        fetchUser,
    };
}
