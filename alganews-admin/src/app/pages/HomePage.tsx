import { Col, Row, Typography, Space, Divider } from 'antd';

import { CompanyMetrics } from '../features/CompanyMetrics';
import { LatestPosts } from '../features/LatestPosts';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <Space
      direction='vertical'
      size={'small'}
      style={{ maxWidth: '100%' }}
    >
      <Row>
        <Col span={24}>
          <Title level={2}>Olá, Mauricio Girardi</Title>
          <Paragraph>
            Este é o resumo da empresa nos últimos doze
            meses.
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
