import {
  Descriptions,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { formatterCurrency } from 'core/utils';
import { Post } from 'mauricio.girardi-sdk';

interface PaymentPostsProps {
  posts?: Post.WithEarnings[];
  loading?: boolean;
}

const { Text } = Typography;

export const PaymentPosts = ({
  posts,
  loading,
}: PaymentPostsProps) => {
  const formatterValue = (value: number) =>
    formatterCurrency(value);

  const renderTableResponsive = (
    post: Post.WithEarnings,
  ) => {
    return (
      <Descriptions column={1} size='small'>
        <Descriptions.Item label='Título'>
          <Tooltip title={post.title}>
            <div>
              <Text ellipsis style={{ width: 200 }}>
                {post.title}
              </Text>
            </div>
          </Tooltip>
        </Descriptions.Item>
        <Descriptions.Item label='Preço por palavra'>
          {formatterValue(post.earnings.pricePerWord)}
        </Descriptions.Item>
        <Descriptions.Item label='Palavras no post'>
          {post.earnings.words}
        </Descriptions.Item>
        <Descriptions.Item label='Ganho nest post'>
          {formatterValue(post.earnings.totalAmount)}
        </Descriptions.Item>
      </Descriptions>
    );
  };

  return (
    <Table<Post.WithEarnings>
      rowKey={'id'}
      loading={loading}
      dataSource={posts}
      columns={[
        {
          responsive: ['xs'],
          title: 'Posts',
          render: renderTableResponsive,
        },
        {
          dataIndex: 'title',
          title: 'Post',
          align: 'left',
          width: 350,
          ellipsis: true,
          responsive: ['sm'],
        },
        {
          dataIndex: 'earnings.pricePerWord'.split('.'),
          title: 'Preço por palavra',
          align: 'center',
          render: formatterValue,
          responsive: ['sm'],
          width: 150,
        },
        {
          dataIndex: 'earnings.words'.split('.'),
          title: 'Palavras no post',
          align: 'center',
          responsive: ['sm'],
          width: 150,
        },
        {
          dataIndex: 'earnings.totalAmount'.split('.'),
          title: 'Ganho nest post',
          align: 'right',
          render: formatterValue,
          responsive: ['sm'],
          width: 150,
        },
      ]}
    />
  );
};
