import { useEffect, useState } from 'react';
import { Col, Row, Typography } from 'antd';
import { MetricService } from 'mauricio.girardi-sdk';
import { Area, AreaConfig } from '@ant-design/charts';

import {
  transformDataIntoAntdChart,
  formatterCurrency,
  formatterDate,
} from '../../core/utils';

interface DataProps {
  yearMonth: string;
  value: number;
  category: 'totalRevenues' | 'totalExpenses';
}

const { Title, Paragraph } = Typography;

export const CompanyMetrics = () => {
  const [data, setData] = useState<DataProps[]>([]);

  const formatterLegend = (legend: string) =>
    legend === 'totalRevenues' ? 'Receitas' : 'Despesas';

  useEffect(() => {
    MetricService.getMonthlyRevenuesExpenses()
      .then(transformDataIntoAntdChart)
      .then(setData);
  }, []);

  const config: AreaConfig = {
    data,
    height: 256,
    color: ['#0099ff', '#274060'],
    areaStyle: { fillOpacity: 1 },
    seriesField: 'category',
    xAxis: {
      label: {
        formatter(item) {
          return formatterDate({
            date: item,
            typeFormat: 'MM/yyyy',
          });
        },
      },
    },
    legend: {
      itemName: {
        formatter(legend) {
          return formatterLegend(legend);
        },
      },
    },
    tooltip: {
      title(title) {
        return formatterDate({
          date: title,
          typeFormat: 'MMMM yyyy',
        });
      },
      formatter(data) {
        return {
          name: formatterLegend(data.category),
          value: formatterCurrency(data.value),
        };
      },
    },
    yAxis: false,
    xField: 'yearMonth',
    yField: 'value',
    point: {
      size: 3,
      shape: 'circle',
    },
  };

  return (
    <Row>
      <Col span={24}>
        <Title level={2}>Olá, Mauricio Girardi</Title>
        <Paragraph>
          Este é o resumo da empresa nos últimos doze meses.
        </Paragraph>
      </Col>

      <Col span={24}>
        <Area {...config} />
      </Col>
    </Row>
  );
};
