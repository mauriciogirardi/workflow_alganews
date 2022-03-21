import { Breadcrumb as BreadcrumbAntd } from 'antd';

const { Item } = BreadcrumbAntd;

export const Breadcrumb = () => {
  return (
    <BreadcrumbAntd
      style={{ margin: '16px 0' }}
      className='no-print'
    >
      <Item>Home</Item>
      <Item>List</Item>
      <Item>App</Item>
    </BreadcrumbAntd>
  );
};
