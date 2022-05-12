import * as S from './styles';

type WordPriceCounterProps = {
    wordsCount: number;
    pricePerWord: number;
};

export const WordPriceCounter = ({
    pricePerWord,
    wordsCount,
}: WordPriceCounterProps) => {
    if (wordsCount < 0)
        throw Error('A quantidade de palavres não pode ser negativa.');

    const amount = () => {
        return (wordsCount * pricePerWord).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 2,
        });
    };

    return (
        <S.Wrapper>
            <S.WordCounter>
                {wordsCount} {wordsCount <= 1 ? 'Palavra' : 'Palavras'}
            </S.WordCounter>
            <S.PricePreview>{amount()}</S.PricePreview>
        </S.Wrapper>
    );
};
