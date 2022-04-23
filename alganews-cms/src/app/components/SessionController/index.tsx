import { AuthService } from 'auth/Authorization.service';
import { useCallback } from 'react';
import { format } from 'date-fns';
import { useAuth } from 'core/hooks/auth/useAuth';

import Skeleton from 'react-loading-skeleton';

import { Button } from '../Button';

import * as S from './styles';
import { ptBR } from 'date-fns/locale';
import { confirm } from 'core/utils/confirm';

export const SessionController = () => {
    const { user } = useAuth();

    const onConfirmSession = useCallback(() => {
        confirm({
            title: 'Deseja Sair?',
            onConfirm: () => AuthService.imperativelySendToLogout(),
        });
    }, []);

    if (!user) {
        return <Skeleton height={215} />;
    }

    return (
        <S.Wrapper>
            <S.Image src={user.avatarUrls.small} alt={user.name} />

            <S.Name>{user?.name}</S.Name>
            <span>
                Editor(a) desde{' '}
                <strong>{`${format(new Date(user.createdAt), "MMMM 'de' yyyy", {
                    locale: ptBR,
                })}`}</strong>
            </span>

            <Button
                variant="danger"
                label="Logout"
                onClick={onConfirmSession}
            />
        </S.Wrapper>
    );
};
