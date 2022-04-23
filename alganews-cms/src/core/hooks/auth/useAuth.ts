import { AppDispatch, RootState } from 'core/store';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as authAction from '../../store/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.auth.user);
    const fetching = useSelector((state: RootState) => state.auth.fetching);

    const fetchUser = useCallback(
        (userId: number) => {
            return dispatch(authAction.fetchUser(userId)).unwrap();
        },
        [dispatch],
    );

    return {
        user,
        fetching,
        fetchUser,
    };
};
