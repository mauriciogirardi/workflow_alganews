import { notification as antdNotification } from 'antd';

interface NotificationProps {
  type?: 'error' | 'success' | 'info';
  title: string;
  description: string;
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topRight';
}

export const notification = ({
  type = 'success',
  placement = 'bottomLeft',
  description,
  title,
}: NotificationProps) => {
  return antdNotification[type]({
    message: title,
    description,
    placement,
    duration: 0.9,
  });
};
