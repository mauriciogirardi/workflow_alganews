import * as S from './styles'

type LoadingProps = {
    height?: number
    width?: number
    border?: number
    show?: boolean
}

export const Loading = ({ height = 50, width = 50, border = 8, show }: LoadingProps) => {
    if (!show) return null

    return (
        <S.LoadingWrapper height={height} width={width} border={border}>
            <div className="loadingio-spinner-rolling-6yelr2elhrr">
                <div className="ldio-evq4x2k58gi">
                    <div></div>
                </div>
            </div>
        </S.LoadingWrapper>

    )
}
