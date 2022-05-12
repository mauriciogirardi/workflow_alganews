# Briefing CMS

---

Este documento visa trazer informações importantes, no estilo briefing, sobre o Software CMS.

O formato deste documento é baseado em perguntas e respostas, que podem conter ou não aspectos técnicos.

A leitura deste documento destina-se ao desenvolvedor da plataforma e seus responsáveis técnicos e não-técnicos.

## Tecnologias e versões

Programação da interface:

- React.js na versão 17

Programação do cliente:

- TypeScript na última versão estável

Controle de autenticação e login:

- OAuth2

Comunicação de software com API/Database:

- REST

---

## Definições

- **O que significa CMS?**
CMS é um acrônimo para Content Management System, ou, em português, Sistema de Gerenciamento de conteúdo
- **Qual a finalidade do software?**
Gerenciamento de conteúdo (publicações, doravante denominadas *posts*) por parte dos editores.
- **Qual(ais) tipo(s) de usuários devem acessar este software?**
O acesso à este software deve ser único e exclusivo dos **Editores.**
- **Quais as funcionalidades deste software?**
    - Cadastro de novos posts
    - Edição de posts cadastrados pelo próprio editor
    - Visualização de todos os posts publicados
    - Visualização de posts não publicados criados pelo próprio editor
    - Visualização de métricas de performance
    - Visualização de informações pessoais detalhadas do próprio editor
    - Visualização de informações públicas de outros editores
    - Controle de sessão (login/logout)
    - Pré-visualização de uma ***estimativa** de ganhos durante a criação de um post
- **A interface visual do software precisa seguir algum *guideline*?**
Precisa seguir, de forma mais fiel possível, o guideline apresentado no Figma (links no final do documento)
- **A interface visual do software precisa ser responsiva (se adaptar a várias telas)?**
**Não.** Nossos editores trabalham exclusivamente em um notebook padronizado com resolução **1366x768** e a interface deverá ser otimizada somente para esta resolução.
Acessos por tablets ou smartphones não precisam ser restringidos, apenas optamos por **não desprender recursos** com uma responsividade que não será aproveitada.
- **O usuário deve permanecer autenticado mesmo após fechar as "janelas" do software?**
Sim, deve.
- **Para onde o usuário deve ser redirecionado depois de fazer logout?**
Para a tela de login.

---

## Link do projeto no Figma:

Você pode baixar o projeto do AlgaNews através do repositório oficial no GitHub:

[AlgaNews - Figma](https://github.com/algaworks/alganews-figma)
