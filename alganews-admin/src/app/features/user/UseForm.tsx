import { Fragment, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Tabs,
} from 'antd';
import { FileAddOutlined, BankOutlined } from '@ant-design/icons';
import { FileService, User, UserService } from 'mauricio.girardi-sdk';
import { InternalNamePath } from 'antd/lib/form/interface';
import { Moment } from 'moment';
import CustomError from 'mauricio.girardi-sdk/dist/CustomError';
import MaskedInput from 'antd-mask-input';

import { CurrencyInput } from 'app/components/CurrencyInput';
import { usePageTitle } from 'core/utils/hooks/usePageTitle';
import { notification } from 'core/utils/notification';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'core/hooks/auth/useAuth';
import { USERS } from 'core/constants-paths';
import { UploadAvatar } from 'app/components/UploadAvatar';
import {
  ruleAgency,
  ruleBankCode,
  ruleBio,
  ruleCountry,
  ruleCPF,
  ruleDigit,
  rulePercentage,
  rulePhone,
  rulePricePerWord,
  ruleRequired,
  ruleRole,
  ruleSkills,
} from './rulesForm';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
const { Item } = Form;

interface FieldsProps<Values = any> {
  values: Values;
  errorFields: {
    name: InternalNamePath;
    errors: string[];
  }[];
  outOfDate: boolean;
}

type ActiveTabProps = 'personal' | 'bankAccount';
type UserFormType = {
  createdAt: Moment;
  updatedAt: Moment;
  birthdate: Moment;
} & Omit<User.Detailed, 'createdAt' | 'updatedAt' | 'birthdate'>;

interface UserFormProps {
  user?: UserFormType;
  onUpdate?: (user: User.Input) => Promise<any>;
}

