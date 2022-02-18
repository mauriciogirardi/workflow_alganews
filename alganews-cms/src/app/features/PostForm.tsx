import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PostService } from 'mauricio.girardi-sdk';
import { Tag } from 'react-tag-input';

import { countWordsInMarkdown } from 'core/utils/countWordsInMarkdown';
import { WordPriceCounter } from 'app/components/WordPriceCounter';
import { MarkdownEditor } from 'app/components/MarkdownEditor'
import { ImageUpload } from 'app/components/ImageUpload'
import { TagInput } from 'app/components/TagInput'
import { Loading } from 'app/components/Loading';
import { Button } from 'app/components/Button';
import { Input } from 'app/components/Input'
import { info } from 'core/utils/info';

import * as S from './styles'

interface PostFormProps {
    postId?: number
}

export const PostForm = ({ postId }: PostFormProps) => {
    const navigate = useNavigate()
    const [body, setBody] = useState("")
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState<Tag[]>([])
    const [imageUrl, setImageUrl] = useState("")
    const [isPublishing, setIsPublishing] = useState(false)

    const allFieldsAreFilled = !body || !title || !imageUrl || !tags.length

    const fetchPost = (postId: number) => {
        PostService
            .getExistingPost(postId)
            .then(post => {
                setTitle(post.title)
                setImageUrl(post.imageUrls.default)
                setBody(post.body)
                setTags(post.tags.map(tag => ({ id: tag, text: tag })))
            })
    }

    const insertNewPost = async () => {
        const newPost = {
            tags: tags.map(tag => tag.text),
            body,
            title,
            imageUrl,
        }

        await PostService.insertNewPost(newPost)

        info({
            title: 'Post salvo com sucesso',
            description: `Você acabou de criar o post!`,
            status: 'success'
        })
    }

    const updateExistingPost = async (postId: number) => {
        const newPost = {
            tags: tags.map(tag => tag.text),
            body,
            title,
            imageUrl,
        }

        await PostService.updateExistingPost(postId, newPost)

        info({
            title: 'Post editado com sucesso',
            description: `Você acabou de editar o post!`,
            status: 'success'
        })
    }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setIsPublishing(true)

            !!postId
                ? await updateExistingPost(postId)
                : await insertNewPost()

            navigate('/')
        } finally {
            setIsPublishing(false)
        }
    }

    useEffect(() => {
        if (postId) {
            fetchPost(postId)
        }
    }, [postId])

    return (
        <S.PostFormWrapper onSubmit={handleFormSubmit}>
            <Loading show={isPublishing} />

            <Input
                label="título"
                placeholder="e.g.: Como fiquei rico aprendendo React"
                onChange={e => setTitle(e.currentTarget.value)}
                value={title}
            />

            <ImageUpload
                label="Thumbnail do post"
                onImageUpload={setImageUrl}
                preview={imageUrl}
            />

            <MarkdownEditor onChange={setBody} value={body} />

            <TagInput
                tags={tags}
                onAdd={tag => setTags([...tags, tag])}
                onDelete={index => setTags(tags.filter((_, i) => i !== index))}
                placeholder="Insira as tags deste post"
            />

            <S.PostFormSubmitWrapper>
                <WordPriceCounter pricePerWord={0.15} wordsCount={countWordsInMarkdown(body)} />
                <Button
                    variant="primary"
                    label={!!postId ? "Editar post" : "Salvar post"}
                    type="submit"
                    disabled={allFieldsAreFilled}
                />
            </S.PostFormSubmitWrapper>
        </S.PostFormWrapper>
    )
}
