import { MetricService } from 'mauricio.girardi-sdk';
import { useCallback, useState } from 'react';
import { transformDataIntoAntdChart } from '../../utils';

interface DataProps {
  yearMonth: string;
  value: number;
  category: 'totalRevenues' | 'totalExpenses';
}

export const useCompanyMetrics = () => {
  const [data, setData] = useState<DataProps[]>([]);
  const [error, setError] = useState<Error>();

  const fetchCompanyMetrics = useCallback(() => {
    MetricService.getMonthlyRevenuesExpenses()
      .then(transformDataIntoAntdChart)
      .then(setData)
      .catch((err) => setError(new Error(err.message)));
  }, []);

  return {
    data,
    fetchCompanyMetrics,
    error,
  };
};
