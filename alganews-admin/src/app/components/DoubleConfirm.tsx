import { Popconfirm, Tooltip } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { ReactNode } from 'react';

interface DoubleConfirmProps {
  children: ReactNode;
  disabled?: boolean;
  popConfirmTitle: string;
  onConfirmTitle: string;
  onConfirmContent: string;
  okText?: string;
  tooltipTitle?: string;
  cancelText?: string;
  onOk?: () => void;
}

export const DoubleConfirm = ({
  children,
  popConfirmTitle,
  disabled,
  tooltipTitle,
  okText = 'Remover',
  onConfirmContent,
  onConfirmTitle,
  cancelText = 'Não',
  onOk,
}: DoubleConfirmProps) => {
  return (
    <Popconfirm
      title={popConfirmTitle}
      okText={okText}
      cancelText={cancelText}
      disabled={disabled}
      onConfirm={() => {
        confirm({
          okText,
          cancelText: 'Cancelar',
          title: onConfirmTitle,
          content: onConfirmContent,
          onOk: onOk,
        });
      }}
    >
      <Tooltip title={tooltipTitle} placement='left'>
        {children}
      </Tooltip>
    </Popconfirm>
  );
};
