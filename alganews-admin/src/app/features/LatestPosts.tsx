import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Avatar, Card, Col, Row } from 'antd';

import { useLatestPosts } from '../../core/hooks/useLatestPosts';

const { Meta } = Card;

export const LatestPosts = () => {
  const { fetchPosts, posts, loading } = useLatestPosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return (
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <Skeleton height={244} />
        </Col>
        <Col span={8}>
          <Skeleton height={244} />
        </Col>
        <Col span={8}>
          <Skeleton height={244} />
        </Col>
      </Row>
    );
  }

  return (
    <Row gutter={[20, 20]}>
      {posts?.map((post) => (
        <Col key={post.id} xs={24} md={8}>
          <Card
            cover={
              <img
                src={post.imageUrls.small}
                alt={post.title}
                style={{ height: 168, objectFit: 'cover' }}
              />
            }
          >
            <Meta
              avatar={
                <Avatar
                  src={post.editor.avatarUrls.small}
                />
              }
              title={post.title}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};
