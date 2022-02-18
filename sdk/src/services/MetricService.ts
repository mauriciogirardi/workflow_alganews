import { Service } from "../Service";
import { Metric } from "../@types";

class MetricService extends Service {
    static getTop3Tags() {
        return this.Http
            .get<Metric.EditorTagRatio>('/metrics/editor/top3-tags')
            .then(this.getData)
    }

    static getEditorMonthlyEarnings() {
        return this.Http
            .get<Metric.EditorMonthlyEarnings>('/metrics/editor/monthly-earnings')
            .then(this.getData)
    }

    static getMonthlyRevenuesExpenses() {
        return this.Http
            .get<Metric.MonthlyRevenuesExpenses>(
                '/metric/monthly-revenues-expenses',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(this.getData)
    }

    static getMonthlyRevenuesExpensesChartJs() {
        return this.Http
            .get<Metric.MonthlyRevenuesExpensesChartjs>(
                '/metric/monthly-revenues-expenses',
                {
                    headers: {
                        'Content-Type': 'application/vnd.alganews.charts+json'
                    }
                }
            ).then(this.getData)
    }
}

export default MetricService