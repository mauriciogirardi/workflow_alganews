import { Metric, MetricService } from "mauricio.girardi-sdk"
import { useCallback, useState } from "react"

export const useTopTags = () => {
    const [error, setError] = useState<Error>()
    const [topTags, setTopTags] = useState<Metric.EditorTagRatio>()

    const fetchMetric = useCallback(() => {
        MetricService
            .getTop3Tags()
            .then(setTopTags)
            .catch(err => setError(new Error(err.message)))
    }, [])

    return {
        error,
        topTags,
        fetchMetric,
    }
}
