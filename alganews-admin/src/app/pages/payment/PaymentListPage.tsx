import { Button, Col, DatePicker, Row, Table, Tag, Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useCallback, useEffect } from 'react';
import { SorterResult } from 'antd/lib/table/interface';
import { Payment } from 'mauricio.girardi-sdk';
import { Link } from 'react-router-dom';

import { PAYMENTS_DETAILS, USERS } from 'core/constants-paths';
import { formatterDate } from 'core/utils';
import { DoubleConfirm } from '../../components/DoubleConfirm';
import { notification } from 'core/utils/notification';
import { usePayments } from 'core/hooks/payment/usePayments';

export default function PaymentListPage() {
  const {
    query,
    setQuery,
    payments,
    selected,
    isFetching,
    setSelected,
    fetchPayments,
    deletePayment,
    approvingPaymentsInBatch,
  } = usePayments();

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

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

  const renderApprovedAt = (approvalDate: Payment.Summary['approvedAt']) => {
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

  const confirmPayment = useCallback(
    async (selectedRowKeys) => {
      await approvingPaymentsInBatch(selectedRowKeys);
      notification({
        title: 'Pagamentos',
        description: 'Os Pagamentos selecionados foram aprovados.',
      });
    },
    [approvingPaymentsInBatch],
  );

  const confirmDeletePayment = useCallback(
    async (id: number) => {
      await deletePayment(id);
      notification({
        title: 'Deletar Pagamento',
        description: 'O Pagamento foi deletado com sucesso.',
      });
    },
    [deletePayment],
  );

  const renderAction = (id: number, payment: Payment.Summary) => {
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
            onOk={() => confirmDeletePayment(id)}
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
            <Link to={PAYMENTS_DETAILS.replace(':id', String(payment.id))}>
              <Button size='middle' type='text' icon={<EyeOutlined />} />
            </Link>
          </Tooltip>
        </Col>
      </Row>
    );
  };

  const onConfirmTitle =
    selected.length === 1 ? 'Aprovar o pagamento!' : 'Aprovar os pagamentos';
  const popConfirmTitle =
    selected.length === 1
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
            disabled={selected.length === 0}
            okText='Sim'
            onOk={() => confirmPayment(selected)}
          >
            <Button
              disabled={selected.length === 0}
              type='primary'
              loading={isFetching}
            >
              Aprovar pagamentos
            </Button>
          </DoubleConfirm>
        </Col>

        <Col>
          <DatePicker.MonthPicker
            style={{ width: 250 }}
            format={'MMMM - YYYY'}
            disabled={isFetching}
            onChange={(date) => {
              setQuery({
                scheduledToYearMonth: date ? date.format('YYYY-MM') : undefined,
                sort: ['scheduledTo', 'desc'],
              });
            }}
          />
        </Col>
      </Row>

      <Table<Payment.Summary>
        loading={isFetching}
        pagination={{
          current: query.page ? query.page + 1 : 1,
          onChange: (page) =>
            setQuery({ page: page - 1, sort: ['scheduledTo', 'desc'] }),
          total: payments?.totalElements,
          pageSize: query.size,
        }}
        rowKey={'id'}
        dataSource={payments?.content}
        scroll={{ x: 850 }}
        rowSelection={{
          selectedRowKeys: selected,
          onChange: setSelected,
          getCheckboxProps(payment) {
            return !payment.canBeApproved ? { disabled: true } : {};
          },
        }}
        onChange={(p, f, sorter) => {
          const { order } = sorter as SorterResult<Payment.Summary>;
          const direction = order?.replace('end', '');
          if (direction && direction !== query.sort[1]) {
            setQuery({
              sort: [query.sort[0], direction as 'asc' | 'desc'],
            });
          }
        }}
        columns={[
          {
            dataIndex: 'payee',
            title: 'Editor',
            align: 'left',
            render(payee: Payment.Summary['payee']) {
              return <Link to={`${USERS}/${payee.id}`}>{payee.name}</Link>;
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
            sorter() {
              return 0;
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
