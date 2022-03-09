import { notification } from 'core/utils/notification';

interface MesssgeProps {
  active: boolean;
  name: string;
}

export const messageSuccessTogglesUserStatus = ({
  active,
  name,
}: MesssgeProps) => {
  const isActive = active;
  const description = `O ${name} foi ${
    isActive ? 'Desativado' : 'Ativo'
  }.`;

  return isActive
    ? notification({
        title: 'DESATIVADO',
        description,
      })
    : notification({
        title: 'ATIVO',
        description,
      });
};
