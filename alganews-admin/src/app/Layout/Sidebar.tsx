import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  HomeOutlined,
  TableOutlined,
  PlusCircleOutlined,
  DiffOutlined,
  RiseOutlined,
  FallOutlined,
} from '@ant-design/icons';

const { SubMenu, Item } = Menu;
const { Sider } = Layout;

export const Sidebar = () => {
  return (
    <Sider width={200} breakpoint='lg' collapsedWidth='0'>
      <Menu
        mode='inline'
        defaultSelectedKeys={['0']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Item key={'0'} icon={<HomeOutlined />}>
          Home
        </Item>

        <SubMenu
          key='sub1'
          icon={<UserOutlined />}
          title='Usuários'
        >
          <Item key='1' icon={<TableOutlined />}>
            Consulta
          </Item>
          <Item key='2' icon={<PlusCircleOutlined />}>
            Cadastro
          </Item>
        </SubMenu>
        <SubMenu
          key='sub2'
          icon={<LaptopOutlined />}
          title='Pagamentos'
        >
          <Item key='3' icon={<TableOutlined />}>
            Consulta
          </Item>
          <Item key='4' icon={<PlusCircleOutlined />}>
            Cadastro
          </Item>
        </SubMenu>
        <SubMenu
          key='sub3'
          icon={<DiffOutlined />}
          title='Fluxo de Caixa'
        >
          <Item key='5' icon={<FallOutlined />}>
            Despesa
          </Item>
          <Item key='6' icon={<RiseOutlined />}>
            Receita
          </Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};
