import { WithContext as ReactTagInput, Tag } from 'react-tag-input'

import * as S from './styles'

type TagInputProps = {
    onAdd: (tag: Tag) => any
    onDelete: (i: number) => any
    tags: Tag[]
    placeholder: string
}

const keyCodes = {
    comma: 188,
    enter: 13,
    tab: 9
}

export const TagInput = ({ onAdd, onDelete, tags, placeholder }: TagInputProps) => {
    return (
        <S.Wrapper>
            <ReactTagInput
                placeholder={placeholder}
                handleDelete={onDelete}
                handleAddition={onAdd}
                allowDragDrop={false}
                autofocus={false}
                delimiters={[
                    keyCodes.comma,
                    keyCodes.enter,
                    keyCodes.tab
                ]}
                tags={tags}
            />
        </S.Wrapper>
    )
}
