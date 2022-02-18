import { ReactNode } from 'react'
import * as S from './styles'

type TooltipProp = {
    children: ReactNode
    content?: string
    width?: string
    topBox?: string
    leftBox?: string
    bottomBox?: string
    rightBox?: string
    topArrow?: string
    leftArrow?: string
    rotateArrow?: number
}

export const Tooltip = ({
    children,
    content,
    width,
    bottomBox,
    leftBox,
    rightBox,
    topBox,
    leftArrow,
    topArrow,
    rotateArrow
}: TooltipProp) => {
    return (
        <S.TooltipCard w={width}>
            <S.TooltipText>
                {children}
            </S.TooltipText>
            <S.TooltipBox
                leftBox={leftBox}
                rightBox={rightBox}
                topBox={topBox}
                bottomBox={bottomBox}
                topArrow={topArrow}
                leftArrow={leftArrow}
                rotateArrow={rotateArrow}
            >
                {content}
            </S.TooltipBox>
        </S.TooltipCard>
    )
}
