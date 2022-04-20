import { PaymentForm } from 'app/features/payment/PaymentForm';
import { useBreadcrumb } from 'core/hooks/useBreadcrumb';
import { usePageTitle } from 'core/utils/hooks/usePageTitle';

export default function PaymentCreatePage() {
  usePageTitle('Cadastro Pagamento');
  useBreadcrumb('Pagamentos/Cadastro');

  return (
    <>
      <PaymentForm />
    </>
  );
}
