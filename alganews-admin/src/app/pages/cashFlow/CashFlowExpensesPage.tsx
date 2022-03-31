import { Button, Divider, Modal, Row, Space, Tooltip, Typography } from 'antd';
import { InfoCircleFilled, TagOutlined } from '@ant-design/icons';

import { EntryList } from 'app/features/cashFlow/EntryList';
import { useCashFlow } from 'core/hooks/cashFlow/useCashFlow';
import { DoubleConfirm } from 'app/components/DoubleConfirm';
import { notification } from 'core/utils/notification';
import { useCallback, useState } from 'react';
import { EntryCategoryManager } from 'app/features/cashFlow/category/EntryCategoryManager';

const { Title, Text } = Typography;

export default function CashFlowExpensesPage() {
  const { selected, removeEntriesInBatch } = useCashFlow('EXPENSE');
  const [shoeCategoryModal, setShowCategoryModal] = useState(false);

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

  const handleCategoryModal = useCallback(
    () => setShowCategoryModal((prevState) => !prevState),
    [],
  );

  return (
    <>
      <Modal
        key='categories'
        visible={shoeCategoryModal}
        onCancel={handleCategoryModal}
        title='Categoria'
        footer={null}
      >
        <EntryCategoryManager type={'EXPENSE'} />
      </Modal>

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
      <Row justify='space-between' align='middle' style={{ marginBottom: 16 }}>
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

        <Button
          type='primary'
          icon={<TagOutlined />}
          onClick={handleCategoryModal}
        >
          Categorias
        </Button>
      </Row>

      <EntryList />
    </>
  );
}
