import { useEffect } from 'react';
import { Button, Card, DatePicker, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { CashFlow } from 'mauricio.girardi-sdk';
import moment from 'moment';

import { formatterCurrency, formatterDate } from 'core/utils';
import { useCashFlow } from 'core/hooks/cashFlow/useCashFlow';

const TYPE_FORMAT = 'YYYY-MM';

export const EntryList = () => {
  const {
    query,
    entries,
    setQuery,
    selected,
    setSelected,
    fetchEntries,
    isFetchingEntries,
  } = useCashFlow('EXPENSE');

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const renderActions = (id: number) => {
    return (
      <Space>
        <Button size='small' danger type='text' icon={<DeleteOutlined />} />
        <Button size='small' type='text' icon={<EditOutlined />} />
        <Button size='small' type='text' icon={<EyeOutlined />} />
      </Space>
    );
  };

  const filterByDate = () => {
    return (
      <Card>
        <DatePicker.MonthPicker
          format={'YYYY - MMMM'}
          onChange={(date) => {
            setQuery({
              ...query,
              yearMonth:
                date?.format(TYPE_FORMAT) || moment().format(TYPE_FORMAT),
            });
          }}
        />
      </Card>
    );
  };

  const renderDateFormatted = (
    transactedOn: CashFlow.EntrySummary['transactedOn'],
  ) => {
    return formatterDate({
      date: transactedOn,
      typeFormat: 'dd/MM/yyyy',
    });
  };

  return (
    <>
      <Table<CashFlow.EntrySummary>
        rowKey={'id'}
        dataSource={entries}
        loading={isFetchingEntries}
        rowSelection={{
          selectedRowKeys: selected,
          onChange: setSelected,
          getCheckboxProps(record) {
            return !record.canBeDeleted ? { disabled: true } : {};
          },
        }}
        columns={[
          {
            dataIndex: 'description',
            title: 'Descrição',
            width: 300,
            ellipsis: true,
          },
          {
            dataIndex: 'category',
            title: 'Categoria',
            align: 'center',
            render(category: CashFlow.EntrySummary['category']) {
              return <Tag>{category.name}</Tag>;
            },
          },
          {
            dataIndex: 'transactedOn',
            title: 'Data',
            align: 'center',
            filterDropdown: filterByDate,
            render: renderDateFormatted,
          },
          {
            dataIndex: 'amount',
            title: 'Valor',
            align: 'right',
            render(amount: CashFlow.EntrySummary['amount']) {
              return formatterCurrency(amount);
            },
          },

          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'right',
            render: renderActions,
          },
        ]}
      />
    </>
  );
};
