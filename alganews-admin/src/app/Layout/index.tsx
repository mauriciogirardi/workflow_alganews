import { ReactNode } from 'react';
import { Layout } from 'antd';

import { Breadcrumb } from './Breadcrumb';
import { Sidebar } from './Sidebar';
import { Content } from './Content';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({
  children,
}: LayoutProps) => {
  return (
    <Layout>
      <Header />

      <Layout>
        <Sidebar />

        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb />
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