export const UserForm = ({ user: userEdit, onUpdate }: UserFormProps) => {
  const navigate = useNavigate();
  const [form] = Form.useForm<User.Input>();

  const [loading, setLoading] = useState(false);
  const [isEditorRole, setIsEditorRole] = useState(userEdit?.role === 'EDITOR');
  const [avatar, setAvatar] = useState(userEdit?.avatarUrls.default || '');
  const [activeTab, setActiveTab] = useState<ActiveTabProps>('personal');

  const { user: userAuthenticate } = useAuth();

  const messageError = useCallback(
    (err: unknown) => {
      if (err instanceof CustomError) {
        if (err.data?.objects) {
          form.setFields(
            err.data.objects.map((error) => ({
              name: error.name
                ?.split(/(\.|\]|\[)/gi)
                .filter(
                  (str) =>
                    str !== '.' && str !== ']' && str !== '[' && str !== '',
                )
                .map((str) => (isNaN(+str) ? str : +str)) as string[],
              errors: [error.userMessage],
            })),
          );
        } else {
          notification({
            type: 'error',
            title: err.message || 'Erro',
            description:
              err.data?.detail || 'Erro desconhecido tente mais tarde.',
          });
        }
      } else {
        notification({
          type: 'error',
          title: 'Houve um error',
          description: 'Erro ao criar um usuário tente novamente.',
        });
      }
    },
    [form],
  );

  const TabPersonalForm = () => {
    return (
      <Row gutter={20}>
        <Col lg={8} xs={24}>
          <Item label='País' name={['location', 'country']} rules={ruleCountry}>
            <Input placeholder='E.g.: Brasil' />
          </Item>
        </Col>
        <Col lg={8} xs={24}>
          <Item
            label='Estado'
            name={['location', 'state']}
            rules={ruleRequired}
          >
            <Input placeholder='E.g.: Santa Catarina' />
          </Item>
        </Col>
        <Col lg={8} xs={24}>
          <Item label='Cidade' name={['location', 'city']} rules={ruleRequired}>
            <Input placeholder='E.g.: São Francisco do Sul' />
          </Item>
        </Col>

        <Col lg={8} xs={24}>
          <Item label='Telefone' name='phone' rules={rulePhone}>
            <MaskedInput
              disabled={userEdit && !userEdit.canSensitiveDataBeUpdated}
              mask={'(00) 00000-0000'}
            />
          </Item>
        </Col>
        <Col lg={8} xs={24}>
          <Item label='CPF' name='taxpayerId' rules={ruleCPF}>
            <MaskedInput mask='000.000.000-00' />
          </Item>
        </Col>
        {isEditorRole && (
          <>
            <Col lg={8} xs={24}>
              <Item
                label='Preço por palavra'
                name='pricePerWord'
                rules={rulePricePerWord}
              >
                <CurrencyInput
                  onChange={(_, value) => {
                    form.setFieldsValue({
                      pricePerWord: value,
                    });
                  }}
                />
              </Item>
            </Col>

            {Array(3)
              .fill(null)
              .map((_, i) => (
                <Fragment key={i}>
                  <Col lg={6} xs={18}>
                    <Item
                      label='Habilidade'
                      name={['skills', i, 'name']}
                      rules={ruleSkills}
                    >
                      <Input placeholder='E.g.: JavaScript' />
                    </Item>
                  </Col>
                  <Col lg={2} xs={6}>
                    <Item
                      label='%'
                      name={['skills', i, 'percentage']}
                      rules={rulePercentage}
                    >
                      <Input />
                    </Item>
                  </Col>
                </Fragment>
              ))}
          </>
        )}
      </Row>
    );
  };

  const TabBankAccountForm = () => {
    return (
      <Row gutter={20}>
        <Col lg={8} xs={24}>
          <Item
            label='Instituição'
            name={['bankAccount', 'bankCode']}
            rules={ruleBankCode}
          >
            <Input placeholder='E.g.: 260' />
          </Item>
        </Col>
        <Col lg={8} xs={24}>
          <Item
            label='Agência'
            name={['bankAccount', 'agency']}
            rules={ruleAgency}
          >
            <Input placeholder='E.g.: 0001' />
          </Item>
        </Col>
        <Col lg={8} xs={24}>
          <Item
            label='Conta sem dígito'
            name={['bankAccount', 'number']}
            rules={ruleRequired}
          >
            <Input placeholder='E.g.: 12345' />
          </Item>
        </Col>

        <Col lg={8} xs={24}>
          <Item
            label='Dígito'
            name={['bankAccount', 'digit']}
            rules={ruleDigit}
          >
            <Input placeholder='E.g.: 1' />
          </Item>
        </Col>
        <Col lg={8} xs={24}>
          <Item
            label='Tipo de conta'
            name={['bankAccount', 'type']}
            rules={ruleRequired}
          >
            <Select placeholder='Selecione o tipo de conta'>
              <Option value='SAVING'>Conta poupança</Option>
              <Option value='CHECKING'>Conta corrente</Option>
            </Select>
          </Item>
        </Col>
      </Row>
    );
  };

  const handleAvatarUpload = useCallback(async (file: File) => {
    const avatarSource = await FileService.upload(file);
    setAvatar(avatarSource);
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      avatarUrl: avatar || undefined,
    });
  }, [avatar, form]);

  const onFinishFailed = (fields: FieldsProps) => {
    let bankAccountErrors = 0;
    let personalDataErrors = 0;

    fields.errorFields.forEach(({ name }) => {
      if (name.includes('bankAccount')) {
        bankAccountErrors++;
      }

      if (
        name.includes('location') ||
        name.includes('skills') ||
        name.includes('phone') ||
        name.includes('taxpayerId') ||
        name.includes('pricePerWord')
      ) {
        personalDataErrors++;
      }
    });

    if (bankAccountErrors > personalDataErrors) {
      setActiveTab('bankAccount');
    }

    if (personalDataErrors > bankAccountErrors) {
      setActiveTab('personal');
    }
  };

  const onFinish = async (user: User.Input) => {
    setLoading(true);
    const userDTO: User.Input = {
      ...user,
      taxpayerId: user.taxpayerId.replace(/\D/g, ''),
      phone: user.phone.replace(/\D/g, ''),
    };

    if (userEdit) {
      return onUpdate && onUpdate(userDTO).finally(() => setLoading(false));
    }

    try {
      await UserService.insertNewUser(userDTO);
      navigate(USERS);
      notification({
        title: 'Sucesso',
        description: 'Usuário criado com sucesso.',
      });
    } catch (err) {
      messageError(err);
    } finally {
      setLoading(false);
    }
  };

  usePageTitle(userEdit ? 'Editar usuário' : 'Criar usuário');
  return (
    <Form
      form={form}
      autoComplete={'off'}
      onFinishFailed={onFinishFailed}
      onFinish={onFinish}
      layout='vertical'
      initialValues={userEdit}
    >
      <Row gutter={24} align='middle'>
        <Col lg={4} xs={24}>
          <Row justify='center'>
            <UploadAvatar
              handleAvatarUpload={handleAvatarUpload}
              avatar={avatar}
              setAvatar={setAvatar}
            />
          </Row>
        </Col>

        <Col lg={10} xs={24}>
          <Item label='Nome' name='name' rules={ruleRequired}>
            <Input placeholder='E.g.: John Doe' />
          </Item>

          <Item
            label='Data de nascimento'
            name='birthdate'
            rules={ruleRequired}
          >
            <DatePicker
              placeholder='Selecione uma data'
              format={'DD/MM/YYYY'}
              style={{ width: '100%' }}
            />
          </Item>
        </Col>

        <Col lg={10} xs={24}>
          <Item label='Bio' name='bio' rules={ruleBio}>
            <TextArea rows={5} />
          </Item>
        </Col>

        <Col lg={24} xs={24}>
          <Divider />
        </Col>

        <Col lg={12} xs={24}>
          <Item label='Perfil' name='role' rules={ruleRole}>
            <Select
              placeholder='Selecione um perfil'
              disabled={userEdit && !userEdit.canSensitiveDataBeUpdated}
              onChange={(value) => setIsEditorRole(value === 'EDITOR')}
            >
              <Option value='EDITOR'>Editor</Option>
              <Option value='ASSISTANT'>Assistente</Option>
              <Option
                disabled={userAuthenticate?.role !== 'MANAGER'}
                value='MANAGER'
              >
                Gerente
              </Option>
            </Select>
          </Item>
        </Col>

        <Col lg={12} xs={24}>
          <Item label='E-mail' name='email' rules={ruleRequired}>
            <Input
              type='email'
              disabled={userEdit && !userEdit.canSensitiveDataBeUpdated}
              placeholder='E.g.: John@Doe.com'
            />
          </Item>
        </Col>

        <Col lg={24}>
          <Tabs
            defaultActiveKey='personal'
            activeKey={activeTab}
            onChange={(tab) => setActiveTab(tab as ActiveTabProps)}
          >
            <TabPane
              key='personal'
              tab={
                <span>
                  <FileAddOutlined />
                  Dados Pessoais
                </span>
              }
            >
              <TabPersonalForm />
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
              <TabBankAccountForm />
            </TabPane>
          </Tabs>
        </Col>

        <Col lg={24} xs={24}>
          <Divider />
        </Col>

        <Col lg={24} xs={24} style={{ padding: '0 25px' }}>
          <Row justify={'end'} gutter={24}>
            <Col>
              {userEdit && (
                <Button onClick={() => navigate(-1)}>Cancelar</Button>
              )}
            </Col>
            <Button type='primary' htmlType='submit' loading={loading}>
              {`${userEdit ? 'Editar' : 'Cadastrar'} usuário`}
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
