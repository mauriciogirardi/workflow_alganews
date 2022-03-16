import { Row, Col } from 'antd';

import { UserList } from 'app/features/user/UserList';
import { usePageTitle } from 'core/utils/hooks/usePageTitle';

export default function UserListPage() {
  usePageTitle('Lista de usuário');

  return (
    <Row>
      <Col xs={24}>
        <UserList />
      </Col>
    </Row>
  );
}
