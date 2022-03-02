export const formatterCurrency = (
  value: string | number,
) => {
  return Number(value).toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency',
    maximumFractionDigits: 2,
  });
};
