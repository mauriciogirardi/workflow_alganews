import { useEffect } from 'react';
import { User } from 'mauricio.girardi-sdk';
import { ColumnProps } from 'antd/lib/table';
import {
  Table,
  Switch,
  Button,
  Row,
  Col,
  Typography,
  Avatar,
  Space,
  Card,
  Input,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  ClearOutlined,
  SearchOutlined,
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
        scroll={{ y: 550 }}
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
            ...getColumnSearchProps('name', 'Nome'),
          },
          {
            dataIndex: 'email',
            title: 'E-mail',
            ellipsis: true,
            width: 250,
            ...getColumnSearchProps('email', 'E-mail'),
          },
          {
            dataIndex: 'role',
            title: 'Perfil',
            align: 'center',
            render(role: string) {
              return <TagTable role={role} />;
            },
            ...getColumnSearchProps('role', 'Perfil'),
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
            ...getColumnSearchProps('createdAt', 'Criação'),
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
