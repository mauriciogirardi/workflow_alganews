import { Row, Col } from 'antd';

import { UserList } from 'app/features/user/UserList';

export default function UserListPage() {
  return (
    <Row>
      <Col xs={24}>
        <UserList />
      </Col>
    </Row>
  );
}
