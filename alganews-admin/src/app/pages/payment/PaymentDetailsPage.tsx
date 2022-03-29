import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Divider, Row, Space, Tag } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { usePayment } from 'core/hooks/payment/usePayment';
import { useEffect } from 'react';

import { PaymentBonuses } from 'app/features/payment/PaymentBonuses';
import { PaymentHeader } from 'app/features/payment/PaymentHeader';
import { NotFoundError } from 'app/components/NotFoundError';
import { DoubleConfirm } from 'app/components/DoubleConfirm';
import { formatterDate } from 'core/utils';
import { PaymentPosts } from 'app/features/payment/PaymentPosts';
import { usePageTitle } from 'core/utils/hooks/usePageTitle';
import { notification } from 'core/utils/notification';
import { PAYMENTS } from 'core/constants-paths';

export default function PaymentDetailsPage() {
  usePageTitle('Detalhes do pagamento');
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const userId = Number(params.id);

  const {
    posts,
    payment,
    fetchPosts,
    fetchPayment,
    fetchingPosts,
    postsNotFound,
    fetchingPayment,
    paymentNotFound,
    approvePayment,
    fetchingSchedulePayment,
  } = usePayment();

  useEffect(() => {
    if (!isNaN(userId)) {
      fetchPayment(userId);
      fetchPosts(userId);
    } else {
      navigate(-1);
    }
  }, [fetchPayment, fetchPosts, userId, navigate]);

  const handleConfirmSchedule = async (id: number) => {
    await approvePayment(id);
    notification({
      title: 'Pagamento',
      description: 'O Pagamento selecionado foi aprovado.',
    });

    navigate(PAYMENTS);
  };

  const renderPaymentApprovedAt = () => {
    return (
      <Tag>{`Pagamento aprovado em ${
        !!payment?.approvedAt && formatterDate({ date: payment?.approvedAt })
      }`}</Tag>
    );
  };

  if (paymentNotFound || postsNotFound) {
    return (
      <NotFoundError
        title='Pagamento não encontrado'
        actionDestination={PAYMENTS}
        actionTitle='Voltar'
      />
    );
  }

  return (
    <Row gutter={[20, 20]} justify='end'>
      <Col>
        <Space>
          {!payment?.canBeApproved ? (
            renderPaymentApprovedAt()
          ) : (
            <DoubleConfirm
              onConfirmContent='Aprovar um agendamento de pagamento gera uma despesa que não pode ser removida do fluxo de caixa. Essa ação não poderá ser desfeita.'
              onConfirmTitle='Ação irreversível'
              popConfirmTitle='Deseja aprovar este agendamento?'
              okText='Sim'
              onOk={() => handleConfirmSchedule(payment?.id)}
            >
              <Button
                className='no-print'
                type='primary'
                danger
                icon={<PrinterOutlined />}
                loading={fetchingSchedulePayment}
              >
                Aprovar agendamento
              </Button>
            </DoubleConfirm>
          )}

          <Button
            className='no-print'
            type='primary'
            icon={<PrinterOutlined />}
            onClick={window.print}
          >
            Imprimir
          </Button>
        </Space>
      </Col>

      <Col>
        <Card>
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

          <PaymentPosts posts={posts} loading={fetchingPosts} />
        </Card>
      </Col>
    </Row>
  );
}
