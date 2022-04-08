import { useCallback, useEffect, useMemo, useState } from 'react';
import moment, { Moment } from 'moment';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  Space,
} from 'antd';

import { useEntriesCategories } from 'core/hooks/cashFlow/useEntriesCategories';
import { CurrencyInput } from 'app/components/CurrencyInput';
import { notification } from 'core/utils/notification';
import { CashFlow } from 'mauricio.girardi-sdk';
import { useForm } from 'antd/lib/form/Form';
import { useCashFlow } from 'core/hooks/cashFlow/useCashFlow';
import { CashFlowService } from 'danielbonifacio-sdk';

type FromProps = Omit<CashFlow.EntryInput, 'transactedOn'> & {
  transactedOn: Moment;
};

interface EntryFormProps {
  onClose?: () => void;
  type: 'EXPENSE' | 'REVENUE';
  editingEntry?: number;
}

const { Item } = Form;
const rules = [{ required: true, message: 'O campo  obrigatório' }];

export const EntryForm = ({ onClose, type, editingEntry }: EntryFormProps) => {
  const [loading, setLoading] = useState(false);
  const { createEntry, isFetchingEntries, updateEntry } = useCashFlow(type);
  const { revenues, expenses, isFetchingCategories, fetchCategories } =
    useEntriesCategories();
  const [form] = useForm();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (editingEntry) {
      setLoading(true);
      CashFlowService.getExistingEntry(editingEntry)
        .then((entry) => ({
          ...entry,
          transactedOn: moment(entry.transactedOn),
        }))
        .then(form.setFieldsValue)
        .finally(() => setLoading(false));
    }
  }, [editingEntry, form.setFieldsValue]);

  const categories = useMemo(
    () => (type === 'EXPENSE' ? expenses : revenues),
    [type, expenses, revenues],
  );

  const renderCategoryOptions = useCallback(() => {
    return (
      <Select loading={isFetchingCategories}>
        {categories.map((category) => (
          <Select.Option key={category.id} value={category.id}>
            {category.name}
          </Select.Option>
        ))}
      </Select>
    );
  }, [categories, isFetchingCategories]);

  const onFinish = useCallback(
    async (form: FromProps) => {
      const entryDTO: CashFlow.EntryInput = {
        ...form,
        transactedOn: form.transactedOn.format('YYYY-MM-DD'),
        type,
      };

      const title = type === 'EXPENSE' ? 'Despesa' : 'Receita';
      const text = editingEntry ? 'editado' : 'cadastrada';

      editingEntry
        ? await updateEntry(editingEntry, entryDTO)
        : await createEntry(entryDTO);

      notification({
        title,
        description: `A ${title} foi ${text} com sucesso!`,
      });

      onClose && onClose();
    },
    [type, createEntry, onClose, editingEntry, updateEntry],
  );

  if (loading) {
    return (
      <>
        <Skeleton />
        <Skeleton title={false} />
        <Skeleton title={false} />
      </>
    );
  }

  return (
    <Form form={form} layout='vertical' onFinish={onFinish}>
      <Row gutter={10}>
        <Col xs={24}>
          <Item label='Descrição' name='description' rules={rules}>
            <Input placeholder='E.g.: Pagamento mensal AWS' />
          </Item>
        </Col>
        <Col xs={24}>
          <Item label='Categoria' name={['category', 'id']} rules={rules}>
            {renderCategoryOptions()}
          </Item>
        </Col>

        <Col xs={24} lg={12}>
          <Item label='Montante' name='amount' rules={rules}>
            <CurrencyInput
              onChange={(_, value) =>
                form.setFieldsValue({
                  amount: value,
                })
              }
            />
          </Item>
        </Col>
        <Col xs={24} lg={12}>
          <Item label='Data de entrada' name='transactedOn' rules={rules}>
            <DatePicker
              format={'DD/MM/YYYY'}
              style={{ width: '100%' }}
              disabledDate={(date) => date.isAfter(moment())}
            />
          </Item>
        </Col>
      </Row>
      <Divider style={{ marginTop: 0 }} />
      <Row justify='end'>
        <Space>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type='primary' htmlType='submit' loading={isFetchingEntries}>
            {editingEntry ? 'Editar' : 'Cadastrar'}
          </Button>
        </Space>
      </Row>
    </Form>
  );
};
