import {
  Descriptions,
  Divider,
  Skeleton,
  Tag,
  Typography,
} from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import {
  formatterCurrency,
  formatterDate,
} from 'core/utils';

const { Text, Title } = Typography;
const { Item } = Descriptions;

interface PaymentHeaderProps {
  editorId?: number;
  editorName?: string;
  periodStart?: string;
  periodEnd?: string;
  postsEarnings?: number;
  totalEarnings?: number;
  loading?: boolean;
}

export const PaymentHeader = ({
  editorName,
  periodEnd,
  periodStart,
  postsEarnings = 0,
  totalEarnings = 0,
  loading,
}: PaymentHeaderProps) => {
  const { xs } = useBreakpoint();

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      <Title>Pagamento</Title>
      <Text>
        A base do pagamento é calculada pela quantidade de
        palavras escritas.
      </Text>

      <Divider />

      <Descriptions
        column={xs ? 1 : 2}
        size={xs ? 'small' : 'default'}
      >
        <Item label='Editor'>{editorName}</Item>
        <Item label='Período'>
          <Tag>
            {!!periodStart &&
              formatterDate({
                date: periodStart,
              })}
          </Tag>
          <Text style={{ marginRight: 8 }}>até</Text>
          <Tag>
            {!!periodEnd &&
              formatterDate({
                date: periodEnd,
              })}
          </Tag>
        </Item>
        <Item label='Ganhos por posts'>
          <Tag>{formatterCurrency(postsEarnings)}</Tag>
        </Item>
        <Item label='Total'>
          <Tag>{formatterCurrency(totalEarnings)}</Tag>
        </Item>
      </Descriptions>
    </>
  );
};
