import { Button, Divider, Modal, Row, Space, Tooltip, Typography } from 'antd';
import { useCallback, useState } from 'react';
import {
  InfoCircleFilled,
  TagOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import {
  msgConfirmTitle,
  msgDescriptionRemove,
  msgConfirmContent,
  msgTitleCrud,
  msgTitleDetailsModal,
  msgTitleFormModal,
} from '../utils/funcMsgsEntryCrud';
import { EntryCategoryManager } from 'app/features/cashFlow/category/EntryCategoryManager';
import { DoubleConfirm } from 'app/components/DoubleConfirm';
import { notification } from 'core/utils/notification';
import { useCashFlow } from 'core/hooks/cashFlow/useCashFlow';
import { EntryList } from 'app/features/cashFlow/EntryList';
import { EntryForm } from 'app/features/cashFlow/EntryForm';
import { EntryDetails } from 'app/features/cashFlow/EntryDetails';

const { Title, Text } = Typography;

interface EntryCRUDProps {
  type: 'REVENUE' | 'EXPENSE';
}

export default function EntryCRUD({ type }: EntryCRUDProps) {
  const { selected, removeEntriesInBatch, query } = useCashFlow(type);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showEntryFormModal, setShowEntryFormModal] = useState(false);
  const [showEntryDetails, setShowEntryDetails] = useState(false);
  const [editingEntry, setEditingEntry] = useState<number | undefined>(
    undefined,
  );

  const [detailsEntry, setDetailsEntry] = useState<number | undefined>(
    undefined,
  );

  const entryName = type === 'EXPENSE' ? 'despesa' : 'receita';

  const handleDeleteEntriesInBatch = async (ids: number[]) => {
    const isBatch = selected.length === 1;
    await removeEntriesInBatch(ids);
    notification({
      title: 'Deletar',
      description: msgDescriptionRemove(isBatch, entryName),
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

  const handleEntryDetailsModal = useCallback(
    () => setShowEntryDetails((prevState) => !prevState),
    [],
  );

  const handleEditing = useCallback(
    (id: number) => {
      handleEntryFormModal();
      setEditingEntry(id);
    },
    [handleEntryFormModal],
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
        <EntryCategoryManager type={type} />
      </Modal>

      <Modal
        key='entryForm'
        visible={showEntryFormModal}
        title={msgTitleFormModal(!!editingEntry, entryName)}
        destroyOnClose
        footer={null}
        onCancel={() => {
          handleEntryFormModal();
          setEditingEntry(undefined);
        }}
      >
        <EntryForm
          onClose={() => {
            handleEntryFormModal();
            setEditingEntry(undefined);
          }}
          type={type}
          editingEntry={editingEntry}
        />
      </Modal>

      <Modal
        key='entryDetails'
        visible={showEntryDetails}
        onCancel={handleEntryDetailsModal}
        title={msgTitleDetailsModal(entryName)}
        footer={null}
        destroyOnClose
      >
        {detailsEntry && <EntryDetails entryId={detailsEntry} />}
      </Modal>

      <Space direction='vertical'>
        <Title level={3}>{msgTitleCrud(entryName, query.yearMonth)}</Title>
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
          onConfirmContent={msgConfirmContent(entryName)}
          onConfirmTitle={msgConfirmTitle(selected.length > 1, entryName)}
          popConfirmTitle={msgConfirmTitle(
            selected.length > 1,
            entryName,
            true,
          )}
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
            {`Adicionar ${entryName}`}
          </Button>
        </Space>
      </Row>

      <EntryList
        onEdit={handleEditing}
        onDetails={(id: number) => {
          setDetailsEntry(id);
          handleEntryDetailsModal();
        }}
        type={type}
      />
    </>
  );
}
