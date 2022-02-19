import { GiConfirmed } from 'react-icons/gi'
import { TitleAnchor } from 'app/components/TitleAnchor'
import { CgCloseO } from 'react-icons/cg'
import { format } from "date-fns"

import PostPreview from 'app/features/PostPreview'
import modal from './modal'

type positionHeaderNameProps = {
    title: string
    position?: 'right' | 'left'
}

type dataRowProps = {
    value: string
}

export const positionHeaderName = ({
    title,
    position = 'left'
}: positionHeaderNameProps) => {
    return (
        <div style={{ textAlign: position }}>
            {title}
        </div>
    )
}

export const dataDateRow = ({ value }: dataRowProps) => {
    return (
        <div
            style={{
                textAlign: 'right',
                fontWeight: 600,
                fontFamily: '"Roboto mono", monospace'
            }}
        >
            {format(new Date(value), 'dd/MM/yyyy')}
        </div >
    )
}

export const dataTitleWithImageRow = (props: any) => {
    const postId = props.row.original.id

    return (
        <div style={{
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            maxWidth: 320,
        }}>
            <img
                width={24}
                height={24}
                src={props.row.original.editor.avatarUrls.small}
                alt={props.row.original.editor.name}
            />

            <TitleAnchor
                href={`/posts/${postId}`}
                value={props.value}
                onClick={e => {
                    e.preventDefault()
                    modal({
                        children: <PostPreview postId={postId} />
                    })
                }}
            />
        </div>
    )
}

export const isPublished = ({ value }: { value: boolean }) => {
    const name = value
        ? <p style={{ display: 'flex', textAlign: 'center' }}>
            Publicado <GiConfirmed style={{ marginLeft: 5 }} size={15} color="#1ea82c" />
        </p>
        : <p style={{ display: 'flex', textAlign: 'center' }}>
            Privado <CgCloseO style={{ marginLeft: 5 }} size={15} color="#c92222" />
        </p>

    return (
        <div style={{ display: 'flex', justifyContent: 'right' }}>
            {name}
        </div>
    )
}
