import { AnchorHTMLAttributes, } from 'react'
import * as S from './styles'

interface TitleAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    value: string
}

export const TitleAnchor = ({ value, ...rest }: TitleAnchorProps) => {
    return (
        <S.Anchor {...rest}>
            {value}
        </S.Anchor>
    )
}
