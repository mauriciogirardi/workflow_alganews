import { Breadcrumb as BreadcrumbAntd } from 'antd';
import { useBreadcrumb } from 'core/hooks/useBreadcrumb';

const { Item } = BreadcrumbAntd;

export const Breadcrumb = () => {
  const { breadcrumb } = useBreadcrumb();
  return (
    <BreadcrumbAntd style={{ margin: '16px 0' }} className='no-print'>
      {breadcrumb.map((bc) => (
        <Item key={bc}>{bc}</Item>
      ))}
    </BreadcrumbAntd>
  );
};
