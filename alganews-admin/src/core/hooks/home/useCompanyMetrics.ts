import { MetricService } from 'mauricio.girardi-sdk';
import { ForbiddenError } from 'mauricio.girardi-sdk/dist/errors';
import { useCallback, useState } from 'react';
import { transformDataIntoAntdChart } from '../../utils';

interface DataProps {
  yearMonth: string;
  value: number;
  category: 'totalRevenues' | 'totalExpenses';
}

export const useCompanyMetrics = () => {
  const [data, setData] = useState<DataProps[]>([]);
  const [forbidden, setForbidden] = useState(false);

  const fetchCompanyMetrics = useCallback(() => {
    MetricService.getMonthlyRevenuesExpenses()
      .then(transformDataIntoAntdChart)
      .then(setData)
      .catch((err) => {
        if (err instanceof ForbiddenError) {
          setForbidden(true);
          return;
        }

        throw err;
      });
  }, []);

  return {
    data,
    fetchCompanyMetrics,
    forbidden,
  };
};
