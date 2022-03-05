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
import {
  FileAddOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { Fragment } from 'react';
import { UploadAvatar } from 'app/components/UploadAvatar';

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const rule = [
  {
    required: true,
    message: 'O Campo é obrigatório.',
  },
];

export const UserForm = () => {
  const TabPersonalForm = () => {
    return (
      <Row gutter={20}>
        <Col lg={8}>
          <Item
            label='País'
            name={['location', 'country']}
            rules={rule}
          >
            <Input placeholder='E.g.: Brasil' />
          </Item>
        </Col>
        <Col lg={8}>
          <Item
            label='Estado'
            name={['location', 'state']}
            rules={rule}
          >
            <Input placeholder='E.g.: Santa Catarina' />
          </Item>
        </Col>
        <Col lg={8}>
          <Item
            label='Cidade'
            name={['location', 'city']}
            rules={rule}
          >
            <Input placeholder='E.g.: São Francisco do Sul' />
          </Item>
        </Col>

        <Col lg={8}>
          <Item label='Telefone' name='phone' rules={rule}>
            <Input placeholder='E.g.: (47) 99999-0000' />
          </Item>
        </Col>
        <Col lg={8}>
          <Item label='CPF' name='taxpayerId' rules={rule}>
            <Input placeholder='E.g.: 111.222.333-44' />
          </Item>
        </Col>
        <Col lg={8}>
          <Item
            label='Preço por palavra'
            name='pricePerWord'
            rules={rule}
          >
            <Input placeholder='E.g.: 0' />
          </Item>
        </Col>

        {Array(3)
          .fill(null)
          .map((_, i) => (
            <Fragment key={i}>
              <Col lg={6}>
                <Item
                  label='Habilidade'
                  name={['skills', i, 'name']}
                  rules={rule}
                >
                  <Input placeholder='E.g.: JavaScript' />
                </Item>
              </Col>
              <Col lg={2}>
                <Item
                  label='%'
                  name={['skills', i, 'percenter']}
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                >
                  <Input />
                </Item>
              </Col>
            </Fragment>
          ))}
      </Row>
    );
  };

  const TabBankAccountForm = () => {
    return (
      <Row gutter={20}>
        <Col lg={8}>
          <Item
            label='Instituição'
            name={['bankAccount', 'bankCode']}
            rules={rule}
          >
            <Input placeholder='E.g.: 260' />
          </Item>
        </Col>
        <Col lg={8}>
          <Item
            label='Agência'
            name={['bankAccount', 'agency']}
            rules={rule}
          >
            <Input placeholder='E.g.: 0001' />
          </Item>
        </Col>
        <Col lg={8}>
          <Item
            label='Conta sem dígito'
            name={['bankAccount', 'number']}
            rules={rule}
          >
            <Input placeholder='E.g.: 12345' />
          </Item>
        </Col>

        <Col lg={8}>
          <Item
            label='Dígito'
            name={['bankAccount', 'digit']}
            rules={rule}
          >
            <Input placeholder='E.g.: 1' />
          </Item>
        </Col>
        <Col lg={8}>
          <Item
            label='Tipo de conta'
            name={['bankAccount', 'type']}
            rules={rule}
          >
            <Select placeholder='Selecione o tipo de conta'>
              <Option value='SAVING'>Conta poupança</Option>
              <Option value='CHECKING'>
                Conta corrente
              </Option>
            </Select>
          </Item>
        </Col>
      </Row>
    );
  };

  return (
    <Form
      layout='vertical'
      onFinish={(form) => {
        console.log(form);
      }}
    >
      <Row gutter={24} align='middle'>
        <Col lg={4}>
          <Item name='avatarUrl'>
            <UploadAvatar />
          </Item>
        </Col>

        <Col lg={10}>
          <Item label='Nome' name='name' rules={rule}>
            <Input placeholder='E.g.: John Doe' />
          </Item>

          <Item
            label='Data de nascimento'
            name='birthdate'
            rules={rule}
          >
            <DatePicker
              placeholder='Selecione uma data'
              format={'DD/MM/YYYY'}
              style={{ width: '100%' }}
            />
          </Item>
        </Col>

        <Col lg={10}>
          <Item label='Bio' name='bio' rules={rule}>
            <TextArea rows={5} />
          </Item>
        </Col>

        <Col lg={24}>
          <Divider />
        </Col>

        <Col lg={12}>
          <Item label='Perfil' name='role' rules={rule}>
            <Select placeholder='Selecione um perfil'>
              <Option value='EDITOR'>Editor</Option>
              <Option value='ASSISTANT'>Assistente</Option>
              <Option value='MANAGER'>Gerente</Option>
            </Select>
          </Item>
        </Col>

        <Col lg={12}>
          <Item label='E-mail' name='email' rules={rule}>
            <Input
              type='email'
              placeholder='E.g.: John@Doe.com'
            />
          </Item>
        </Col>

        <Col lg={24}>
          <Tabs defaultActiveKey='1'>
            <TabPane
              key='1'
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
              key='2'
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

        <Col lg={24}>
          <Row justify='end'>
            <Button type='primary' htmlType='submit'>
              Cadastrar usuário
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
