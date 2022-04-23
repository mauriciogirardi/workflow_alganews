import { Avatar, Input, Upload, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import ImageCrop from 'antd-img-crop';

interface UploadAvatarProps {
  handleAvatarUpload: (file: RcFile) => void;
  setAvatar: (avatar: string) => void;
  avatar?: string;
}

const { Item } = Form;

export const UploadAvatar = ({
  handleAvatarUpload,
  setAvatar,
  avatar,
}: UploadAvatarProps) => {
  return (
    <>
      <ImageCrop rotate shape={'round'} grid aspect={1}>
        <Upload
          maxCount={1}
          onRemove={() => setAvatar('')}
          beforeUpload={(file) => {
            handleAvatarUpload(file);
            return false;
          }}
          fileList={[...(avatar ? [{ name: 'Avatar', uid: '' }] : [])]}
        >
          <Avatar
            style={{ cursor: 'pointer' }}
            icon={<UserOutlined />}
            src={avatar}
            size={128}
          />
        </Upload>
      </ImageCrop>

      <Item name='avatarUrl' hidden>
        <Input hidden />
      </Item>
    </>
  );
};
