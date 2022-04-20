import { UserForm } from 'app/features/user/UseForm';
import { useBreadcrumb } from 'core/hooks/useBreadcrumb';
import { usePageTitle } from 'core/utils/hooks/usePageTitle';

export default function UserCreatePage() {
  usePageTitle('Cadastro de usuário');
  useBreadcrumb('Usuários/Cadastro');

  return (
    <>
      <UserForm />
    </>
  );
}
