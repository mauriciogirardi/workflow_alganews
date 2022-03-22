import { DefaultOptionType } from 'antd/lib/select';

export const normalizeFilterOptionSearch = (
  input: string,
  option: DefaultOptionType | undefined,
) => {
  const strOption = String(option?.children);
  return (
    strOption
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .indexOf(input.toLowerCase()) >= 0 ||
    strOption.toLowerCase().indexOf(input.toLowerCase()) >=
      0
  );
};
