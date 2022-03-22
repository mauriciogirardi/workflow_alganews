import { notification } from 'core/utils/notification';

interface MessageProps {
  active: boolean;
  name: string;
}

export const messageSuccessTogglesUserStatus = ({
  active,
  name,
}: MessageProps) => {
  const isActive = active;
  const description = `${name} foi ${
    isActive ? 'Desativado(a)' : 'Habilitado(a)'
  }.`;

  return isActive
    ? notification({
        title: 'DESATIVADO(A)',
        description,
      })
    : notification({
        title: 'HABILITADO(A)',
        description,
      });
};
