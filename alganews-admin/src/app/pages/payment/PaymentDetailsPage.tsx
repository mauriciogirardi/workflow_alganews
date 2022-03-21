import { Card, Divider } from 'antd';
import { usePayment } from 'core/hooks/payment/usePayment';
import { useEffect } from 'react';

import { PaymentBonuses } from 'app/features/payment/PaymentBonuses';
import { PaymentHeader } from 'app/features/payment/PaymentHeader';
import { PaymentPosts } from 'app/features/payment/PaymentPosts';
import { useNavigate, useParams } from 'react-router-dom';
import { NotFoundError } from 'app/components/NotFoundError';
import { PAYMENTS } from 'core/constants-paths';

export default function PaymentDetailsPage() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const userId = Number(params.id);

  const {
    fetchPayment,
    fetchPosts,
    fetchingPayment,
    fetchingPost,
    payment,
    posts,
    notFound,
  } = usePayment();

  useEffect(() => {
    if (!isNaN(userId)) {
      fetchPayment(userId);
      fetchPosts(userId);
    } else {
      navigate(-1);
    }
  }, [fetchPayment, fetchPosts, userId, navigate]);

  if (notFound) {
    return (
      <NotFoundError
        title='Pagamento não encontrado'
        actionDestination={PAYMENTS}
        actionTitle='Voltar'
      />
    );
  }

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
