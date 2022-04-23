import { ReactNode } from 'react';

import { SessionController } from 'app/components/SessionController';
import { Navbar } from 'app/components/Navbar';
import { Logo } from 'app/components/Logo';

import * as S from './styles';

type DefaultLayoutProps = {
    children: ReactNode;
};

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <S.Wrapper>
            <S.Header>
                <Logo />
            </S.Header>

            <S.Main>
                <S.Navigation>
                    <Navbar />
                </S.Navigation>

                <S.FeaturedContent>{children}</S.FeaturedContent>

                <S.Aside>
                    <SessionController />
                </S.Aside>
            </S.Main>
        </S.Wrapper>
    );
};
