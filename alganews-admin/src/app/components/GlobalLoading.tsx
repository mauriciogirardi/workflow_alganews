import { Card, Spin } from 'antd';

export const GlobalLoading = () => {
  return (
    <Card
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin />
    </Card>
  );
};
