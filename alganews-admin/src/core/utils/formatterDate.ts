import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface FormatterDateProps {
  date: string;
  typeFormat?:
    | 'MMMM yyyy'
    | 'MM/yyyy'
    | 'dd/MM/yyyy'
    | "dd/MM/yyyy 'às' hh:mm";
}

export const formatterDate = ({
  date,
  typeFormat = 'dd/MM/yyyy',
}: FormatterDateProps) => {
  return format(new Date(date), typeFormat, {
    locale: ptBR,
  });
};
