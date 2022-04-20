import EntryCRUD from 'app/features/cashFlow/EntryCRUD';
import { useBreadcrumb } from 'core/hooks/useBreadcrumb';
import { usePageTitle } from 'core/utils/hooks/usePageTitle';

export default function CashFlowExpensesPage() {
  usePageTitle('Fluxo de caixa - Despesa');
  useBreadcrumb('Fluxo de caixa/Despesa');

  return <EntryCRUD type='EXPENSE' />;
}
