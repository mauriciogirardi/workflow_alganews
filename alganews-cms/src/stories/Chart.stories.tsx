import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Chart } from 'app/components/Chart';
import { ChartData } from 'chart.js';

const data: ChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
        {
            label: 'Média de desempenho do time',
            fill: true,
            data: [32, 500, 150, 600, 456, 658, 0, 0, 0, 0, 0, 0],
            borderColor: '#274060',
            backgroundColor: '#274060',
            borderWidth: 0.5,
            yAxisID: 'cashflow',
        },
        {
            label: 'Desempenho pessoal',
            fill: true,
            data: [200, 2336, 210, 500, 569, 1000, 0, 0, 0, 0, 0, 0],
            borderColor: '#0099ff',
            backgroundColor: '#0099ff',
            borderWidth: 0.5,
            yAxisID: 'cashflow',
        },
    ],
};

export default {
    title: 'Components/Chart',
    component: Chart,
} as ComponentMeta<typeof Chart>;

const Template: ComponentStory<typeof Chart> = (args) => <Chart {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Média de performance nos últimos 12 meses',
    data,
};

export const WithoutData = Template.bind({});
WithoutData.args = {
    title: 'Média de performance nos últimos 12 meses',
};
