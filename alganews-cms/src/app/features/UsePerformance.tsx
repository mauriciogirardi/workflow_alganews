import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import { Chart } from "app/components/Chart";
import { withBoundary } from "core/hoc/withBoundary";
import { usePerformance } from "core/hooks/usePerformance";

function UsePerformance() {
    const { error, editorEarnings, fetchPerformance } = usePerformance()

    useEffect(() => {
        fetchPerformance()
    }, [fetchPerformance])

    if (error) throw error
    if (!editorEarnings) return <Skeleton height={300} />

    return (
        <Chart
            title="Média de performance nos últimos 12 meses"
            data={editorEarnings}
        />
    )
}

export default withBoundary(UsePerformance, 'performance')
