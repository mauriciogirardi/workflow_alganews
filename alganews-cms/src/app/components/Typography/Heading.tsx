import { ReactNode } from 'react'
import { Heading1, Heading2, Heading3 } from './styles'

interface HeadingProps {
    level: 1 | 2 | 3;
    children: ReactNode
}

export const Heading = ({ level, children }: HeadingProps) => {
    const Component = ({
        1: Heading1,
        2: Heading2,
        3: Heading3,
    }[level])

    return (
        <Component>
            {children}
        </Component>
    )
}
