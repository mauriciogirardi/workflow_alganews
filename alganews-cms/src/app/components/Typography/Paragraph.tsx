import { ReactNode } from 'react'
import { ContaiterParagraph } from './styles'

interface ParagraphProps {
    size?: 'default' | 'small';
    children: ReactNode
}

export const Paragraph = ({ size = 'default', children }: ParagraphProps) => {
    return (
        <ContaiterParagraph size={size}>
            {children}
        </ContaiterParagraph>
    )
}
