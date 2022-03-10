import { Fragment } from 'react';
import {
  Col,
  Divider,
  Form,
  Row,
  Skeleton,
  Tabs,
} from 'antd';
import {
  FileAddOutlined,
  BankOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Item } = Form;
const { Avatar } = Skeleton;

export const UseFormSkeleton = () => {
  return (
    <Form layout='vertical'>
      <Row gutter={24} align='middle'>
        <Col lg={4}>
          <Avatar
            active
            shape='circle'
            style={{ width: 128, height: 128 }}
          />
        </Col>

        <Col lg={10}>
          <Item label='Nome'>
            <Skeleton.Button active block />
          </Item>

          <Item label='E-mail'>
            <Skeleton.Button active block />
          </Item>
        </Col>

        <Col lg={10}>
          <Item label='Bio'>
            <Skeleton.Button
              active
              block
              size='large'
              style={{ height: 120 }}
            />
          </Item>
        </Col>

        <Col lg={24}>
          <Divider />
        </Col>

        <Col lg={12}>
          <Item label='Perfil'>
            <Skeleton.Button active block />
          </Item>
        </Col>

        <Col lg={12}>
          <Item label='E-mail'>
            <Skeleton.Button active block />
          </Item>
        </Col>

        <Col lg={24}>
          <Tabs defaultActiveKey='personal'>
            <TabPane
              key='personal'
              tab={
                <span>
                  <FileAddOutlined />
                  Dados Pessoais
                </span>
              }
            >
              <Row gutter={20}>
                <Col lg={8}>
                  <Item label='País'>
                    <Skeleton.Button active block />
                  </Item>
                </Col>
                <Col lg={8}>
                  <Item label='Estado'>
                    <Skeleton.Button active block />
                  </Item>
                </Col>
                <Col lg={8}>
                  <Item label='Cidade'>
                    <Skeleton.Button active block />
                  </Item>
                </Col>

                <Col lg={8}>
                  <Item label='Telefone'>
                    <Skeleton.Button active block />
                  </Item>
                </Col>
                <Col lg={8}>
                  <Item label='CPF'>
                    <Skeleton.Button active block />
                  </Item>
                </Col>
                <Col lg={8}>
                  <Item label='Preço por palavra'>
                    <Skeleton.Button active block />
                  </Item>
                </Col>

                {Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <Fragment key={i}>
                      <Col lg={6}>
                        <Item label='Habilidade'>
                          <Skeleton.Button active block />
                        </Item>
                      </Col>
                      <Col lg={2}>
                        <Item label='%'>
                          <Skeleton.Button active block />
                        </Item>
                      </Col>
                    </Fragment>
                  ))}
              </Row>
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
              <Row gutter={20}>
                <Col lg={8}>
                  <Item label='Instituição'>
                    <Skeleton.Button active block />
                  </Item>
                </Col>
                <Col lg={8}>
                  <Item label='Agência'>
                    <Skeleton.Button active block />
                  </Item>
                </Col>
                <Col lg={8}>
                  <Item label='Conta sem dígito'>
                    <Skeleton.Button active block />
                  </Item>
                </Col>

                <Col lg={8}>
                  <Item label='Dígito'>
                    <Skeleton.Button active block />
                  </Item>
                </Col>
                <Col lg={8}>
                  <Item label='Tipo de conta'>
                    <Skeleton.Button active block />
                  </Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>

        <Col lg={24} style={{ marginTop: 30 }}>
          <Row justify='end' gutter={24}>
            <Col>
              <Skeleton.Button
                active
                style={{ width: 100 }}
              />
            </Col>
            <Skeleton.Button
              active
              style={{ width: 120 }}
            />
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
