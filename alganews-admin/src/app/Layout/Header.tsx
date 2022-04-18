import { Avatar, Layout, Row } from 'antd';
import { useAuth } from 'core/hooks/auth/useAuth';

import logoSvg from '../assets/logo.svg';

const { Header: HeaderAntd } = Layout;

export const Header = () => {
  const { user } = useAuth();
  return (
    <HeaderAntd className='header no-print'>
      <Row justify='space-between' align='middle' style={{ height: '100%' }}>
        <img src={logoSvg} alt='AlgaNews Admin' />
        <Avatar src={user?.avatarUrls.small} />
      </Row>
    </HeaderAntd>
  );
};
