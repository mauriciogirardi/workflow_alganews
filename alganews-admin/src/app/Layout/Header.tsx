import { Avatar, Layout, Row } from 'antd';

import logoSvg from '../assets/logo.svg';

const { Header: HeaderAntd } = Layout;

export const Header = () => {
  return (
    <HeaderAntd className='header'>
      <Row
        justify='space-between'
        align='middle'
        style={{ height: '100%' }}
      >
        <img src={logoSvg} alt='AlgaNews Admin' />
        <Avatar />
      </Row>
    </HeaderAntd>
  );
};
