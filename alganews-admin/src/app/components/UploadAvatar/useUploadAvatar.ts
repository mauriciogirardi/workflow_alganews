import { FileService } from 'mauricio.girardi-sdk';
import { useCallback, useState } from 'react';

export const useUploadAvatar = () => {
  const [avatar, setAvatar] = useState('');

  const handleAvatarUpload = useCallback(
    async (file: File) => {
      const avatarSource = await FileService.upload(file);
      setAvatar(avatarSource);
    },
    [],
  );

  return {
    handleAvatarUpload,
    setAvatar,
    avatar,
  };
};
