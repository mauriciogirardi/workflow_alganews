import { Confirm } from 'app/components/Confirm'
import { confirmAlert } from 'react-confirm-alert'
import "react-confirm-alert/src/react-confirm-alert.css"

type ConfirmProps = {
    title: string
    onConfirm?: () => void
    onCancel?: () => void
}

export const confirm = ({ title, onCancel, onConfirm }: ConfirmProps) => {
    setTimeout(() => {
        confirmAlert({
            overlayClassName: 'confirm-overlay',
            customUI: ({ onClose }) => {
                return (
                    <Confirm
                        title={title}
                        onCancel={() => {
                            if (onCancel) onCancel()
                            onClose()
                        }}
                        onConfirm={() => {
                            if (onConfirm) onConfirm()
                            onClose()
                        }}
                    />
                )
            }
        })
    }, 0)
}

