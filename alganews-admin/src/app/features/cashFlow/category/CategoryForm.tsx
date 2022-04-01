import { Button, Col, Form, Input, Row } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useEntriesCategories } from 'core/hooks/cashFlow/useEntriesCategories';
import { useCallback, useEffect } from 'react';
import { CashFlow } from 'mauricio.girardi-sdk';
import { notification } from 'core/utils/notification';

interface CategoryFormProps {
  onSuccess?: () => void;
}

const { Item } = Form;

export const CategoryForm = ({ onSuccess }: CategoryFormProps) => {
  const { createCategory, isFetchingCategories, fetchCategories } =
    useEntriesCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onFinish = useCallback(
    async (category: CashFlow.CategoryInput) => {
      const newCategoryDTO: CashFlow.CategoryInput = {
        ...category,
        type: 'EXPENSE',
      };

      await createCategory(newCategoryDTO);
      onSuccess && onSuccess();
      notification({
        title: 'Categoria',
        description: 'A categoria foi salva com sucesso!',
      });
    },
    [createCategory, onSuccess],
  );

  return (
    <Form layout='vertical' onFinish={onFinish}>
      <Row justify='end'>
        <Col xs={24}>
          <Item
            label='Categoria'
            name='name'
            rules={[
              { required: true, message: 'O nome da categoria é obrigatório!' },
            ]}
          >
            <Input placeholder='E.g.: Infra' />
          </Item>
        </Col>
        <Button
          loading={isFetchingCategories}
          type='primary'
          htmlType='submit'
          icon={<CheckCircleOutlined />}
        >
          Cadastrar categoria
        </Button>
      </Row>
    </Form>
  );
};
