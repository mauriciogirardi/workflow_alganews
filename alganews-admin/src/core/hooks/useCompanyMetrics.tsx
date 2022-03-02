import { MetricService } from 'mauricio.girardi-sdk';
import { useCallback, useState } from 'react';
import { transformDataIntoAntdChart } from '../utils';

interface DataProps {
  yearMonth: string;
  value: number;
  category: 'totalRevenues' | 'totalExpenses';
}

export const useCompanyMetrics = () => {
  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCompanyMetrics = useCallback(() => {
    setLoading(true);
    MetricService.getMonthlyRevenuesExpenses()
      .then(transformDataIntoAntdChart)
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    data,
    fetchCompanyMetrics,
  };
};
