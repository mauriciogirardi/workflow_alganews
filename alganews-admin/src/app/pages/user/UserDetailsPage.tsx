import {
  Avatar,
  Button,
  Card,
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
import { WarningFilled } from '@ant-design/icons';
import { useEffect } from 'react';

import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import confirm from 'antd/lib/modal/confirm';

import { messageSuccessTogglesUserStatus } from 'core/store/utils/messageSuccessToggleUserStatus';
import { USERS, USER_EDIT } from 'core/constants-paths';
import { formatterDate } from 'core/utils';
import { usePageTitle } from 'core/utils/hooks/usePageTitle';
import { usePosts } from 'core/hooks/post/usePosts';
import { useUser } from 'core/hooks/user/useUser';
import { Link } from 'react-router-dom';
import { Post } from 'mauricio.girardi-sdk';

const { Title, Paragraph, Text } = Typography;

export default function UserDetailsPage() {
  usePageTitle('Detalhes do usuário');
  const { fetchUser, user, notFound, toggleUserStatus } =
    useUser();
  const {
    fetchUserPosts,
    isFetching,
    loadingToggle,
    posts,
    togglePostStatus,
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
    if (isEditor) fetchUserPosts(user.id);
  }, [fetchUserPosts, user, isEditor]);

  if (notFound) {
    return <Card>Usuário não encontrado!</Card>;
  }

  if (!user) return <Skeleton />;

  const handleToggle = (
    published: boolean,
    post: Post.Summary,
  ) => {
    console.log(post);
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
              title={
                user.active
                  ? `Desabilitar ${user.name}`
                  : `Habilitar ${user.name}`
              }
              onConfirm={handleOnConfirm}
            >
              <Button type='primary'>
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

      <Col xs={24} lg={12}>
        <Space
          direction='vertical'
          style={{ width: '100%' }}
        >
          {user.skills?.map((skill, index) => (
            <div key={index}>
              <Text>{skill.name}</Text>
              <Progress
                percent={skill.percentage}
                success={{ percent: 0 }}
              />
            </div>
          ))}
        </Space>
      </Col>

      <Col xs={24} lg={12}>
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
            {user.phone}
          </Descriptions.Item>
        </Descriptions>
      </Col>

      <Divider />

      <Col span={24}>
        {isEditor && (
          <Table
            rowKey={'id'}
            pagination={false}
            loading={isFetching}
            scroll={{ x: 850 }}
            dataSource={posts?.content}
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
        )}
      </Col>
    </Row>
  );
}
