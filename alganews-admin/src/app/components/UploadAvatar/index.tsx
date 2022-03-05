import { Avatar, Upload } from 'antd';
import ImageCrop from 'antd-img-crop';
import { UserOutlined } from '@ant-design/icons';

import { useUploadAvatar } from './useUploadAvatar';

export const UploadAvatar = () => {
  const { handleAvatarUpload, avatar, setAvatar } =
    useUploadAvatar();

  return (
    <ImageCrop rotate shape='round' grid aspect={1}>
      <Upload
        maxCount={1}
        beforeUpload={(file) => {
          handleAvatarUpload(file);
          return false;
        }}
        onRemove={() => setAvatar('')}
      >
        <Avatar
          style={{ cursor: 'pointer' }}
          src={avatar}
          size={180}
          icon={<UserOutlined />}
        />
      </Upload>
    </ImageCrop>
  );
};
