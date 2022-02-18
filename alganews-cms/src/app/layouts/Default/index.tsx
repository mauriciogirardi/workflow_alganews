import { ReactNode } from "react"

import { SessionController } from "app/components/SessionController"
import { confirm } from "core/utils/confirm"
import { Navbar } from "app/components/Navbar"
import { Logo } from "app/components/Logo"
import { info } from "core/utils/info"

import * as S from './styles'

type DefaultLayoutProps = {
    children: ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const onConfirmSession = () => {
        info({
            title: 'Você foi deslogado',
            description: 'Você será redirecionado para a página de login!',
        })
    }

    return (
        <S.Wrapper>
            <S.Header>
                <Logo />
            </S.Header>

            <S.Main>
                <S.Navigation>
                    <Navbar />
                </S.Navigation>

                <S.FeaturedContent>
                    {children}
                </S.FeaturedContent>

                <S.Aside>
                    <SessionController
                        name="Maurcio Girardi"
                        description="editor há 2 anos"
                        url="https://avatars.githubusercontent.com/u/51093343?v=4"
                        onLogout={() => confirm({
                            title: "Você quer deslogar?",
                            onCancel: () => window.alert('saiu'),
                            onConfirm: () => onConfirmSession(),
                        })}
                    />
                </S.Aside>
            </S.Main>

        </S.Wrapper>
    )
}
