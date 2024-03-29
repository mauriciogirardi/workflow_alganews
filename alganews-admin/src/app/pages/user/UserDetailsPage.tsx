import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Divider,
  Popconfirm,
  Progress,
  Row,
  Skeleton,
  Space,
  Switch,
  Table,
  Typography,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { WarningFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import confirm from 'antd/lib/modal/confirm';

import { messageSuccessTogglesUserStatus } from 'core/store/utils/messageSuccessToggleUserStatus';
import { USERS, USER_EDIT } from 'core/constants-paths';
import { formatterDate } from 'core/utils';
import { NotFoundError } from 'app/components/NotFoundError';
import { usePageTitle } from 'core/utils/hooks/usePageTitle';
import { formatPhone } from 'core/utils/formatPhone';
import { usePosts } from 'core/hooks/post/usePosts';
import { useUser } from 'core/hooks/user/useUser';
import { Post } from 'mauricio.girardi-sdk';
import { useBreadcrumb } from 'core/hooks/useBreadcrumb';

const { Title, Paragraph, Text } = Typography;

export default function UserDetailsPage() {
  usePageTitle('Detalhes do usuário');
  useBreadcrumb('Usuários/Cadastro/Detalhes do usuário');

  const [page, setPage] = useState(0);
  const { fetchUser, user, notFound, toggleUserStatus } = useUser();
  const {
    fetchUserPosts,
    loadingToggle,
    posts,
    togglePostStatus,
    loadingFetch,
  } = usePosts();

  const { lg } = useBreakpoint();
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = Number(params.id);
  const isEditor = user?.role === 'EDITOR';

  useEffect(() => {
    if (!isNaN(userId)) {
      fetchUser(userId);
    } else {
      navigate(USERS);
    }
  }, [fetchUser, userId, navigate]);

  useEffect(() => {
    if (isEditor && user) fetchUserPosts(user.id, page);
  }, [fetchUserPosts, user, isEditor, page]);

  if (notFound) {
    return (
      <NotFoundError
        title='Usuário não encontrado'
        actionDestination={USERS}
        actionTitle='Voltar para a lista de usuário'
      />
    );
  }

  if (!user) return <Skeleton />;

  const handleToggle = (published: boolean, post: Post.Summary) => {
    return (
      <Switch
        checked={published}
        loading={loadingToggle}
        onChange={() => {
          togglePostStatus(post).then(() => {
            fetchUserPosts(user.id);
          });
        }}
      />
    );
  };

  const handleOnConfirm = () => {
    confirm({
      icon: (
        <WarningFilled
          style={{
            color: '#ffcc00',
            fontSize: 35,
          }}
        />
      ),
      title: `Tem certeza que deseja ${
        user.active ? 'desabilitar' : 'habilitar'
      } o usuário?`,
      content: user.active
        ? 'Desabilitar um usuário fará com que ele seja automaticamente desligado da plataforma, podendo causar prejuízos em seus ganhos.'
        : 'Habilitar um usuário fará com que ele ganhe acesso a plataforma novamente, possibilitando a criação e publicação de posts.',
      onOk() {
        toggleUserStatus(user).then(() => {
          fetchUser(userId);
          messageSuccessTogglesUserStatus({
            active: user.active,
            name: user.name,
          });
        });
      },
    });
  };

  return (
    <Row gutter={[30, 15]}>
      <Col xs={24} lg={4}>
        <Row justify='center'>
          <Avatar src={user.avatarUrls.small} size={120} />
        </Row>
      </Col>

      <Col xs={24} lg={20}>
        <Space
          direction='vertical'
          style={{ width: '100%' }}
          align={lg ? 'start' : 'center'}
        >
          <Title level={2}>{user.name}</Title>
          <Paragraph
            ellipsis={{ rows: 2 }}
            style={{ textAlign: lg ? 'left' : 'center' }}
          >
            {user.bio}
          </Paragraph>
          <Space>
            <Popconfirm
              cancelText='Não'
              okText='Sim'
              disabled={
                (user.active && !user.canBeDeactivated) ||
                (!user.active && !user.canBeActivated)
              }
              title={
                user.active
                  ? `Desabilitar ${user.name}`
                  : `Habilitar ${user.name}`
              }
              onConfirm={handleOnConfirm}
            >
              <Button
                type='primary'
                disabled={
                  (user.active && !user.canBeDeactivated) ||
                  (!user.active && !user.canBeActivated)
                }
              >
                {user.active ? 'Desabilitar' : 'Habilitar'}
              </Button>
            </Popconfirm>

            <Link to={`${USER_EDIT}/${user.id}`}>
              <Button type='primary'>Editar perfil</Button>
            </Link>
          </Space>
        </Space>
      </Col>

      <Divider />

      {isEditor && (
        <Col xs={24} lg={12}>
          <Space direction='vertical' style={{ width: '100%' }}>
            {user.skills?.map((skill, index) => (
              <div key={index}>
                <Text>{skill.name}</Text>
                <Progress percent={skill.percentage} success={{ percent: 0 }} />
              </div>
            ))}
          </Space>
        </Col>
      )}

      <Col xs={24} lg={isEditor ? 12 : 24}>
        <Descriptions column={1} bordered size='small'>
          <Descriptions.Item label='País'>
            {user.location.country}
          </Descriptions.Item>
          <Descriptions.Item label='Estado'>
            {user.location.state}
          </Descriptions.Item>
          <Descriptions.Item label='Cidade'>
            {user.location.city}
          </Descriptions.Item>
          <Descriptions.Item label='Telefone'>
            {formatPhone(user.phone)}
          </Descriptions.Item>
        </Descriptions>
      </Col>

      {isEditor && (
        <>
          <Divider />

          <Col span={24}>
            <Table
              rowKey={'id'}
              loading={loadingFetch}
              scroll={{ x: 850 }}
              dataSource={posts?.content}
              pagination={{
                pageSize: 8,
                onChange: (page) => setPage(page - 1),
                total: posts?.totalElements,
              }}
              columns={[
                {
                  dataIndex: 'title',
                  title: 'Título',
                  align: 'left',
                  ellipsis: true,
                  width: 380,
                },
                {
                  dataIndex: 'createdAt',
                  title: 'Criação',
                  align: 'center',
                  render: (item) =>
                    formatterDate({
                      date: item,
                      typeFormat: 'dd/MM/yyyy',
                    }),
                },
                {
                  dataIndex: 'updatedAt',
                  title: 'Última atualização',
                  align: 'center',
                  width: 200,
                  render: (item) =>
                    formatterDate({
                      date: item,
                      typeFormat: "dd/MM/yyyy 'às' hh:mm",
                    }),
                },
                {
                  dataIndex: 'published',
                  title: 'Publicado',
                  align: 'right',
                  render: handleToggle,
                },
              ]}
            />
          </Col>
        </>
      )}
    </Row>
  );
}
