export const formatPhone = (phone: string) => {
  const phoneArray = phone.split('');
  const ddd = phoneArray.slice(0, 2).join('');
  const firstSlice = phoneArray.slice(2, 7).join('');
  const lastSlice = phoneArray.slice(7, 11).join('');

  return `(${ddd}) ${firstSlice}-${lastSlice}`;
};
