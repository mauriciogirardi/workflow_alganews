import { Row, Col } from 'antd';

import { UserList } from 'app/features/user/UserList';
import { useBreadcrumb } from 'core/hooks/useBreadcrumb';
import { usePageTitle } from 'core/utils/hooks/usePageTitle';

export default function UserListPage() {
  usePageTitle('Lista de usuário');
  useBreadcrumb('Usuários/Consulta');

  return (
    <Row>
      <Col xs={24}>
        <UserList />
      </Col>
    </Row>
  );
}
