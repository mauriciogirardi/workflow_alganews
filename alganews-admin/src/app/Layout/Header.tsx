import { Layout } from 'antd';

const { Header: HeaderAntd } = Layout;

export const Header = () => {
  return (
    <HeaderAntd className='header'>
      <div className='logo' />
      <h1>Ola</h1>
    </HeaderAntd>
  );
};
