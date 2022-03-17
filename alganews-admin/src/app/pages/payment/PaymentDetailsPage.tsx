import {
  Card,
  Descriptions,
  Divider,
  Table,
  Tag,
  Typography,
} from 'antd';
import { Post } from 'mauricio.girardi-sdk';

const { Text, Title } = Typography;
const { Item } = Descriptions;

export default function PaymentDetailsPage() {
  return (
    <Card>
      <Title>Pagamento</Title>
      <Text>
        A base do pagamento é calculada pela quantidade de
        palavras escritas.
      </Text>

      <Divider />

      <Descriptions column={2}>
        <Item label='Editor'>Mauricio Girardi</Item>
        <Item label='Período'>
          <Tag>01/01/2022</Tag>
          <Text style={{ marginRight: 8 }}>até</Text>
          <Tag>30/21/2022</Tag>
        </Item>
        <Item label='Ganhos por posts'>
          <Tag>R$ 12.365,00</Tag>
        </Item>
        <Item label='Total'>
          <Tag>R$ 12.365,00</Tag>
        </Item>
      </Descriptions>

      <Divider />

      <Title level={2}>Bônus</Title>
      <Descriptions column={1} bordered size='small'>
        <Item label='1 milhão de views em 1 dia'>
          R$ 12.365,00
        </Item>
        <Item label='20 milhão de views no mês'>
          R$ 12.365,00
        </Item>
      </Descriptions>

      <Divider />

      <Table<Post.WithEarnings>
        rowKey={'id'}
        scroll={{ x: 850 }}
        dataSource={[]}
        columns={[
          {
            dataIndex: 'title',
            title: 'Post',
            ellipsis: true,
          },
          {
            dataIndex: 'earnings.pricePerWord',
            title: 'Preço por palavra',
          },
          {
            dataIndex: 'earnings.words',
            title: 'Palavras no post',
          },
          {
            dataIndex: 'earnings.total',
            title: 'Total de ganho nest post',
          },
        ]}
      />
    </Card>
  );
}
