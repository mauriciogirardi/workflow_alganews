import { Avatar, Card, Dropdown, Layout, Menu, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { UserOutlined, LogoutOutlined, SettingFilled } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';

import { AuthService } from 'auth/Authorization.service';
import { TagTable } from 'app/components/TagTable';
import { useAuth } from 'core/hooks/auth/useAuth';
import { USERS } from 'core/constants-paths';
import { Link } from 'react-router-dom';
import logoSvg from '../assets/logo.svg';

const { Header: HeaderAntd } = Layout;

export const Header = () => {
  const { user } = useAuth();

  const renderMenuDropdown = () => {
    return (
      <Menu style={{ width: 200, padding: 0 }}>
        <Card bordered={false}>
          <Meta
            title={user?.name}
            description={<TagTable role={user?.role || ''} />}
          />
        </Card>

        <Menu>
          <Menu.Item icon={<UserOutlined />}>
            <Link to={`${USERS}/${user?.id}`}>Meu perfil</Link>
          </Menu.Item>
          <Menu.Item
            icon={<LogoutOutlined />}
            danger
            onClick={() =>
              confirm({
                title: 'Fazer logout',
                content:
                  'Deseja realmente fazer o logout? Será necessário inserir as credenciais novamente.',
                okText: 'Fazer logout',
                cancelText: 'Permanecer logado',
                okButtonProps: { danger: true },
                onOk() {
                  AuthService.imperativelySendToLogout();
                },
              })
            }
          >
            Fazer logout
          </Menu.Item>
        </Menu>
      </Menu>
    );
  };

  return (
    <HeaderAntd className='header no-print'>
      <Row justify='space-between' align='middle' style={{ height: '100%' }}>
        <img src={logoSvg} alt='AlgaNews Admin' />

        <Dropdown overlay={renderMenuDropdown} placement='bottomRight'>
          <div style={{ position: 'relative' }}>
            <Avatar src={user?.avatarUrls.small} />
            <SettingFilled
              style={{
                color: '#0199ff',
                position: 'absolute',
                left: 0,
                bottom: 10,
              }}
            />
          </div>
        </Dropdown>
      </Row>
    </HeaderAntd>
  );
};
