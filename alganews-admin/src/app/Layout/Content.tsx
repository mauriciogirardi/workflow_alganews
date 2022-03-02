import { Layout } from 'antd';
import { ReactNode } from 'react';

const { Content: ContentAntd } = Layout;

interface ContentProps {
  children: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return (
    <ContentAntd
      className='site-layout-background'
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      {children}
    </ContentAntd>
  );
};
