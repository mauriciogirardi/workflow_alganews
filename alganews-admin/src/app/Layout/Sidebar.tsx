import { useMemo, useState } from 'react';
import { Button, Drawer, DrawerProps, Layout, Menu, SiderProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import {
  UserOutlined,
  LaptopOutlined,
  HomeOutlined,
  TableOutlined,
  PlusCircleOutlined,
  DiffOutlined,
  RiseOutlined,
  FallOutlined,
  MenuOutlined,
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
import logo from '../assets/logo.svg';

const { SubMenu, Item } = Menu;
const { Sider } = Layout;

export const Sidebar = () => {
  const { lg } = useBreakpoint();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const SidebarWrapper: React.FC = useMemo(() => (lg ? Sider : Drawer), [lg]);

  const siderProps = useMemo((): SiderProps => {
    return {
      width: 200,
      className: 'no-print',
    };
  }, []);

  const drawerProps = useMemo((): DrawerProps => {
    return {
      width: 250,
      visible: show,
      closable: true,
      placement: 'left',
      bodyStyle: {
        padding: 0,
      },
      headerStyle: {
        height: 64,
      },
      title: (
        <>
          <img src={logo} alt='Logo alga news' />
        </>
      ),
      onClose() {
        setShow(false);
      },
    };
  }, [show]);

  const sidebarProps = useMemo(() => {
    return lg ? siderProps : drawerProps;
  }, [lg, siderProps, drawerProps]);

  return (
    <>
      {!lg && (
        <Button
          icon={<MenuOutlined />}
          onClick={() => setShow(true)}
          type='text'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: 67,
            zIndex: 99,
          }}
        />
      )}
      <SidebarWrapper {...sidebarProps}>
        <Menu
          mode='inline'
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[location.pathname.split('/')[1]]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Item key={HOME} icon={<HomeOutlined />}>
            <Link to={HOME}>Home</Link>
          </Item>

          <SubMenu key='users' icon={<UserOutlined />} title='Usuários'>
            <Item key={USERS} icon={<TableOutlined />}>
              <Link to={USERS}>Consulta</Link>
            </Item>
            <Item key={USER_CREATE} icon={<PlusCircleOutlined />}>
              <Link to={USER_CREATE}>Cadastro</Link>
            </Item>
          </SubMenu>
          <SubMenu key='payments' icon={<LaptopOutlined />} title='Pagamentos'>
            <Item key={PAYMENTS} icon={<TableOutlined />}>
              <Link to={PAYMENTS}></Link>
              Consulta
            </Item>
            <Item key={PAYMENTS_CREATE} icon={<PlusCircleOutlined />}>
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
      </SidebarWrapper>
    </>
  );
};
