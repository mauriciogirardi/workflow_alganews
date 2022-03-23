import { Button, Col, Input, Form, Row, FormInstance } from 'antd';
import { Payment } from 'mauricio.girardi-sdk';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { CurrencyInput } from 'app/components/CurrencyInput';

interface PaymentFormBonusesProps {
  form: FormInstance<Payment.Input>;
}

const { Item, List } = Form;
const rules = [
  {
    required: true,
    message: 'O campo é obrigatório',
  },
];

export const PaymentFormBonuses = ({ form }: PaymentFormBonusesProps) => {
  return (
    <List name={'bonuses'}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Row gutter={24} key={field.name}>
              <Col xs={24} lg={15}>
                <Item
                  {...field}
                  label='Descrição'
                  name={[field.name, 'title']}
                  rules={rules}
                >
                  <Input placeholder='E.g.: 1 milhão de views' />
                </Item>
              </Col>

              <Col xs={24} lg={5}>
                <Item
                  {...field}
                  initialValue={0}
                  label='Valor'
                  name={[field.name, 'amount']}
                  rules={rules}
                >
                  <CurrencyInput
                    onChange={(evt, amount) => {
                      const { bonuses } = form.getFieldsValue();
                      form.setFieldsValue({
                        bonuses: bonuses?.map((bonus, index) => {
                          return index === field.name
                            ? {
                                title: bonus.title,
                                amount,
                              }
                            : bonus;
                        }),
                      });
                    }}
                  />
                </Item>
              </Col>
              <Col xs={24} lg={4}>
                <Item label='Remover'>
                  <Button
                    danger
                    type='text'
                    icon={<DeleteOutlined />}
                    onClick={() => remove(field.name)}
                  />
                </Item>
              </Col>
            </Row>
          ))}
          <Button
            type='dashed'
            block
            onClick={() => add()}
            icon={<PlusOutlined />}
          >
            Adicionar bônus
          </Button>
        </>
      )}
    </List>
  );
};
