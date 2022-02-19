import { useEffect } from "react"
import Skeleton from "react-loading-skeleton";

import { withBoundary } from "core/hoc/withBoundary"
import { CircleChart } from "app/components/CircleChart"

import * as S from './styles'
import { useTopTags } from "core/hooks/useTopTags";

function UserTopTags() {
    const { error, topTags, fetchMetric } = useTopTags()
    useEffect(() => {
        fetchMetric()
    }, [fetchMetric])

    if (error) throw error
    if (!topTags?.length) {
        return (
            <S.UseTopTagsWrapper>
                <Skeleton circle width={88} height={88} />
                <Skeleton circle width={88} height={88} />
                <Skeleton circle width={88} height={88} />
            </S.UseTopTagsWrapper>
        )
    }

    return (
        <S.UseTopTagsWrapper>
            {topTags.map(tag => (
                <CircleChart
                    key={tag.tagName}
                    progress={tag.percentage}
                    size={88}
                    caption={tag.tagName}
                    theme={tag.percentage > 60 ? 'default' : 'primary'}
                />
            ))}
        </S.UseTopTagsWrapper>
    )
}

export default withBoundary(UserTopTags, 'top tags')
