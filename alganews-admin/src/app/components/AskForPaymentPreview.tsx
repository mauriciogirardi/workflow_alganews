import { Image, Row, Typography } from 'antd';
import CustomError from 'mauricio.girardi-sdk/dist/CustomError';
import taxSvg from '../assets/tax.svg';
import badRequestSvg from '../assets/bad-request.svg';

interface AskForPaymentPreviewProps {
  error?: CustomError;
  loading?: boolean;
}

const { Title, Text } = Typography;

export const AskForPaymentPreview = ({
  error,
  loading = false,
}: AskForPaymentPreviewProps) => {
  return (
    <Row style={{ textAlign: 'center' }} justify='center'>
      <Image
        src={error ? badRequestSvg : taxSvg}
        alt='Ilustração de uma mulher sentada com uma calculadra na mão'
        preview={false}
        key={error ? 'errorImg' : 'img'}
      />
      <Title level={2} style={{ maxWidth: 360 }}>
        {error ? error.message : 'Selecione um editor e um período'}
      </Title>
      <Text style={{ maxWidth: 360 }}>
        Para podermos gera uma prévia do pagamento, por favor, selecione e
        preencha os campos "Editor" e "Período"
      </Text>
    </Row>
  );
};
