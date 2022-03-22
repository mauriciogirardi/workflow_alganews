import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Divider,
  Descriptions,
  Tabs,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  FileAddOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { FormInstance } from 'rc-field-form';
import { RangeValue } from 'rc-picker/lib/interface';
import { FieldData } from 'rc-field-form/lib/interface';
import { useUsers } from 'core/hooks/user/useUsers';
import { Payment } from 'mauricio.girardi-sdk';
import { useForm } from 'antd/lib/form/Form';
import debounce from 'lodash.debounce';
import moment, { Moment } from 'moment';

import { normalizeFilterOptionSearch } from 'core/utils/normalizeFilterOptionSearch';
import { CurrencyInput } from '../../components/CurrencyInput';
import { useCallback } from 'react';

const { RangePicker } = DatePicker;
const { Item, List } = Form;
const { Option } = Select;
const { TabPane } = Tabs;

const FORMAT = 'DD/MM/YYYY';
const style = { width: '100%' };

export const PaymentForm = () => {
  const [form] = useForm<Payment.Input>();
  const { fetching, editors } = useUsers();

  const disabledDate = (date: Moment) => {
    return (
      date.isBefore(moment()) ||
      date.isAfter(moment().add(7, 'days'))
    );
  };

  const onChangeRangePicker = (
    date: RangeValue<Moment>,
    form: FormInstance<Payment.Input>,
  ) => {
    if (date !== null) {
      const [startsOn, endsOn] = date as Moment[];
      form.setFieldsValue({
        accountingPeriod: {
          startsOn: startsOn.format('YYYY-MM-DD'),
          endsOn: endsOn.format('YYYY-MM-DD'),
        },
      });
    } else {
      form.setFieldsValue({
        accountingPeriod: {
          startsOn: undefined,
          endsOn: undefined,
        },
      });
    }
  };

  const renderListBonuses = (
    form: FormInstance<Payment.Input>,
  ) => {
    return (
      <List name={'bonuses'}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Row gutter={24} key={field.key}>
                <Col xs={24} lg={15}>
                  <Item
                    {...field}
                    label='Descrição'
                    name={[field.name, 'title']}
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
                  >
                    <CurrencyInput
                      onChange={(evt, amount) => {
                        const { bonuses } =
                          form.getFieldsValue();
                        form.setFieldsValue({
                          bonuses: bonuses?.map(
                            (bonus, index) => {
                              return index === field.name
                                ? {
                                    title: bonus.title,
                                    amount,
                                  }
                                : bonus;
                            },
                          ),
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

  const TabBackAccount = () => {
    return (
      <Descriptions
        column={1}
        bordered
        size='small'
        labelStyle={{ width: 160 }}
      >
        <Descriptions.Item label='Código do Banco'>
          341
        </Descriptions.Item>
        <Descriptions.Item label='Número da conta'>
          1205698
        </Descriptions.Item>
        <Descriptions.Item label='Dígito da conta'>
          5
        </Descriptions.Item>
        <Descriptions.Item label='Agência'>
          0001
        </Descriptions.Item>
        <Descriptions.Item label='Tipo de conta'>
          Conta Corrente
        </Descriptions.Item>
      </Descriptions>
    );
  };

  const TabDemonstrative = () => {
    return (
      <Descriptions
        column={1}
        bordered
        size='small'
        labelStyle={{ width: 160 }}
      >
        <Descriptions.Item label='Editor'>
          Mauricio Girardi
        </Descriptions.Item>
        <Descriptions.Item label='Período'>
          20/05/2022 até 30/01/2023
        </Descriptions.Item>
        <Descriptions.Item label='Agendamento'>
          30/01/2023
        </Descriptions.Item>
        <Descriptions.Item label='Palavras'>
          322
        </Descriptions.Item>
        {[1, 2, 3].map((bonus) => (
          <Descriptions.Item
            key={bonus}
            label={`Bônus ${bonus}`}
          >
            R$ 25.356,22
          </Descriptions.Item>
        ))}
        <Descriptions.Item label='Ganhos'>
          R$ 25.356,22
        </Descriptions.Item>
      </Descriptions>
    );
  };

  const handleOnFieldsChange = useCallback(
    ([field]: FieldData[]) => {
      if (Array.isArray(field.name)) {
        if (
          field.name.includes('payee') ||
          field.name.includes('_accountPeriod') ||
          field.name.includes('bonuses')
        ) {
          console.log('é necessário atualizar!');
        }
      }
    },
    [],
  );

  const handleOnFinish = useCallback(
    (form: Payment.Input) => {
      console.log(form);
    },
    [],
  );

  const debounceHandleFormChange = debounce(
    handleOnFieldsChange,
    1000,
  );

  return (
    <Form<Payment.Input>
      layout='vertical'
      form={form}
      onFinish={handleOnFinish}
      onFieldsChange={debounceHandleFormChange}
    >
      <Row gutter={[20, 0]}>
        <Col xs={24} lg={8}>
          <Item label='Editor' name={['payee', 'id']}>
            <Select
              showSearch
              loading={fetching}
              filterOption={normalizeFilterOptionSearch}
            >
              {editors.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Item>
        </Col>

        <Col xs={24} lg={8}>
          <Item
            hidden
            name={['accountingPeriod', 'startsOn']}
          >
            <Input hidden />
          </Item>
          <Item
            hidden
            name={['accountingPeriod', 'endsOn']}
          >
            <Input hidden />
          </Item>
          <Item label='Período' name={'_accountingPeriod'}>
            <RangePicker
              format={FORMAT}
              style={style}
              onChange={(date) =>
                onChangeRangePicker(date, form)
              }
            />
          </Item>
        </Col>

        <Col xs={24} lg={8}>
          <Item label='Agendamento' name={'scheduledTo'}>
            <DatePicker
              format={FORMAT}
              style={style}
              disabledDate={disabledDate}
            />
          </Item>
        </Col>

        <Divider />
        <Col xs={24} lg={12}>
          <Tabs defaultActiveKey='demonstrativo'>
            <TabPane
              key='personal'
              tab={
                <span>
                  <FileAddOutlined />
                  demonstrativo
                </span>
              }
            >
              <TabDemonstrative />
            </TabPane>
            <TabPane
              forceRender
              key='bankAccount'
              tab={
                <span>
                  <BankOutlined />
                  Dados bancários
                </span>
              }
            >
              <TabBackAccount />
            </TabPane>
          </Tabs>
        </Col>

        <Col xs={24} lg={12} style={{ marginTop: 15 }}>
          {renderListBonuses(form)}
        </Col>
      </Row>

      <Divider />
      <Row justify='end'>
        <Button htmlType='submit' type='primary'>
          Enviar
        </Button>
      </Row>
    </Form>
  );
};
