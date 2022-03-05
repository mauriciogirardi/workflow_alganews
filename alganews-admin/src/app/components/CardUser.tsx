import { Descriptions } from 'antd';
import { ReactNode } from 'react';
import { User } from 'mauricio.girardi-sdk';

import { formatterDate } from 'core/utils';
import { TagTable } from 'app/components/TagTable';

interface CardUserProps {
  user: User.Summary;
  children: ReactNode;
}

export const CardUser = ({
  user,
  children,
}: CardUserProps) => {
  return (
    <Descriptions column={1} size='small'>
      <Descriptions.Item label='Nome'>
        {user.name}
      </Descriptions.Item>
      <Descriptions.Item label='E-mail'>
        {user.email}
      </Descriptions.Item>
      <Descriptions.Item label='Criação'>
        {formatterDate({
          date: user.createdAt,
          typeFormat: 'dd/MM/yyyy',
        })}
      </Descriptions.Item>
      <Descriptions.Item label='Perfil'>
        <TagTable role={user.role} />
      </Descriptions.Item>
      <Descriptions.Item>{children}</Descriptions.Item>
    </Descriptions>
  );
};
