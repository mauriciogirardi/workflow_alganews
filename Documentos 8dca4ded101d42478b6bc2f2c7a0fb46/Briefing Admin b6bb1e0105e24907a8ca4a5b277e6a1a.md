# Briefing Admin

Este documento visa trazer informações importantes, no estilo briefing, sobre o Software Admin.

O formato deste documento é baseado em perguntas e respostas, que podem conter ou não aspectos técnicos.

A leitura deste documento destina-se ao desenvolvedor da plataforma e seus responsáveis técnicos e não-técnicos.

[Copy of Tecnologias e versões](Briefing%20Admin%20b6bb1e0105e24907a8ca4a5b277e6a1a/Copy%20of%20Tecnologias%20e%20verso%CC%83es%209c4cc6bbe6ac4775b6acffa8cd3a1d1e.csv)

- **Qual a finalidade do software?**
Portal onde usuários com perfil administrativo poderão visualizar informações estratégicas, realizar pagamentos, gerenciar o fluxo de caixa e controlar perfis de usuários.
- **Qual(ais) tipo(s) de usuários devem acessar este software?**
Apenas usuários autenticados com os perfis de **Gerente** e **Assistente administrativo** podem acessar ao software.
- **Deverá ser utilizada alguma biblioteca de componentes?**
Para este projeto, deverá ser utilizado o Ant Design (link no final do documento)
- **A interface visual do software precisa seguir algum *guideline*?**
Este projeto conta com um protótipo de baixa fidelidade (aka *low fidelity prototype*), que também está disponível no Figma (link no final do documento).
**Nota: Tentar deixar a identidade do software parecida com visual do Projeto CMS.**
- **A interface visual do software precisa ser responsiva (se adaptar a várias telas)?**
Sim. É importante que o software seja otimizado para ser acessado de vários dispositivos, incluindo telas menores como smartphones e médias como tablets.
- **O software contará com Renderização do lado do servidor (SSR)?**
Não. Pelo fato de ser um software interno, e não haver a necessidade de ser indexado, pode ser uma SPA.
- **Para onde o usuário deve ser redirecionado depois de fazer logout?**
Para o blog.
- **Quais as funcionalidades deste software?**
    - Home
        - Visualização de gráfico de despesas e receitas da empresa no último ano
        - Visualização rápida dos últimos 3 posts publicados, mais recentes
    - Consulta de usuários
        - Visualização de todos os usuários cadastrados na plataforma
        - Ação rápida para ativar e desativar usuários
        - Ação rápida para editar um usuário
        - Ação rápida para visualizar um usuário
        - Busca por email
        - Busca por nome
        - Ordenação por data de criação
        - Botão de atualização de dados
    - Cadastro de usuário
        - Upload de imagem do usuário
        - Crop (recorte) da imagem do usuário antes de fazer upload
        - Lista de dados que devem ser inseridos:
            - Nome
            - Data de nascimento (date-picker)
            - Biografia (textarea)
            - Perfil do usuário (select)
            - E-mail
            - País onde reside
            - Estado onde reside
            - Cidade onde reside
            - Telefone (máscara de telefone celular (##) #####-####)
            - CPF (máscara de CPF ###.###.###-##)
            - Dados bancários
                - Instituição
                - Agência
                - Conta sem dígito
                - Dígito
                - Tipo de conta (select: conta corrente ou poupança)
            - **Caso o usuário seja um editor**
                - Preço por palavra (input monetário)
                - Habilidade 1
                - Nível da habilidade 1 (de 1 até 100)
                - Habilidade 2
                - Nível da habilidade 2 (de 1 até 100)
                - Habilidade 3
                - Nível da habilidade 3 (de 1 até 100)
    - Edição do usuário
        - Mesma lógica da criação de usuário
    - Detalhamento do usuário
        - Nome completo
        - Biografia
        - Habilidades
        - Informações de contato (País, cidade, estado, telefone)
        - Lista de posts (caso possua) paginada
        - Ação para editar usuário
        - Ação para desabilitar ou habilitar o usuário
    - Consulta de pagamentos
        - Lista pagamentos
            - Nome do editor
            - Data de agendamento
            - Período do pagamento
            - Status do pagamento
            
            ---
            
            - Ação rápida para visualizar o perfil do usuário
            - Ação para visualizar o pagamento
            - Ação para exclusão do pagamento
            - Ordenação por data de agendamento
    - Detalhamento do pagamento
        - Ação para imprimir página (somente o conteúdo)
        - Status do pagamento
        - Nome do editor
        - Ganhos provenientes de posts
        - Ganhos provenientes de bônus
        - Ganho total
        - Período do pagamento
        - Lista de posts que envolvem o pagamento
            - Título do post
            - Preço por palavra
            - Quantidade de palavras no post
            - Total ganho com aquele post
    - Cadastro de pagamento
        - Pré-visualização do pagamento
        - Editor (select com pesquisa)
        - Período (date-picker)
        - Agendamento (date-picker)
            - Só ser feito para os próximos 7 dias
        - Bônus
            - Descrição
            - Valor (input monetário)
            
            ---
            
            - Pode adicionar quantos bônus quiser
    - Fluxo de caixa
        - Receita e despesas possuem a mesma estrutura
        - Ação para gerenciamento de Categorias
            - Ação para atualizar a lista de categorias
            - Ação para adicionar nova categoria
                - Nome da categoria (único, não pode se repetir)
            - Ação para excluir categoria
                - Somente categorias sem vínculo podem ser excluídas
        - Ação para cadastrar nova entrada
            - Descrição
            - Categoria (select)
            - Montante (input monetário)
            - Data da entrada (date-picker)
        - Listagem de entrada
            - Filtro pro mês (escolher apenas o mês e o ano)
            - Paginação
            - Descrição da entrada
            - Categoria da entrada
            - Data da entrada
            - Valor da entrada
            - Ação para editar a entrada
            - Ação para visualizar detalhes da entrada
            - Ação para editar entrada
                - Entradas geradas automaticamente pelo sistema não podem ser removidas nem editadas
            - Seleção de vários registros
            - Ação para remover registros em lote

---

## Link do projeto no Figma

Você pode baixar o projeto do AlgaNews através do repositório oficial no GitHub:

[AlgaNews - Figma](https://github.com/algaworks/alganews-figma)

## Link do Ant Design

Biblioteca de componentes que deverá ser usada neste projeto

[Ant Design - The world's second most popular React UI framework](https://ant.design/)
