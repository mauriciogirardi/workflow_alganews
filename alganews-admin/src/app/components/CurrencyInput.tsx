import { formatterCurrency } from 'core/utils';
import {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useState,
} from 'react';

type CurrencyInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
    reals: number,
  ) => any;
};

export const CurrencyInput = ({
  ...rest
}: CurrencyInputProps) => {
  const [inputValue, setInputValue] = useState(
    typeof rest.value === 'number'
      ? formatterCurrency(rest.value)
      : 'R$ 0,00',
  );

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      const cents = value.replace(/[^(0-9)]/gi, '');
      const reals = Number(cents) / 100;

      setInputValue(formatterCurrency(reals));

      rest.onChange && rest.onChange(e, reals);
    },
    [rest],
  );

  return (
    <input
      className='ant-input'
      {...rest}
      value={inputValue}
      onChange={onChangeInput}
    />
  );
};
