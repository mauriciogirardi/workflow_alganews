# Mapeamento de erros

**Este documento conta com os erros que a API pode retornar**

```tsx
const ERRORS = {
  FORBIDDEN: "https://api.alganews.com.br/forbidden",
  INVALID_DATA: "https://api.alganews.com.br/invalid-data",
  SYSTEM_ERROR: "https://api.alganews.com.br/system-error",
  INVALID_PARAMETER: "https://api.alganews.com.br/invalid-parameter",
  INCOMPREHENSIBLE_MESSAGE:
    "https://api.alganews.com.br/incomprehensible-message",
  RESOURCE_NOT_FOUND: "https://api.alganews.com.br/resource-not-found",
  BUSINESS_ERROR: "https://api.alganews.com.br/business-error",
};
```

1. **Forbidden**
    - Houve um erro na autenticação
    - O usuário não tem permissão para executar esta ação
2. **Invalid Data**
    - Erro de validação de campos
    - Os dados inseridos não são válidos
3. **System Error**
    - O servidor encontrou um erro desconhecido
4. **Invalid Parameter**
    - Erro de validação de parâmetros
    - Os dados passados como parâmetros não são válidos
5. **Incomprehensible message**
    - Uma propriedade está com o tipo errado
6. **Resource not found**
    - O recurso solicitado não foi encontrado
    - Comumente conhecido com 404
7. **Business error**
    - Erro de regra de negócio