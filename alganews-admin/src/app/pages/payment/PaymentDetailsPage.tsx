import { Card, Divider } from 'antd';
import { usePayment } from 'core/hooks/payment/usePayment';
import { useEffect } from 'react';

import { PaymentBonuses } from 'app/features/payment/PaymentBonuses';
import { PaymentHeader } from 'app/features/payment/PaymentHeader';
import { PaymentPosts } from 'app/features/payment/PaymentPosts';

export default function PaymentDetailsPage() {
  const {
    fetchPayment,
    fetchPosts,
    fetchingPayment,
    fetchingPost,
    payment,
    posts,
  } = usePayment();

  useEffect(() => {
    fetchPayment(1);
    fetchPosts(1);
  }, [fetchPayment, fetchPosts]);

  return (
    <Card>
      <>
        <PaymentHeader
          loading={fetchingPayment}
          editorId={payment?.payee.id}
          editorName={payment?.payee.name}
          periodStart={payment?.accountingPeriod.startsOn}
          periodEnd={payment?.accountingPeriod.endsOn}
          postsEarnings={payment?.earnings.totalAmount}
          totalEarnings={payment?.grandTotalAmount}
        />
        <Divider />
        <PaymentBonuses
          bonuses={payment?.bonuses}
          loading={fetchingPayment}
        />
        <Divider />

        <PaymentPosts
          posts={posts}
          loading={fetchingPost}
        />
      </>
    </Card>
  );
}
