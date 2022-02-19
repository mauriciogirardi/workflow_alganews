import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { dateFormatDistance } from 'core/utils/dateFormatDistance'
import { FieldDescriptor } from 'app/components/FieldDescriptor'
import { ValueDescriptor } from 'app/components/ValueDescriptor'
import { withBoundary } from 'core/hoc/withBoundary'
import { ProgressBar } from 'app/components/ProgressBar'

import * as S from './styles'
import Skeleton from 'react-loading-skeleton'
import { useSingleEditor } from 'core/hooks/useSingleEditor'

type EditorProfileProps = {
    hidePersonalData?: boolean
}

function EditorProfile({ hidePersonalData }: EditorProfileProps) {
    const params = useParams<{ id: string }>()
    const { editor, error, fetchEditor } = useSingleEditor()

    useEffect(() => {
        fetchEditor(Number(params.id))
    }, [params.id, fetchEditor])

    if (error) throw error
    if (!editor) return <Skeleton height={311} />

    return (
        <S.EditorProfileWrapper>
            <S.EditorHeadline>
                <S.Avatar src={editor.avatarUrls.small} />
                <S.Name>{editor?.name}</S.Name>
                <S.Description>{`Editor há ${dateFormatDistance(editor.createdAt)}`}</S.Description>
            </S.EditorHeadline>

            <S.Divisor />

            <S.EditorFeatures>
                <S.PersonalInfo>
                    <S.Biography>{editor.bio}</S.Biography>
                    <S.Skills>
                        {editor.skills?.map(skill => (
                            <ProgressBar
                                key={skill.name}
                                progress={skill.percentage}
                                title={skill.name}
                                theme={'primary'}
                            />
                        ))}

                    </S.Skills>
                </S.PersonalInfo>

                <S.ContactInfo>
                    <FieldDescriptor field={'Cidade'} value={editor.location.city} />
                    <FieldDescriptor field={'Estado'} value={editor.location.state} />

                    {!hidePersonalData && (
                        <>
                            <FieldDescriptor field={'Celular'} value={'+55 27 99900-9999'} />
                            <FieldDescriptor field={'Email'} value={'ana.castillo@redacao.algacontent.com'} />
                            <FieldDescriptor field={'Data de nascimento'} value={'26 de Dezembro de 1997 (22 anos)'} />
                        </>
                    )}
                </S.ContactInfo>
            </S.EditorFeatures>

            {!hidePersonalData && (
                <S.EditorEarnings>
                    <S.EditorEarningsWrapper>
                        <ValueDescriptor color={'default'} value={21452} description={'Palavras nesta semana'} />
                        <ValueDescriptor color={'default'} value={123234} description={'Palavras no mês'} />
                        <ValueDescriptor color={'default'} value={12312312} description={'Total de palavras'} />
                    </S.EditorEarningsWrapper>
                    <S.EditorEarningsWrapper>
                        <ValueDescriptor color={'primary'} value={545623.23} description={'Ganhos na semana'} isCurrency />
                        <ValueDescriptor color={'primary'} value={545623.23} description={'Ganhos no mês'} isCurrency />
                        <ValueDescriptor color={'primary'} value={545623.23} description={'Ganhos no total'} isCurrency />
                    </S.EditorEarningsWrapper>
                </S.EditorEarnings>
            )}
        </S.EditorProfileWrapper>
    )
}

export default withBoundary(EditorProfile, 'detalhes do editor')
