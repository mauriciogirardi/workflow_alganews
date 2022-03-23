import { useCallback } from 'react';
import { Descriptions, Space, Spin, Tabs, Tooltip } from 'antd';
import {
  SolutionOutlined,
  InfoCircleOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { Payment } from 'mauricio.girardi-sdk';
import CustomError from 'mauricio.girardi-sdk/dist/CustomError';
import moment from 'moment';

import { formatterCurrency, formatterDate } from 'core/utils';
import { AskForPaymentPreview } from 'app/components/AskForPaymentPreview';

interface PaymentPreviewProps {
  scheduledTo?: string;
  paymentPreviewError?: CustomError;
  paymentPreview?: Payment.Preview;
  fetchingPaymentPreview: boolean;
}

const { TabPane } = Tabs;
const stylesSpin = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  height: 258,
  paddingTop: 100,
};

export const PaymentPreview = ({
  scheduledTo,
  paymentPreviewError,
  fetchingPaymentPreview,
  paymentPreview,
}: PaymentPreviewProps) => {
  const TabBackAccount = useCallback(() => {
    return (
      <Descriptions
        column={1}
        bordered
        size='small'
        labelStyle={{ width: 160 }}
      >
        <Descriptions.Item label='Código do Banco'>
          {paymentPreview?.bankAccount.bankCode}
        </Descriptions.Item>
        <Descriptions.Item label='Número da conta'>
          {paymentPreview?.bankAccount.number}
        </Descriptions.Item>
        <Descriptions.Item label='Dígito da conta'>
          {paymentPreview?.bankAccount.digit}
        </Descriptions.Item>
        <Descriptions.Item label='Agência'>
          {paymentPreview?.bankAccount.agency}
        </Descriptions.Item>
        <Descriptions.Item label='Tipo de conta'>
          {paymentPreview?.bankAccount.type === 'SAVING'
            ? 'Conta Poupança'
            : 'Conta Corrente'}
        </Descriptions.Item>
      </Descriptions>
    );
  }, [paymentPreview]);

  const TabDemonstrative = useCallback(() => {
    return (
      <Descriptions
        column={1}
        bordered
        size='small'
        labelStyle={{ width: 160 }}
      >
        <Descriptions.Item label='Editor'>
          {paymentPreview?.payee.name}
        </Descriptions.Item>
        <Descriptions.Item label='Período'>
          {paymentPreview?.accountingPeriod.startsOn
            ? `${formatterDate({
                date: paymentPreview.accountingPeriod.startsOn,
              })} até ${formatterDate({
                date: paymentPreview.accountingPeriod.endsOn,
              })}`
            : ''}
        </Descriptions.Item>
        <Descriptions.Item label='Agendamento'>
          {scheduledTo && moment(scheduledTo).format('DD/MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label='Palavras'>
          {paymentPreview?.earnings.words}
        </Descriptions.Item>
        {paymentPreview?.bonuses.map((bonus, index) => (
          <Descriptions.Item
            key={index}
            label={
              <Space>
                {`Bônus ${index + 1}`}
                <Tooltip title={bonus.title}>
                  <InfoCircleOutlined style={{ color: '#09f' }} />
                </Tooltip>
              </Space>
            }
          >
            {formatterCurrency(bonus.amount)}
          </Descriptions.Item>
        ))}
        <Descriptions.Item label='Ganhos de posts'>
          {paymentPreview?.grandTotalAmount &&
            formatterCurrency(paymentPreview?.grandTotalAmount)}
        </Descriptions.Item>
      </Descriptions>
    );
  }, [paymentPreview, scheduledTo]);

  return (
    <>
      {fetchingPaymentPreview ? (
        <Spin style={stylesSpin} />
      ) : !paymentPreview ? (
        <AskForPaymentPreview error={paymentPreviewError} />
      ) : (
        <Tabs defaultActiveKey='personal'>
          <TabPane
            key='personal'
            tab={
              <span>
                <SolutionOutlined />
                Demonstrativo
              </span>
            }
          >
            <TabDemonstrative />
          </TabPane>
          <TabPane
            forceRender
            key='bankAccount'
            tab={
              <span>
                <BankOutlined />
                Dados bancários
              </span>
            }
          >
            <TabBackAccount />
          </TabPane>
        </Tabs>
      )}
    </>
  );
};
