import { useEffect } from 'react';
import { User } from 'mauricio.girardi-sdk';
import {
  Table,
  Switch,
  Button,
  Row,
  Col,
  Typography,
  Avatar,
  Space,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
} from '@ant-design/icons';

import { useUsers } from 'core/hooks/useUsers';
import { TagTable } from 'app/components/TagTable';
import { formatterDate } from 'core/utils';

const { Text } = Typography;

export const UserList = () => {
  const { fetchUsers, users, toggleUserStatus } =
    useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const TableActions = () => {
    return (
      <Row gutter={10} justify='end'>
        <Col>
          <Button
            size='middle'
            type='text'
            icon={<EditOutlined />}
          />
        </Col>
        <Col>
          <Button
            size='middle'
            type='text'
            icon={<EyeOutlined />}
          />
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Table<User.Summary>
        dataSource={users}
        columns={[
          {
            dataIndex: 'name',
            title: 'Nome',
            align: 'left',
            render(name: string, row) {
              return (
                <Space>
                  <Avatar
                    size='small'
                    src={row.avatarUrls.small}
                  />
                  <Text>{name}</Text>
                </Space>
              );
            },
          },
          {
            dataIndex: 'email',
            title: 'E-mail',
            ellipsis: true,
            width: 250,
          },
          {
            dataIndex: 'role',
            title: 'Perfil',
            align: 'center',
            render(role: string) {
              return <TagTable role={role} />;
            },
          },
          {
            dataIndex: 'createdAt',
            title: 'Criação',
            align: 'center',
            render(createdAt: string) {
              return formatterDate({
                date: createdAt,
                typeFormat: 'dd/MM/yyyy',
              });
            },
          },
          {
            dataIndex: 'active',
            title: 'Ativo',
            align: 'center',
            render(active: boolean, user) {
              return (
                <Switch
                  defaultChecked={active}
                  onChange={() => toggleUserStatus(user)}
                />
              );
            },
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'right',
            render() {
              return <TableActions />;
            },
          },
        ]}
      />
    </>
  );
};
