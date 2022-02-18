import { useEffect, useState } from 'react'
import * as S from './styles'

interface CircleChartProps {
    size: number
    progress: number
    caption?: string
    theme?: 'default' | 'primary'
    strokeWidth?: number
}

export const CircleChart = ({ theme = 'primary', progress, size, strokeWidth = 8, caption }: CircleChartProps) => {
    const getThemeColor = () => theme === 'primary' ? '#09f' : '#274060'

    const THEME = getThemeColor()
    const STROKE_WIDTH = strokeWidth
    const STROKE_COLOR = THEME

    const CENTER = size / 2
    const RADIUS = size / 2 - STROKE_WIDTH / 2
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS

    const [offset, setOffset] = useState(CIRCUMFERENCE)

    useEffect(() => {
        const progressOffset = ((100 - progress) / 100) * CIRCUMFERENCE
        setOffset(progressOffset)
    }, [progress, CIRCUMFERENCE])

    return (
        <S.Container>
            <S.SVGWrapper size={size}>
                <S.Svg size={size}>
                    <S.CircleBG cy={CENTER} cx={CENTER} r={RADIUS} />
                    <S.Circle
                        fill="none"
                        cy={CENTER}
                        cx={CENTER}
                        r={RADIUS}
                        stroke={STROKE_COLOR}
                        strokeWidth={STROKE_WIDTH}
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={offset}
                    />
                </S.Svg>

                <S.Percentage theme={theme}>{Math.ceil(progress)}%</S.Percentage>

            </S.SVGWrapper>
            {caption && <S.Caption theme={theme} >{caption}</S.Caption>}
        </S.Container>
    )
}
