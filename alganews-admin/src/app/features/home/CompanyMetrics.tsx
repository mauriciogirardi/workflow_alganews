import { useEffect } from 'react';
import { Area, AreaConfig } from '@ant-design/charts';

import { formatterCurrency, formatterDate } from '../../../core/utils';
import { useCompanyMetrics } from '../../../core/hooks/home/useCompanyMetrics';
import { Forbidden } from 'app/components/Forbidden';

export const CompanyMetrics = () => {
  const { data, fetchCompanyMetrics, forbidden } = useCompanyMetrics();

  const formatterLegend = (legend: string) =>
    legend === 'totalRevenues' ? 'Receitas' : 'Despesas';

  useEffect(() => {
    fetchCompanyMetrics();
  }, [fetchCompanyMetrics]);

  if (forbidden) {
    return <Forbidden minHeight={256} />;
  }

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

  return <Area {...config} />;
};
