import { useCallback, useEffect } from 'react';
import { Moment } from 'moment';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
} from 'antd';

import { useEntriesCategories } from 'core/hooks/cashFlow/useEntriesCategories';
import { CurrencyInput } from 'app/components/CurrencyInput';
import { notification } from 'core/utils/notification';
import { CashFlow } from 'mauricio.girardi-sdk';
import { useForm } from 'antd/lib/form/Form';

type FromProps = Omit<CashFlow.CategoryInput, 'transactedOn'> & {
  transactedOn: Moment;
};

interface EntryFormProps {
  onClose?: () => void;
}

const { Item } = Form;
const rules = [{ required: true, message: 'O campo  obrigatório' }];

export const EntryForm = ({ onClose }: EntryFormProps) => {
  const { revenues, expenses, isFetchingCategories, fetchCategories } =
    useEntriesCategories();
  const [form] = useForm();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onFinish = useCallback((form: FromProps) => {
    const formDTO = {
      ...form,
      transactedOn: form.transactedOn.format('YYYY-MM-DD'),
    };

    console.log(formDTO);

    notification({
      title: 'Despesa',
      description: 'A Despesa foi cadastrada com sucesso!',
    });
  }, []);

  return (
    <Form form={form} layout='vertical' onFinish={onFinish}>
      <Row gutter={[10, 10]}>
        <Col xs={24}>
          <Item label='Descrição' name='description' rules={rules}>
            <Input placeholder='E.g.: Pagamento mensal AWS' />
          </Item>
        </Col>
        <Col xs={24}>
          <Item label='Categoria' name={['category', 'id']} rules={rules}>
            <Select loading={isFetchingCategories}>
              {expenses.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
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
            <DatePicker format={'DD/MM/YYYY'} style={{ width: '100%' }} />
          </Item>
        </Col>
      </Row>
      <Divider style={{ marginTop: 0 }} />
      <Row justify='end'>
        <Space>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type='primary' htmlType='submit'>
            Cadastrar
          </Button>
        </Space>
      </Row>
    </Form>
  );
};
