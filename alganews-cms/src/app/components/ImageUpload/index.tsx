import { ChangeEvent, useEffect, useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { FileService } from 'mauricio.girardi-sdk';
import { Loading } from '../Loading';
import { FaTrash } from 'react-icons/fa';
import { Button } from '../Button';

import * as S from './styles'

export interface ImageUploadProps {
    label: string
    onImageUpload: (imageUrl: string) => any
    preview?: string
}

export const ImageUpload = ({ label, onImageUpload, preview }: ImageUploadProps) => {
    const [filePreview, setFilePreview] = useState<string | undefined>(undefined)
    const [isPushing, setIsPushing] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        if (file) {
            const reader = new FileReader()

            reader.addEventListener('load', async e => {
                try {
                    setIsPushing(true)
                    setFilePreview(String(e.target?.result))
                    const imageUrl = await FileService.upload(file)
                    onImageUpload(imageUrl)
                } finally {
                    setIsPushing(false)
                }
            })

            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        setFilePreview(preview)
    }, [preview])

    if (filePreview) {
        return (
            <S.ImagePreviewWrapper>
                <Loading show={isPushing} />

                <S.ImagePreview preview={filePreview} >
                    <Button
                        icon={FaTrash}
                        variant='primary'
                        label='Remover imagem'
                        onClick={() => setFilePreview(undefined)}
                    />
                </S.ImagePreview>
            </S.ImagePreviewWrapper>
        )
    }

    return (
        <S.Wrapper>
            <S.Label>
                <MdOutlineFileUpload size={24} />
                {label}
                <S.Input type="file" onChange={handleChange} />
            </S.Label>
        </S.Wrapper>
    )
}
