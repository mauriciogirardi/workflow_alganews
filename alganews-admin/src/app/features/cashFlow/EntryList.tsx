import { useCallback, useEffect } from 'react';
import { Button, Card, DatePicker, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { CashFlow } from 'mauricio.girardi-sdk';
import moment from 'moment';

import { formatterCurrency, formatterDate } from 'core/utils';
import { useCashFlow } from 'core/hooks/cashFlow/useCashFlow';
import { notification } from 'core/utils/notification';
import { DoubleConfirm } from 'app/components/DoubleConfirm';

interface EntryListProps {
  onEdit: (id: number) => any;
  onDetails: (id: number) => any;
  type: 'EXPENSE' | 'REVENUE';
}

const TYPE_FORMAT = 'YYYY-MM';

export const EntryList = ({ onEdit, type, onDetails }: EntryListProps) => {
  const {
    query,
    entries,
    setQuery,
    selected,
    setSelected,
    fetchEntries,
    isFetchingEntries,
    removeEntry,
  } = useCashFlow('EXPENSE');

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const renderActions = (id: number, record: CashFlow.EntrySummary) => {
    return (
      <Space>
        <DoubleConfirm
          onConfirmContent='Remover uma despesa pode gerar um impacto negativo no gráfico de receitas e despesas. Esta ação é irreversível!'
          onConfirmTitle={`Deseja mesmo remover essa ${
            type === 'EXPENSE' ? 'despesa ' : 'receita '
          }?`}
          popConfirmTitle={`Remover ${
            type === 'EXPENSE' ? 'despesa selecionada' : 'receita selecionada'
          }`}
          disabled={!record.canBeDeleted}
          okText='Sim'
          onOk={() => handleRemoveEntry(id)}
        >
          <Button
            size='small'
            danger
            type='text'
            disabled={!record.canBeDeleted}
            icon={<DeleteOutlined />}
          />
        </DoubleConfirm>

        <Button
          size='small'
          type='text'
          icon={<EditOutlined />}
          onClick={() => onEdit(id)}
        />

        <Button
          size='small'
          type='text'
          icon={<EyeOutlined />}
          onClick={() => onDetails(id)}
        />
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

  const handleRemoveEntry = useCallback(
    async (id: number) => {
      const title = type === 'EXPENSE' ? 'Despesa' : 'Receita';

      await removeEntry(id);
      notification({
        title: 'Removido',
        description: `A ${title} foi removido com sucesso!`,
      });
    },
    [removeEntry, type],
  );

  return (
    <>
      <Table<CashFlow.EntrySummary>
        rowKey={'id'}
        dataSource={entries}
        scroll={{ x: 850 }}
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
