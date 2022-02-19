import { useCallback, useState } from "react"
import { MetricService } from "mauricio.girardi-sdk"

import { transformEditorMonthlyEarningsIntoChartJs } from "core/utils/transformEditorMonthlyEarningsIntoChartJs"
import { ChartProps } from "app/components/Chart"

export const usePerformance = () => {
    const [error, setError] = useState<Error>()
    const [editorEarnings, setEditorEarnings] = useState<ChartProps['data']>()

    const fetchPerformance = useCallback(() => {
        MetricService
            .getEditorMonthlyEarnings()
            .then(transformEditorMonthlyEarningsIntoChartJs)
            .then(setEditorEarnings)
            .catch(err => setError(new Error(err.message)))
    }, [])

    return {
        error,
        editorEarnings,
        fetchPerformance,
    }
}
