import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
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
import {
  EXPENSES,
  HOME,
  PAYMENTS,
  PAYMENTS_CREATE,
  REVENUES,
  USERS,
  USER_CREATE,
} from '../../core/constants-paths';

const { SubMenu, Item } = Menu;
const { Sider } = Layout;

export const Sidebar = () => {
  const location = useLocation();

  return (
    <Sider width={200} breakpoint='lg' collapsedWidth='0'>
      <Menu
        mode='inline'
        defaultSelectedKeys={[location.pathname]}
        defaultOpenKeys={[location.pathname.split('/')[1]]}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Item key={HOME} icon={<HomeOutlined />}>
          <Link to={HOME}>Home</Link>
        </Item>

        <SubMenu
          key='users'
          icon={<UserOutlined />}
          title='Usuários'
        >
          <Item key={USERS} icon={<TableOutlined />}>
            <Link to={USERS}>Consulta</Link>
          </Item>
          <Item
            key={USER_CREATE}
            icon={<PlusCircleOutlined />}
          >
            <Link to={USER_CREATE}>Cadastro</Link>
          </Item>
        </SubMenu>
        <SubMenu
          key='payments'
          icon={<LaptopOutlined />}
          title='Pagamentos'
        >
          <Item key={PAYMENTS} icon={<TableOutlined />}>
            <Link to={PAYMENTS}></Link>
            Consulta
          </Item>
          <Item
            key={PAYMENTS_CREATE}
            icon={<PlusCircleOutlined />}
          >
            <Link to={PAYMENTS_CREATE}>Cadastro</Link>
          </Item>
        </SubMenu>
        <SubMenu
          key='cashflow'
          icon={<DiffOutlined />}
          title='Fluxo de Caixa'
        >
          <Item key={EXPENSES} icon={<FallOutlined />}>
            <Link to={EXPENSES}>Despesa</Link>
          </Item>
          <Item key={REVENUES} icon={<RiseOutlined />}>
            <Link to={REVENUES}>Receita</Link>
          </Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};
