import { Button, Divider, Modal, Row, Space, Tooltip, Typography } from 'antd';
import { useCallback, useState } from 'react';
import {
  InfoCircleFilled,
  TagOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import { EntryCategoryManager } from 'app/features/cashFlow/category/EntryCategoryManager';
import { DoubleConfirm } from 'app/components/DoubleConfirm';
import { notification } from 'core/utils/notification';
import { useCashFlow } from 'core/hooks/cashFlow/useCashFlow';
import { EntryList } from 'app/features/cashFlow/EntryList';
import { EntryForm } from 'app/features/cashFlow/EntryForm';

const { Title, Text } = Typography;

export default function CashFlowExpensesPage() {
  const { selected, removeEntriesInBatch } = useCashFlow('EXPENSE');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showEntryFormModal, setShowEntryFormModal] = useState(false);

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

  const handleEntryFormModal = useCallback(
    () => setShowEntryFormModal((prevState) => !prevState),
    [],
  );

  return (
    <>
      <Modal
        key='categories'
        visible={showCategoryModal}
        onCancel={handleCategoryModal}
        title='CATEGORIA'
        footer={null}
        destroyOnClose
      >
        <EntryCategoryManager type={'EXPENSE'} />
      </Modal>

      <Modal
        key='entryForm'
        visible={showEntryFormModal}
        onCancel={handleEntryFormModal}
        title='CADASTRAR DESPESA'
        footer={null}
        destroyOnClose
      >
        <EntryForm onClose={handleEntryFormModal} />
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
      <Row
        gutter={[20, 20]}
        justify='space-between'
        align='middle'
        style={{ marginBottom: 16 }}
      >
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
            {`Remover ${selected.length}`}
          </Button>
        </DoubleConfirm>

        <Space>
          <Button
            type='primary'
            icon={<TagOutlined />}
            onClick={handleCategoryModal}
          >
            Categorias
          </Button>

          <Button
            type='primary'
            icon={<PlusCircleOutlined />}
            onClick={handleEntryFormModal}
          >
            Adicionar despesa
          </Button>
        </Space>
      </Row>

      <EntryList />
    </>
  );
}
