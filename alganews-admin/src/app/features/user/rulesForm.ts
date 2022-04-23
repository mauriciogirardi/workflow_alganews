import { Rule } from 'antd/lib/form';

export const ruleRequired: Rule[] = [
  {
    required: true,
    message: 'O Campo é obrigatório.',
  },
];

export const ruleBio: Rule[] = [
  {
    required: true,
    message: 'O Campo é obrigatório.',
  },
  {
    max: 255,
    message: 'A biografia não pode ter mais de 255 caracteres.',
  },
  {
    min: 10,
    message: `A biografia não pode ter menos de 10 caracteres`,
  },
];

export const ruleRole: Rule[] = [
  {
    required: true,
    message: 'O Campo é obrigatório.',
  },
  {
    type: 'enum',
    enum: ['EDITOR', 'ASSISTANT', 'MANAGER'],
    message: `O Perfil precisar ser editor, assitente ou gerente`,
  },
];

export const ruleCountry: Rule[] = [
  {
    required: true,
    message: 'O Campo é obrigatório.',
  },
  {
    max: 50,
    message: `O país não pode ter mais de 50 caracteres`,
  },
];

export const rulePhone: Rule[] = [
  {
    required: true,
    message: 'O Campo é obrigatório.',
  },
  {
    max: 20,
    message: `O telefone não pode ter mais de 20 caracteres`,
  },
];

export const ruleCPF: Rule[] = [
  {
    required: true,
    message: 'O Campo é obrigatório.',
  },
  {
    max: 14,
    message: `O CPF não pode ter mais de 14 caracteres`,
  },
];

export const rulePricePerWord: Rule[] = [
  {
    required: true,
    message: 'O campo é obrigatório',
  },
  {
    type: 'number',
    min: 0.01,
    message: 'O valor mínimo é 1 centavo',
  },
];

export const ruleSkills: Rule[] = [
  {
    required: true,
    message: 'O campo é obrigatório',
  },
  {
    max: 50,
    message: `A habilidade não pode ter mais de 50 caracteres`,
  },
];

export const rulePercentage: Rule[] = [
  {
    required: true,
    message: '',
  },
  {
    async validator(field, value) {
      if (isNaN(value)) throw new Error('Apenas números');
      if (Number(value) > 100) throw new Error('Maxímo 100');
      if (Number(value) < 0) throw new Error('Mínimo 0');
    },
  },
];

export const ruleBankCode: Rule[] = [
  {
    required: true,
    message: 'O campo é obrigatório',
  },
  {
    max: 3,
    message: `A instituição precisa ter 3 caracteres`,
  },
  {
    min: 3,
    message: `A instituição precisa ter 3 caracteres`,
  },
];

export const ruleAgency: Rule[] = [
  {
    required: true,
    message: 'O campo é obrigatório',
  },
  {
    max: 10,
    message: `A agência precisa ter no máximo 10 caracteres`,
  },
  {
    min: 1,
    message: `A agência precisa ter no mínimo 1 caractere`,
  },
];

export const ruleDigit: Rule[] = [
  {
    required: true,
    message: 'O campo é obrigatório',
  },
  {
    max: 1,
    message: `O dígito precisa ser único`,
  },
];
