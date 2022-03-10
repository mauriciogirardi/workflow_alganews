import { useEffect } from 'react';
import { User } from 'mauricio.girardi-sdk';
import { ColumnProps } from 'antd/lib/table';
import {
  Table,
  Switch,
  Button,
  Row,
  Col,
  Avatar,
  Space,
  Card,
  Input,
  Spin,
  Tooltip,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  ClearOutlined,
  SearchOutlined,
  LoadingOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { formatterDate } from 'core/utils';
import { useUsers } from 'core/hooks/user/useUsers';
import { TagTable } from 'app/components/TagTable';
import { CardUser } from 'app/components/CardUser';
import { Link } from 'react-router-dom';
import { USER_EDIT } from 'core/constants-paths';

interface TableActionsProps {
  userId: number;
}

export const UserList = () => {
  const {
    fetchUsers,
    users,
    toggleUserStatus,
    fetching,
    userId,
  } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const TableActions = ({ userId }: TableActionsProps) => {
    return (
      <Row gutter={10} justify='end'>
        <Col>
          <Tooltip title='Editar usuário!' placement='left'>
            <Link to={`${USER_EDIT}/${userId}`}>
              <Button
                size='middle'
                type='text'
                icon={<EditOutlined />}
              />
            </Link>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip
            title='Visualizar usuário'
            placement='right'
          >
            <Button
              size='middle'
              type='text'
              icon={<EyeOutlined />}
            />
          </Tooltip>
        </Col>
      </Row>
    );
  };

  const getColumnSearchProps = (
    dataIndex: keyof User.Summary,
    displayName?: string,
  ): ColumnProps<User.Summary> => ({
    filterDropdown: ({
      selectedKeys,
      setSelectedKeys,
      confirm,
      clearFilters,
    }) => (
      <Card>
        <Input
          style={{ marginBottom: 8, display: 'block' }}
          value={selectedKeys[0]}
          placeholder={`Buscar ${displayName || dataIndex}`}
          onChange={(e) => {
            setSelectedKeys(
              e.target.value ? [e.target.value] : [],
            );
          }}
          onPressEnter={() => confirm()}
        />
        <Space>
          <Button
            type={'primary'}
            size={'small'}
            style={{ width: 90 }}
            onClick={() => confirm()}
            icon={<SearchOutlined />}
          >
            Buscar
          </Button>
          <Button
            onClick={() => {
              clearFilters && clearFilters();
              confirm();
            }}
            size={'small'}
            style={{ width: 90 }}
            icon={<ClearOutlined />}
          >
            Limpar
          </Button>
        </Space>
      </Card>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? '#0099ff' : undefined }}
      />
    ),
    // @ts-ignore
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : '',
  });

  return (
    <>
      <Table<User.Summary>
        rowKey={'id'}
        pagination={false}
        loading={fetching}
        // scroll={{ x: 1000 }} add responsive
        dataSource={users}
        columns={[
          {
            title: 'Usuários',
            responsive: ['xs'],
            render(user: User.Summary) {
              return (
                <CardUser user={user}>
                  <TableActions userId={user.id} />
                </CardUser>
              );
            },
          },
          {
            dataIndex: 'avatarUrls',
            title: '',
            align: 'left',
            width: 60,
            fixed: 'left',
            responsive: ['sm'],
            render(avatarUrls: User.Summary['avatarUrls']) {
              return (
                <Avatar
                  icon={<UserOutlined />}
                  size='small'
                  src={avatarUrls.small}
                />
              );
            },
          },
          {
            dataIndex: 'name',
            title: 'Nome',
            align: 'left',
            ellipsis: true,
            width: 200,
            responsive: ['sm'],
            ...getColumnSearchProps('name', 'Nome'),
          },
          {
            dataIndex: 'email',
            title: 'E-mail',
            responsive: ['sm'],
            ellipsis: true,
            width: 250,
            ...getColumnSearchProps('email', 'E-mail'),
          },
          {
            dataIndex: 'role',
            title: 'Perfil',
            align: 'center',
            width: 130,
            responsive: ['sm'],
            sorter(a, b) {
              return a.role.localeCompare(b.role);
            },
            render(role: string) {
              return <TagTable role={role} />;
            },
            ...getColumnSearchProps('role', 'Perfil'),
          },
          {
            dataIndex: 'createdAt',
            title: 'Criação',
            align: 'center',
            responsive: ['sm'],
            width: 130,
            sorter(a, b) {
              return new Date(a.createdAt) >
                new Date(b.createdAt)
                ? 1
                : -1;
            },
            render(createdAt: string) {
              return formatterDate({
                date: createdAt,
                typeFormat: 'dd/MM/yyyy',
              });
            },
            ...getColumnSearchProps('createdAt', 'Criação'),
          },
          {
            dataIndex: 'active',
            title: 'Ativo',
            align: 'center',
            responsive: ['sm'],
            width: 100,
            render(active: boolean, user) {
              if (user.id === userId && fetching) {
                return (
                  <Spin indicator={<LoadingOutlined />} />
                );
              }

              return (
                <Switch
                  checked={active}
                  onChange={() => toggleUserStatus(user)}
                />
              );
            },
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'right',
            responsive: ['sm'],
            width: 150,
            render(id: number) {
              return <TableActions userId={id} />;
            },
          },
        ]}
      />
    </>
  );
};