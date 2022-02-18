import * as S from './styles'

interface ProgressBarProps {
    title: string
    progress: number
    theme?: 'primary' | 'secondary'
    width?: number
}

export const ProgressBar = ({
    title,
    progress,
    theme = 'primary',
    width = 375
}: ProgressBarProps) => {
    return (
        <S.Container width={width}>
            <S.Back>
                <p>{title}</p>
            </S.Back>
            <S.Front theme={theme} progress={progress <= 0 ? 0 : progress}>
                <p>{title}</p>
            </S.Front>
        </S.Container>
    )
}
