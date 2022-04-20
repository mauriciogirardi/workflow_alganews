import { Fragment, useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  Tabs,
  Upload,
} from 'antd';
import { FileAddOutlined, BankOutlined, UserOutlined } from '@ant-design/icons';
import { FileService, User, UserService } from 'mauricio.girardi-sdk';
import { InternalNamePath } from 'antd/lib/form/interface';
import { Moment } from 'moment';
import CustomError from 'mauricio.girardi-sdk/dist/CustomError';
import MaskedInput from 'antd-mask-input';
import ImageCrop from 'antd-img-crop';

import { CurrencyInput } from 'app/components/CurrencyInput';
import { usePageTitle } from 'core/utils/hooks/usePageTitle';
import { notification } from 'core/utils/notification';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'core/hooks/auth/useAuth';
import { USERS } from 'core/constants-paths';

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

  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditorRole, setIsEditorRole] = useState(userEdit?.role === 'EDITOR');
  const [avatar, setAvatar] = useState(userEdit?.avatarUrls.default || '');
  const [activeTab, setActiveTab] = useState<ActiveTabProps>('personal');

  const hasAvatar = [...(avatar ? [{ name: 'avatar', uid: '' }] : [])];
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
          <Item
            label='País'
            name={['location', 'country']}
            rules={[
              {
                required: true,
                message: 'O Campo é obrigatório.',
              },
              {
                max: 50,
                message: `O país não pode ter mais de 50 caracteres`,
              },
            ]}
          >
            <Input placeholder='E.g.: Brasil' />
          </Item>
        </Col>
        <Col lg={8} xs={24}>
          <Item
            label='Estado'
            name={['location', 'state']}
            rules={[
              {
                required: true,
                message: 'O Campo é obrigatório.',
              },
            ]}
          >
            <Input placeholder='E.g.: Santa Catarina' />
          </Item>
        </Col>
        <Col lg={8} xs={24}>
          <Item
            label='Cidade'
            name={['location', 'city']}
            rules={[
              {
                required: true,
                message: 'O Campo é obrigatório.',
              },
            ]}
          >
            <Input placeholder='E.g.: São Francisco do Sul' />
          </Item>
        </Col>

        <Col lg={8} xs={24}>
          <Item
            label='Telefone'
            name='phone'
            rules={[
              {
                required: true,
                message: 'O Campo é obrigatório.',
              },
              {
                max: 20,
                message: `O telefone não pode ter mais de 20 caracteres`,
              },
            ]}
          >
            <MaskedInput
              disabled={userEdit && !userEdit.canSensitiveDataBeUpdated}
              mask={'(00) 00000-0000'}
            />
          </Item>
        </Col>
        <Col lg={8} xs={24}>
          <Item
            label='CPF'
            name='taxpayerId'
            rules={[
              {
                required: true,
                message: 'O Campo é obrigatório.',
              },
              {
                max: 14,
                message: `O CPF não pode ter mais de 14 caracteres`,
              },
            ]}
          >
            <MaskedInput mask='000.000.000-00' />
          </Item>
        </Col>
        {isEditorRole && (
          <>
            <Col lg={8} xs={24}>
              <Item
                label='Preço por palavra'
                name='pricePerWord'
                rules={[
                  {
                    required: true,
                    message: 'O campo é obrigatório',
                  },
                  {
                    type: 'number',
                    min: 0.01,
                    message: 'O valor mínimo é 1 centavo',
                  },
                ]}
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
                      rules={[
                        {
                          required: true,
                          message: 'O campo é obrigatório',
                        },
                        {
                          max: 50,
                          message: `A habilidade não pode ter mais de 50 caracteres`,
                        },
                      ]}
                    >
                      <Input placeholder='E.g.: JavaScript' />
                    </Item>
                  </Col>
                  <Col lg={2} xs={6}>
                    <Item
                      label='%'
                      name={['skills', i, 'percentage']}
                      rules={[
                        {
                          required: true,
                          message: '',
                        },
                        {
                          async validator(field, value) {
                            if (isNaN(value)) throw new Error('Apenas números');
                            if (Number(value) > 100)
                              throw new Error('Maxímo 100');
                            if (Number(value) < 0) throw new Error('Mínimo 0');
                          },
                        },
                      ]}
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
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
              {
                max: 3,
                message: `A instituição precisa ter 3 caracteres`,
              },
              {
                min: 3,
                message: `A instituição precisa ter 3 caracteres`,
              },
            ]}
          >
            <Input placeholder='E.g.: 260' />
          </Item>
        </Col>
        <Col lg={8} xs={24}>
          <Item
            label='Agência'
            name={['bankAccount', 'agency']}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
              {
                max: 10,
                message: `A agência precisa ter no máximo 10 caracteres`,
              },
              {
                min: 1,
                message: `A agência precisa ter no mínimo 1 caractere`,
              },
            ]}
          >
            <Input placeholder='E.g.: 0001' />
          </Item>
        </Col>
        <Col lg={8} xs={24}>
          <Item
            label='Conta sem dígito'
            name={['bankAccount', 'number']}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
            ]}
          >
            <Input placeholder='E.g.: 12345' />
          </Item>
        </Col>

        <Col lg={8} xs={24}>
          <Item
            label='Dígito'
            name={['bankAccount', 'digit']}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
              {
                max: 1,
                message: `O dígito precisa ser único`,
              },
            ]}
          >
            <Input placeholder='E.g.: 1' />
          </Item>
        </Col>
        <Col lg={8} xs={24}>
          <Item
            label='Tipo de conta'
            name={['bankAccount', 'type']}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
            ]}
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

  const handleAvatarUpload = useCallback(
    async (file: File) => {
      try {
        setLoadingAvatar(true);
        const avatarSource = await FileService.upload(file);
        setAvatar(avatarSource);
      } catch (err) {
        messageError(err);
      } finally {
        setLoadingAvatar(false);
      }
    },
    [messageError],
  );

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
            <ImageCrop rotate shape={'round'} grid aspect={1}>
              <Upload
                maxCount={1}
                onRemove={() => {
                  setAvatar('');
                }}
                fileList={hasAvatar}
                beforeUpload={(file) => {
                  handleAvatarUpload(file);
                  return false;
                }}
              >
                {loadingAvatar ? (
                  <Skeleton.Avatar
                    active
                    shape='circle'
                    style={{
                      width: '128px',
                      height: '128px',
                    }}
                  />
                ) : (
                  <Avatar
                    style={{ cursor: 'pointer' }}
                    icon={<UserOutlined />}
                    src={avatar}
                    size={128}
                  />
                )}
              </Upload>
            </ImageCrop>
            <Item name='avatarUrl' hidden>
              <Input hidden />
            </Item>
          </Row>
        </Col>

        <Col lg={10} xs={24}>
          <Item
            label='Nome'
            name='name'
            rules={[
              {
                required: true,
                message: 'O Campo é obrigatório.',
              },
            ]}
          >
            <Input placeholder='E.g.: John Doe' />
          </Item>

          <Item
            label='Data de nascimento'
            name='birthdate'
            rules={[
              {
                required: true,
                message: 'O Campo é obrigatório.',
              },
            ]}
          >
            <DatePicker
              placeholder='Selecione uma data'
              format={'DD/MM/YYYY'}
              style={{ width: '100%' }}
            />
          </Item>
        </Col>

        <Col lg={10} xs={24}>
          <Item
            label='Bio'
            name='bio'
            rules={[
              {
                required: true,
                message: 'O Campo é obrigatório.',
              },
              {
                max: 255,
                message: 'A biografia não pode ter mais de 255 caracteres.',
              },
              {
                min: 10,
                message: `A biografia não pode ter menos de 10 caracteres`,
              },
            ]}
          >
            <TextArea rows={5} />
          </Item>
        </Col>

        <Col lg={24} xs={24}>
          <Divider />
        </Col>

        <Col lg={12} xs={24}>
          <Item
            label='Perfil'
            name='role'
            rules={[
              {
                required: true,
                message: 'O Campo é obrigatório.',
              },
              {
                type: 'enum',
                enum: ['EDITOR', 'ASSISTANT', 'MANAGER'],
                message: `O Perfil precisar ser editor, assitente ou gerente`,
              },
            ]}
          >
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
          <Item
            label='E-mail'
            name='email'
            rules={[
              {
                required: true,
                message: 'O Campo é obrigatório.',
              },
            ]}
          >
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
