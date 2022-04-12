import moment from 'moment';

export const msgTitleFormModal = (isEdit: boolean, name: string) =>
  `${isEdit ? 'EDITAR' : 'CADASTRAR'} ${name.toUpperCase()}`;

export const msgTitleDetailsModal = (name: string) =>
  `DETALHES DA ${name.toUpperCase()}`;

export const msgDescriptionRemove = (isInBatch: boolean, name: string) =>
  isInBatch
    ? `A ${name} selecionada foi removida com sucesso.`
    : `As ${name + 's'} selecionadas foram removidas com sucesso`;

export const msgTitleCrud = (name: string, date: string) =>
  `Recuperando ${name + 's'} do mês de ${moment(date).format(
    'MMMM \\d\\e YYYY',
  )}`;

export const msgConfirmContent = (name: string) =>
  `Remover uma ou mais ${
    name + 's'
  } pode gerar impacto negativo no gráfico de receitas e despesas da empresa. Esta ação é irreversível.`;

export const msgConfirmTitle = (
  isInBatch: boolean,
  name: string,
  isPop = false,
) =>
  isPop
    ? `Remover ${isInBatch ? name + 's' : name}`
    : isInBatch
    ? `${name + 's'} selecionadas`
    : `${name} selecionada`;
