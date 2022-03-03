import { Layout } from 'antd';
import { ReactNode } from 'react';

const { Content: ContentAntd } = Layout;

interface ContentProps {
  children: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return (
    <ContentAntd className='center-content'>
      {children}
    </ContentAntd>
  );
};
