import { confirmAlert } from 'react-confirm-alert'
import "react-confirm-alert/src/react-confirm-alert.css"

import { Info } from 'app/components/Info'

type InfoProps = {
    title: string
    description: string
    status?: 'error' | 'info' | 'success'
}

export const info = ({ title, description, status = 'info' }: InfoProps) => {
    setTimeout(() => {
        confirmAlert({
            overlayClassName: 'info-overlay',
            customUI: () => {
                return (
                    <Info
                        title={title}
                        description={description}
                        status={status}
                    />
                )
            }
        })
    }, 0)
}

