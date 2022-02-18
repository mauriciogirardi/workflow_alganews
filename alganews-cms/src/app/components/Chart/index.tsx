import { ChartOptions, ChartData } from 'chart.js';
import { NoData } from '../NoData';
import { Heading } from '../Typography/Heading';
import { Line } from 'react-chartjs-2'

import * as S from './styles'

const options: ChartOptions = {
    maintainAspectRatio: true,
    responsive: true,
    elements: {
        line: {
            tension: 0,
        },
    },
    legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: {
            usePointStyle: true,
        },
    },
    scales: {
        yAxes: [
            {
                type: 'linear',
                display: false,
                position: 'left',
                id: 'cashflow'
            },
        ],
        xAxes: [
            {
                display: true,
                gridLines: {
                    display: false,
                }
            }
        ]
    },
};

export interface ChartProps {
    title?: string
    data: ChartData
}

export const Chart = ({ title, data }: ChartProps) => {
    return (
        <S.Container>
            {title && (
                <S.Title>
                    <Heading level={3}>{title}</Heading>
                </S.Title>
            )}
            {data ? (
                <Line
                    type='line'
                    data={data}
                    options={options}
                    height={2}
                    width={6}
                />
            ) : <NoData height={139} />}
        </S.Container>
    )
}
