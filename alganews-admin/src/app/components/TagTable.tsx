import { Tag } from 'antd';

interface TagTableProps {
  role: string;
}

export const TagTable = ({ role }: TagTableProps) => {
  const name =
    role === 'EDITOR'
      ? 'Editor'
      : role === 'MANAGER'
      ? 'Gerente'
      : 'Assistente';
  const color =
    role === 'EDITOR'
      ? 'green'
      : role === 'MANAGER'
      ? 'red'
      : 'blue';

  return <Tag color={color}>{name}</Tag>;
};
