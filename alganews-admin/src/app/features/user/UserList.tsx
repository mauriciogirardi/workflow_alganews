import { useEffect, useState } from 'react';
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
  ReloadOutlined,
} from '@ant-design/icons';

import { formatterDate } from 'core/utils';
import { useUsers } from 'core/hooks/user/useUsers';
import { TagTable } from 'app/components/TagTable';
import { CardUser } from 'app/components/CardUser';
import { Link } from 'react-router-dom';
import { USERS, USER_EDIT } from 'core/constants-paths';
import { Forbidden } from 'app/components/Forbidden';

interface TableActionsProps {
  userId: number;
}

export const UserList = () => {
  const [forbidden, setForbidden] = useState(false);
  const [page, setPage] = useState(0);

  const { fetchUsers, users, toggleUserStatus, fetching, userId } = useUsers();

  useEffect(() => {
    fetchUsers().catch((err) => {
      if (err?.data?.status === 403) {
        return setForbidden(true);
      }

      throw err;
    });
  }, [fetchUsers]);

  const TableActions = ({ userId }: TableActionsProps) => {
    return (
      <Row gutter={10} justify='end'>
        <Col>
          <Tooltip title='Editar usuário!' placement='left'>
            <Link to={`${USER_EDIT}/${userId}`}>
              <Button size='middle' type='text' icon={<EditOutlined />} />
            </Link>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title='Visualizar usuário' placement='right'>
            <Link to={`${USERS}/${userId}`}>
              <Button size='middle' type='text' icon={<EyeOutlined />} />
            </Link>
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
            setSelectedKeys(e.target.value ? [e.target.value] : []);
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
      <SearchOutlined style={{ color: filtered ? '#0099ff' : undefined }} />
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

  const handleReloadListUser = () => {
    fetchUsers();
  };

  if (forbidden) {
    return <Forbidden />;
  }

  return (
    <>
      <Row justify='end'>
        <Button
          icon={<ReloadOutlined />}
          onClick={handleReloadListUser}
          loading={fetching}
        >
          Atualizar
        </Button>
      </Row>

      <Table<User.Summary>
        rowKey={'id'}
        pagination={{
          pageSize: 12,
          onChange: (page) => setPage(page - 1),
        }}
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
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
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
                return <Spin indicator={<LoadingOutlined />} />;
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
