import { useEffect } from 'react';
import { Area, AreaConfig } from '@ant-design/charts';
import Skeleton from 'react-loading-skeleton';

import {
  formatterCurrency,
  formatterDate,
} from '../../core/utils';
import { useCompanyMetrics } from '../../core/hooks/useCompanyMetrics';

export const CompanyMetrics = () => {
  const { data, fetchCompanyMetrics } = useCompanyMetrics();

  const formatterLegend = (legend: string) =>
    legend === 'totalRevenues' ? 'Receitas' : 'Despesas';

  useEffect(() => {
    fetchCompanyMetrics();
  }, [fetchCompanyMetrics]);

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
