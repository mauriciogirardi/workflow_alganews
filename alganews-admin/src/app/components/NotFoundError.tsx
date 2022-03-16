import { Button, Typography } from 'antd';
import { WarningFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface NotFoundErrorProps {
  title: string;
  actionTitle: string;
  actionDestination: string;
}

export const NotFoundError = ({
  title,
  actionDestination,
  actionTitle,
}: NotFoundErrorProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '90%',
        gap: 16,
      }}
    >
      <WarningFilled style={{ fontSize: 32 }} />
      <Typography.Title style={{ color: '#09f' }} level={2}>
        {title}
      </Typography.Title>
      <Typography.Text ellipsis>
        O recurso que você está procurando não foi
        encontrado
      </Typography.Text>
      <Link to={actionDestination}>
        <Button type={'primary'}>{actionTitle}</Button>
      </Link>
    </div>
  );
};
