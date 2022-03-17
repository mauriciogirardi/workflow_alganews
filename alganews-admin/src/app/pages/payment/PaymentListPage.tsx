import {
  Button,
  Col,
  DatePicker,
  Row,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Payment } from 'mauricio.girardi-sdk';
import { Key } from 'antd/lib/table/interface';

import { formatterDate } from 'core/utils';
import { DoubleConfirm } from '../../components/DoubleConfirm';
import { usePayments } from 'core/hooks/payment/usePayments';

export default function PaymentListPage() {
  const [yearMonth, setYearMonth] = useState<
    string | undefined
  >();
  const [selectedRowKeys, setSelectedRowKeys] = useState<
    Key[]
  >([]);
  const { fetchPayments, payments } = usePayments();

  useEffect(() => {
    fetchPayments({
      scheduledToYearMonth: yearMonth,
      sort: ['scheduledTo', 'desc'],
      page: 0,
      size: 10,
    });
  }, [fetchPayments, yearMonth]);

  const renderAccountingPeriod = (
    period: Payment.Summary['accountingPeriod'],
  ) => {
    const dateStarts = formatterDate({
      date: period.startsOn,
      typeFormat: 'dd/MM/yyyy',
    });
    const dateEnds = formatterDate({
      date: period.endsOn,
      typeFormat: 'dd/MM/yyyy',
    });

    return `${dateStarts} - ${dateEnds}`;
  };

  const renderApprovedAt = (
    approvalDate: Payment.Summary['approvedAt'],
  ) => {
    const date = formatterDate({
      date: approvalDate,
      typeFormat: 'dd/MM/yyyy',
    });

    return approvalDate ? (
      <Tag color='green'>{`Aprovado em ${date}`}</Tag>
    ) : (
      <Tag color='warning'>{`Aguardando Aprovação`}</Tag>
    );
  };

  const renderAction = (
    id: number,
    payment: Payment.Summary,
  ) => {
    const tooltipTitleDelete = payment.canBeDeleted
      ? 'Remover'
      : 'Pagamento já foi aprovado!';

    return (
      <Row gutter={10} justify='end'>
        <Col>
          <DoubleConfirm
            onConfirmContent='Esta é uma ação irreversível. Ao remover um agendamento, ele não poderá ser recuperado.'
            onConfirmTitle='Remover agendamento!'
            popConfirmTitle='Remover Agendamento?'
            tooltipTitle={tooltipTitleDelete}
            disabled={!payment.canBeDeleted}
          >
            <Button
              size='middle'
              type='text'
              disabled={!payment.canBeDeleted}
              icon={<DeleteOutlined />}
            />
          </DoubleConfirm>
        </Col>

        <Col>
          <Tooltip title='Detalhar' placement='right'>
            <Button
              size='middle'
              type='text'
              icon={<EyeOutlined />}
            />
          </Tooltip>
        </Col>
      </Row>
    );
  };

  const onConfirmTitle =
    selectedRowKeys.length === 1
      ? 'Aprovar o pagamento!'
      : 'Aprovar os pagamentos';
  const popConfirmTitle =
    selectedRowKeys.length === 1
      ? 'Você deseja aprovar o pagamento selecionado?'
      : 'Você deseja aprovar os pagamentos selecionados?';

  return (
    <>
      <Row
        justify='space-between'
        align='middle'
        style={{ marginBottom: 30 }}
        gutter={[20, 20]}
      >
        <Col>
          <DoubleConfirm
            onConfirmContent='Esta é uma ação irreversível. Ao aprovar um pagamento, ele não poderá ser removido.'
            onConfirmTitle={onConfirmTitle}
            popConfirmTitle={popConfirmTitle}
            disabled={selectedRowKeys.length === 0}
            okText='Sim'
          >
            <Button
              disabled={selectedRowKeys.length === 0}
              type='primary'
            >
              Aprovar pagamentos
            </Button>
          </DoubleConfirm>
        </Col>

        <Col>
          <DatePicker.MonthPicker
            style={{ width: 250 }}
            format={'MMMM - YYYY'}
            onChange={(date) =>
              setYearMonth(
                date ? date.format('YYYY-MM') : undefined,
              )
            }
          />
        </Col>
      </Row>

      <Table<Payment.Summary>
        rowKey={'id'}
        dataSource={payments?.content}
        scroll={{ x: 850 }}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
          getCheckboxProps(payment) {
            return !payment.canBeApproved
              ? { disabled: true }
              : {};
          },
        }}
        columns={[
          {
            dataIndex: 'payee',
            title: 'Editor',
            align: 'left',
            render(payee: Payment.Summary['payee']) {
              return payee.name;
            },
          },
          {
            dataIndex: 'scheduledTo',
            title: 'Agendamento',
            align: 'center',
            render(date: string) {
              return formatterDate({
                date,
                typeFormat: 'dd/MM/yyyy',
              });
            },
          },
          {
            dataIndex: 'accountingPeriod',
            title: 'Período',
            align: 'center',
            render: renderAccountingPeriod,
          },
          {
            dataIndex: 'approvedAt',
            title: 'Aprovação',
            align: 'center',
            render: renderApprovedAt,
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'right',
            render: renderAction,
          },
        ]}
      />
    </>
  );
}
