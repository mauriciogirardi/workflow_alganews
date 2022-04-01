import { Button, Col, Modal, Popconfirm, Row, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { CashFlow } from 'mauricio.girardi-sdk';

import { useEntriesCategories } from 'core/hooks/cashFlow/useEntriesCategories';
import { CategoryForm } from './CategoryForm';
import { notification } from 'core/utils/notification';

interface EntryCategoryManagerProps {
  type: 'EXPENSE' | 'REVENUES';
}

export const EntryCategoryManager = ({ type }: EntryCategoryManagerProps) => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const {
    expenses,
    revenues,
    deleteCategory,
    fetchCategories,
    isFetchingCategories,
  } = useEntriesCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleShowCategoryForm = () => {
    setShowCategoryForm((prevState) => !prevState);
  };

  const handleRemoveCategory = async (categoryId: number) => {
    await deleteCategory(categoryId);
    notification({
      title: 'Categoria',
      description: 'Categoria removida com sucesso!',
    });
  };

  const renderActions = (
    categoryId: number,
    record: CashFlow.CategorySummary,
  ) => {
    const { canBeDeleted } = record;

    return (
      <Popconfirm
        title='Remover categoria'
        okText='Sim'
        cancelText='Não'
        onConfirm={() => handleRemoveCategory(categoryId)}
        disabled={!canBeDeleted}
      >
        <Tooltip
          placement='right'
          title={
            !canBeDeleted
              ? 'Você não pode remover uma categoria com vínculos!'
              : ''
          }
        >
          <Button
            disabled={!canBeDeleted}
            type='text'
            danger
            size='small'
            icon={<DeleteOutlined />}
          />
        </Tooltip>
      </Popconfirm>
    );
  };

  return (
    <>
      <Modal
        key='RegisterCategory'
        visible={showCategoryForm}
        onCancel={handleShowCategoryForm}
        title='Cadastrar uma categoria'
        footer={null}
        destroyOnClose
      >
        <CategoryForm onSuccess={handleShowCategoryForm} />
      </Modal>

      <Row align='middle' justify='space-between' style={{ marginBottom: 16 }}>
        <Col>
          <Button size='small' type='primary' onClick={() => fetchCategories()}>
            Atualizar Categorias
          </Button>
        </Col>
        <Col>
          <Button size='small' type='primary' onClick={handleShowCategoryForm}>
            Cadastrar categoria
          </Button>
        </Col>
      </Row>

      <Table<CashFlow.CategorySummary>
        rowKey={'id'}
        size='small'
        dataSource={type === 'EXPENSE' ? expenses : revenues}
        loading={isFetchingCategories}
        columns={[
          {
            dataIndex: 'name',
            title: 'Descrição',
            ellipsis: true,
            width: 180,
            render(name: string) {
              return (
                <Tooltip title={name} placement='right'>
                  {name}
                </Tooltip>
              );
            },
          },
          {
            dataIndex: 'totalEntries',
            title: 'Vínculos',
            align: 'center',
          },
          {
            dataIndex: 'id',
            title: 'Ação',
            align: 'right',
            render: renderActions,
          },
        ]}
      />
    </>
  );
};
