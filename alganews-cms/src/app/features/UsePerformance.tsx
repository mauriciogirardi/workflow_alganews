import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import { transformEditorMonthlyEarningsIntoChartJs } from "core/utils/transformEditorMonthlyEarningsIntoChartJs";
import { Chart, ChartProps } from "app/components/Chart";
import { MetricService } from "sdk/services/MetricService";
import { withBoundary } from "core/hoc/withBoundary";

function UsePerformance() {
    const [error, setError] = useState<Error>()
    const [editorEarnings, setEditorEarnings] = useState<ChartProps['data']>()

    useEffect(() => {
        MetricService
            .getEditorMonthlyEarnings()
            .then(transformEditorMonthlyEarningsIntoChartJs)
            .then(setEditorEarnings)
            .catch(err => setError(new Error(err.message)))
    }, [])

    if (error) throw error
    if (!editorEarnings) {
        return <Skeleton height={300} />

    }

    return (
        <Chart
            title="Média de performance nos últimos 12 meses"
            data={editorEarnings}
        />
    )
}

export default withBoundary(UsePerformance, 'performance')
