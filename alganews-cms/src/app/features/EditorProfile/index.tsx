import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { dateFormatDistance } from 'core/utils/dateFormatDistance';
import { FieldDescriptor } from 'app/components/FieldDescriptor';
import { ValueDescriptor } from 'app/components/ValueDescriptor';
import { withBoundary } from 'core/hoc/withBoundary';
import { ProgressBar } from 'app/components/ProgressBar';

import * as S from './styles';
import Skeleton from 'react-loading-skeleton';
import { useSingleEditor } from 'core/hooks/useSingleEditor';
import { useAuth } from 'core/hooks/auth/useAuth';
import { User } from 'mauricio.girardi-sdk';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { ptBR } from 'date-fns/locale';

type EditorProfileProps = {
    hidePersonalData?: boolean;
};

function EditorProfile({ hidePersonalData }: EditorProfileProps) {
    const params = useParams<{ id: string }>();
    const { user } = useAuth();
    const { editor, error, fetchEditor } = useSingleEditor();

    const editorIsAuthenticatedUser = useMemo(
        () => Number(params.id) === user?.id,
        [user, params.id],
    );

    const editorData = useMemo(
        () => (editorIsAuthenticatedUser ? user : editor),
        [editorIsAuthenticatedUser, editor, user],
    );

    useEffect(() => {
        if (!editorIsAuthenticatedUser) fetchEditor(Number(params.id));
    }, [params.id, fetchEditor, editorIsAuthenticatedUser]);

    const age = useMemo(() => {
        const year = Number(
            (editorData as User.Detailed)?.birthdate?.split('-')[0],
        );
        const currencyYear = new Date().getFullYear();

        return `${currencyYear - year} anos`;
    }, [editorData]);

    if (error) throw error;
    if (!editorData) return <Skeleton height={311} />;

    return (
        <S.EditorProfileWrapper>
            <S.EditorHeadline>
                <S.Avatar src={editorData.avatarUrls.small} />
                <S.Name>{editorData?.name}</S.Name>
                <S.Description>{`Editor há ${dateFormatDistance(
                    editorData.createdAt,
                )}`}</S.Description>
            </S.EditorHeadline>

            <S.Divisor />

            <S.EditorFeatures>
                <S.PersonalInfo>
                    {editorData.bio && (
                        <>
                            <S.Biography>{editorData.bio}</S.Biography>
                            <S.Skills>
                                {editorData.skills?.map(skill => (
                                    <ProgressBar
                                        key={skill.name}
                                        progress={skill.percentage}
                                        title={skill.name}
                                        theme={'primary'}
                                    />
                                ))}
                            </S.Skills>
                        </>
                    )}
                </S.PersonalInfo>

                <S.ContactInfo>
                    {editorData.location.city && (
                        <FieldDescriptor
                            field={'Cidade'}
                            value={editorData.location.city}
                        />
                    )}
                    {editorData.location.state && (
                        <FieldDescriptor
                            field={'Estado'}
                            value={editorData.location.state}
                        />
                    )}

                    {(editorData as User.Detailed).phone && (
                        <FieldDescriptor
                            field={'Celular'}
                            value={(editorData as User.Detailed).phone}
                        />
                    )}

                    {(editorData as User.Detailed).email && (
                        <FieldDescriptor
                            field={'Email'}
                            value={(editorData as User.Detailed).email}
                        />
                    )}

                    {(editorData as User.Detailed)?.birthdate && (
                        <FieldDescriptor
                            field={'Data de nascimento'}
                            value={`${format(
                                parseISO(
                                    (editorData as User.Detailed).birthdate,
                                ),
                                "dd 'de' MMMM 'de' yyyy",
                                { locale: ptBR },
                            )} (${age})`}
                        />
                    )}
                </S.ContactInfo>
            </S.EditorFeatures>

            {(editorData as User.Detailed).metrics && (
                <S.EditorEarnings>
                    <S.EditorEarningsWrapper>
                        <ValueDescriptor
                            color={'default'}
                            value={
                                (editorData as User.Detailed).metrics
                                    .weeklyWords
                            }
                            description={'Palavras nesta semana'}
                        />
                        <ValueDescriptor
                            color={'default'}
                            value={
                                (editorData as User.Detailed).metrics
                                    .monthlyWords
                            }
                            description={'Palavras no mês'}
                        />
                        <ValueDescriptor
                            color={'default'}
                            value={
                                (editorData as User.Detailed).metrics
                                    .lifetimeWords
                            }
                            description={'Total de palavras'}
                        />
                    </S.EditorEarningsWrapper>
                    <S.EditorEarningsWrapper>
                        <ValueDescriptor
                            color={'primary'}
                            value={
                                (editorData as User.Detailed).metrics
                                    .weeklyEarnings
                            }
                            description={'Ganhos na semana'}
                            isCurrency
                        />
                        <ValueDescriptor
                            color={'primary'}
                            value={
                                (editorData as User.Detailed).metrics
                                    .monthlyEarnings
                            }
                            description={'Ganhos no mês'}
                            isCurrency
                        />
                        <ValueDescriptor
                            color={'primary'}
                            value={
                                (editorData as User.Detailed).metrics
                                    .lifetimeEarnings
                            }
                            description={'Ganhos no total'}
                            isCurrency
                        />
                    </S.EditorEarningsWrapper>
                </S.EditorEarnings>
            )}
        </S.EditorProfileWrapper>
    );
}

export default withBoundary(EditorProfile, 'detalhes do editor');
