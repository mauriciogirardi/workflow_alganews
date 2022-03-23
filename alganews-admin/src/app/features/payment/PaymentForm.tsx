import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Divider,
} from 'antd';

import { FormInstance } from 'rc-field-form';
import { useNavigate } from 'react-router-dom';
import { RangeValue } from 'rc-picker/lib/interface';
import { FieldData } from 'rc-field-form/lib/interface';
import { useUsers } from 'core/hooks/user/useUsers';
import { Payment } from 'mauricio.girardi-sdk';
import { useForm } from 'antd/lib/form/Form';
import CustomError from 'mauricio.girardi-sdk/dist/CustomError';
import debounce from 'lodash.debounce';
import moment, { Moment } from 'moment';

import { normalizeFilterOptionSearch } from 'core/utils/normalizeFilterOptionSearch';
import { useCallback, useEffect, useState } from 'react';
import { PaymentFormBonuses } from './PaymentFormBonuses';
import { PaymentPreview } from './PaymentPreview';
import { BusinessError } from 'mauricio.girardi-sdk/dist/errors';
import { notification } from 'core/utils/notification';
import { usePayment } from 'core/hooks/payment/usePayment';
import { PAYMENTS } from 'core/constants-paths';

const { RangePicker } = DatePicker;
const { Item } = Form;
const { Option } = Select;

const FORMAT = 'DD/MM/YYYY';
const style = { width: '100%' };
const rules = [
  {
    required: true,
    message: 'O campo é obrigatório',
  },
];

export const PaymentForm = () => {
  const [form] = useForm<Payment.Input>();
  const navigate = useNavigate();
  const { fetching, editors, fetchUsers } = useUsers();
  const [scheduledTo, setScheduledTo] = useState('');
  const [paymentPreviewError, setPaymentPreviewError] = useState<CustomError>();
  const {
    fetchPaymentPreview,
    fetchingPaymentPreview,
    paymentPreview,
    clearPaymentPreview,
    fetchingSchedulePayment,
    schedulePayment,
  } = usePayment();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const disabledDate = (date: Moment) => {
    return date.isBefore(moment()) || date.isAfter(moment().add(7, 'days'));
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

  const updateScheduleDate = useCallback(() => {
    const { scheduledTo } = form.getFieldsValue();
    setScheduledTo(scheduledTo);
  }, [form]);

  const clearPaymentPreviewError = useCallback(() => {
    setPaymentPreviewError(undefined);
  }, []);

  const getPaymentPreview = useCallback(async () => {
    const { accountingPeriod, payee, bonuses } = form.getFieldsValue();
    if (payee && accountingPeriod) {
      if (payee.id && accountingPeriod.endsOn && accountingPeriod.startsOn) {
        try {
          await fetchPaymentPreview({
            payee,
            accountingPeriod,
            bonuses: bonuses || [],
          });

          clearPaymentPreviewError();
        } catch (err) {
          clearPaymentPreview();

          if (err instanceof BusinessError) {
            setPaymentPreviewError(err);
          }
          throw err;
        }
      } else {
        clearPaymentPreview();
        clearPaymentPreviewError();
      }
    }
  }, [
    form,
    fetchPaymentPreview,
    clearPaymentPreview,
    clearPaymentPreviewError,
  ]);

  const handleOnFieldsChange = useCallback(
    ([field]: FieldData[]) => {
      if (Array.isArray(field?.name)) {
        if (
          field.name.includes('payee') ||
          field.name.includes('_accountingPeriod') ||
          field.name.includes('bonuses')
        ) {
          getPaymentPreview();
        }

        if (field.name.includes('scheduledTo')) {
          updateScheduleDate();
        }
      }
    },
    [getPaymentPreview, updateScheduleDate],
  );

  const handleOnFinish = useCallback(
    async (form: Payment.Input) => {
      const paymentDTO: Payment.Input = {
        accountingPeriod: form.accountingPeriod,
        payee: form.payee,
        bonuses: form.bonuses || [],
        scheduledTo: moment(form.scheduledTo).format('YYYY-MM-DD'),
      };

      await schedulePayment(paymentDTO);

      navigate(PAYMENTS);
      notification({
        title: 'Pagamento',
        description: 'O pagamento foi agendado com sucesso',
      });
    },
    [schedulePayment, navigate],
  );

  const debounceHandleFormChange = debounce(handleOnFieldsChange, 1000);

  return (
    <Form<Payment.Input>
      layout='vertical'
      form={form}
      onFinish={handleOnFinish}
      onFieldsChange={debounceHandleFormChange}
    >
      <Row gutter={[20, 0]}>
        <Col xs={24} lg={8}>
          <Item label='Editor' name={['payee', 'id']} rules={rules}>
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
          <Item hidden name={['accountingPeriod', 'startsOn']}>
            <Input hidden />
          </Item>
          <Item hidden name={['accountingPeriod', 'endsOn']}>
            <Input hidden />
          </Item>
          <Item label='Período' name={'_accountingPeriod'} rules={rules}>
            <RangePicker
              format={FORMAT}
              style={style}
              onChange={(date) => onChangeRangePicker(date, form)}
            />
          </Item>
        </Col>

        <Col xs={24} lg={8}>
          <Item label='Agendamento' name={'scheduledTo'} rules={rules}>
            <DatePicker
              format={FORMAT}
              style={style}
              disabledDate={disabledDate}
            />
          </Item>
        </Col>

        <Divider />
        <Col xs={24} lg={12}>
          <PaymentPreview
            fetchingPaymentPreview={fetchingPaymentPreview}
            paymentPreviewError={paymentPreviewError}
            paymentPreview={paymentPreview}
            scheduledTo={scheduledTo}
          />
        </Col>

        <Col xs={24} lg={12} style={{ marginTop: 15 }}>
          <PaymentFormBonuses form={form} />
        </Col>
      </Row>

      <Divider />
      <Row justify='end'>
        <Button
          htmlType='submit'
          type='primary'
          loading={fetchingSchedulePayment}
          disabled={!!paymentPreviewError}
        >
          Cadastrar um agendamento
        </Button>
      </Row>
    </Form>
  );
};
