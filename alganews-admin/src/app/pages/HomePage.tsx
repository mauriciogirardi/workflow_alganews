import { Col, Row, Typography, Space, Divider } from 'antd';
import { useAuth } from 'core/hooks/auth/useAuth';
import { useBreadcrumb } from 'core/hooks/useBreadcrumb';
import { usePageTitle } from 'core/utils/hooks/usePageTitle';

import { CompanyMetrics } from '../features/home/CompanyMetrics';
import { LatestPosts } from '../features/home/LatestPosts';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const { user } = useAuth();
  usePageTitle('Home');
  useBreadcrumb('Home');

  return (
    <Space direction='vertical' size={'small'} style={{ maxWidth: '100%' }}>
      <Row>
        <Col span={24}>
          <Title level={2}>Olá, {user?.name}</Title>
          <Paragraph>
            Este é o resumo da empresa nos últimos doze meses.
          </Paragraph>
        </Col>
        <Col span={24}>
          <CompanyMetrics />
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={24}>
          <Title level={3}>Últimos posts</Title>
        </Col>
        <Col span={24}>
          <LatestPosts />
        </Col>
      </Row>
    </Space>
  );
}
