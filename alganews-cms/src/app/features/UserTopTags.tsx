import { useEffect, useState } from "react"
import { Metric, MetricService } from "mauricio.girardi-sdk";
import Skeleton from "react-loading-skeleton";

import { withBoundary } from "core/hoc/withBoundary"
import { CircleChart } from "app/components/CircleChart"

import * as S from './styles'

function UserTopTags() {
    const [error, setError] = useState<Error>()
    const [topTags, setTopTags] = useState<Metric.EditorTagRatio>()

    useEffect(() => {
        MetricService
            .getTop3Tags()
            .then(setTopTags)
            .catch(err => setError(new Error(err.message)))
    }, [])

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
