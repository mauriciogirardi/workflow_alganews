import { Payment } from 'mauricio.girardi-sdk';
import { Descriptions, Skeleton, Typography } from 'antd';

import { formatterCurrency } from 'core/utils';

const { Title } = Typography;
const { Item } = Descriptions;

interface PaymentBonusesProps {
  bonuses?: Payment.Detailed['bonuses'];
  loading?: boolean;
}

export const PaymentBonuses = ({
  bonuses,
  loading,
}: PaymentBonusesProps) => {
  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      <Title level={2}>Bônus</Title>
      <Descriptions column={1} bordered size='small'>
        {bonuses?.map((bonus, index) => (
          <Item label={bonus.title} key={index}>
            {formatterCurrency(bonus.amount)}
          </Item>
        ))}
      </Descriptions>
    </>
  );
};
