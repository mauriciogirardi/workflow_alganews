import { Button, Divider, Row, Space, Tooltip, Typography } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';

import { EntryList } from 'app/features/cashFlow/EntryList';
import { useCashFlow } from 'core/hooks/cashFlow/useCashFlow';
import { DoubleConfirm } from 'app/components/DoubleConfirm';
import { notification } from 'core/utils/notification';

const { Title, Text } = Typography;

export default function CashFlowExpensesPage() {
  const { selected, removeEntriesInBatch } = useCashFlow('EXPENSE');

  const handleDeleteEntriesInBatch = async (ids: number[]) => {
    await removeEntriesInBatch(ids);
    notification({
      title: 'Deletar',
      description:
        selected.length === 1
          ? 'A entrada selecionada foi removida com sucesso.'
          : 'As entradas selecionadas foram removidas com sucesso',
    });
  };

  return (
    <>
      <Space direction='vertical'>
        <Title level={3}>Recuperando entradas do mês de agosto</Title>
        <Space>
          <Text>É possível filtrar lançamentos por mês</Text>
          <Tooltip placement='right' title='Use a coluna Data para filtrar'>
            <InfoCircleFilled />
          </Tooltip>
        </Space>
      </Space>

      <Divider />
      <Row>
        <DoubleConfirm
          onConfirmContent='Remover uma ou mais entradas pode gerar impacto negativo no gráfico de receitas e despesas da empresa. Esta ação é irreversível.'
          onConfirmTitle={`Remover ${
            selected.length > 1 ? 'entradas ' : 'entrada '
          }`}
          popConfirmTitle={`Remover ${
            selected.length > 1
              ? 'entradas selecionadas'
              : 'entrada selecionada'
          }`}
          disabled={selected.length === 0}
          okText='Sim'
          onOk={() => handleDeleteEntriesInBatch(selected as number[])}
        >
          <Button disabled={!selected.length} type='primary'>
            Remover
          </Button>
        </DoubleConfirm>
      </Row>

      <EntryList />
    </>
  );
}
