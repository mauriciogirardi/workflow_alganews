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
import { Link } from 'react-router-dom';
import {
  EXPENSES,
  HOME,
  PAYMENTS,
  PAYMENTS_CREATE,
  REVENUES,
  USERS,
  USERS_CREATE,
} from '../../core/constants-paths';

const { SubMenu, Item } = Menu;
const { Sider } = Layout;

export const Sidebar = () => {
  return (
    <Sider width={200} breakpoint='lg' collapsedWidth='0'>
      <Menu
        mode='inline'
        defaultSelectedKeys={[HOME]}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Item key={HOME} icon={<HomeOutlined />}>
          <Link to={HOME}>Home</Link>
        </Item>

        <SubMenu
          key='sub1'
          icon={<UserOutlined />}
          title='Usuários'
        >
          <Item key={USERS} icon={<TableOutlined />}>
            <Link to={USERS}>Consulta</Link>
          </Item>
          <Item
            key={USERS_CREATE}
            icon={<PlusCircleOutlined />}
          >
            <Link to={USERS_CREATE}>Cadastro</Link>
          </Item>
        </SubMenu>
        <SubMenu
          key='sub2'
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
          key='sub3'
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
