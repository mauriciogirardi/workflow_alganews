import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface FormatterDateProps {
  date: string;
  typeFormat: 'MMMM yyyy' | 'MM/yyyy' | 'dd/MM/yyyy';
}

export const formatterDate = ({
  date,
  typeFormat,
}: FormatterDateProps) => {
  return format(new Date(date), typeFormat, {
    locale: ptBR,
  });
};
