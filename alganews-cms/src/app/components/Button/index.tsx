import { ButtonHTMLAttributes, ComponentType } from 'react'
import { IconBaseProps } from 'react-icons/lib'
import * as S from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    variant?: 'danger' | 'text' | 'primary'
    icon?: ComponentType<IconBaseProps>
}

export const Button = ({
    label,
    variant = 'primary',
    icon: Icon,
    ...rest
}: ButtonProps) => {
    return (
        <S.Wrapper variant={variant} {...rest}>
            {label}
            {Icon && <Icon size={16} />}
        </S.Wrapper>
    )
}
