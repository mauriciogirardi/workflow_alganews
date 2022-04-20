import EntryCRUD from 'app/features/cashFlow/EntryCRUD';
import { useBreadcrumb } from 'core/hooks/useBreadcrumb';
import { usePageTitle } from 'core/utils/hooks/usePageTitle';

export default function CashFlowRevenuesPage() {
  usePageTitle('Fluxo de caixa - Receita');
  useBreadcrumb('Fluxo de caixa/Receita');

  return <EntryCRUD type='REVENUE' />;
}
