import { Descriptions, Skeleton } from 'antd';
import { formatterCurrency, formatterDate } from 'core/utils';
import { CashFlow, CashFlowService } from 'mauricio.girardi-sdk';
import { useCallback, useEffect, useState } from 'react';

interface EntryDetailsProps {
  entryId: number;
}

const { Item } = Descriptions;

export const EntryDetails = ({ entryId }: EntryDetailsProps) => {
  const [entry, setEntry] = useState<CashFlow.EntryDetailed>();
  const [loading, setLoading] = useState(false);

  const fetchEntry = useCallback((id: number) => {
    setLoading(true);
    CashFlowService.getExistingEntry(id)
      .then(setEntry)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    entryId && fetchEntry(entryId);
  }, [entryId, fetchEntry]);

  if (loading) {
    return (
      <>
        <Skeleton />
        <Skeleton title={false} />
        <Skeleton title={false} />
      </>
    );
  }

  return (
    <Descriptions column={1} bordered size='small'>
      <Item label={'Descrição'}>{entry?.description}</Item>
      <Item label={'Categoria'}>{entry?.category.name}</Item>
      <Item label={'Criado por'}>{entry?.createdBy.name}</Item>
      <Item label={'Data de entrada'}>
        {entry?.transactedOn && formatterDate({ date: entry.transactedOn })}
      </Item>
      <Item label={'Valor'}>{formatterCurrency(entry?.amount || 0)}</Item>
      <Item label={'Criado em'}>
        {entry?.createdAt &&
          formatterDate({
            date: entry.createdAt,
            typeFormat: "dd/MM/yyyy 'às' hh:mm",
          })}
      </Item>
      {entry?.createdAt !== entry?.updatedAt && (
        <>
          <Item label={'Atualizado em'}>
            {entry?.updatedAt &&
              formatterDate({
                date: entry.updatedAt,
                typeFormat: "dd/MM/yyyy 'às' hh:mm",
              })}
          </Item>
          <Item label={'Atualizado por'}>{entry?.updatedBy.name}</Item>
        </>
      )}
    </Descriptions>
  );
};
