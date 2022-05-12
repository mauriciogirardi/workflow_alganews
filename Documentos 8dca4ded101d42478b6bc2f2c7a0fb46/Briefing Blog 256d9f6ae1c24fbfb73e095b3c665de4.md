# Briefing Blog

Este documento visa trazer informações importantes, no estilo briefing, sobre o Software Blog.

O formato deste documento é baseado em perguntas e respostas, que podem conter ou não aspectos técnicos.

A leitura deste documento destina-se ao desenvolvedor da plataforma e seus responsáveis técnicos e não-técnicos.

[Copy of Tecnologias e versões](Briefing%20Blog%20256d9f6ae1c24fbfb73e095b3c665de4/Copy%20of%20Tecnologias%20e%20verso%CC%83es%2024d369b75d70470dac4ffa2908325650.csv)

- **Qual a finalidade do software?**
Portal onde os leitores (a.k.a. usuários) poderão visualizar os posts públicos e realizar comentários/interações.
- **Qual(ais) tipo(s) de usuários devem acessar este software?**
O acesso a este portal deve ser público, sem nenhum tipo de restrição ou necessidade de autenticação.
- **Quais as funcionalidades deste software?**
    - Visualização da lista resumida de posts públicos
    - Paginação da lista resumida de posts públicos
    - Visualização detalhada de um post público
    - Comentar em um post público
    - Responder comentários em um post público
    - Reagir a um post público (reações emocionais, parecidas com as do facebook)
- **A interface visual do software precisa seguir algum *guideline*?**
Precisa seguir, de forma mais fiel possível, o guideline apresentado no Figma (links no final do documento)
- **A interface visual do software precisa ser responsiva (se adaptar a várias telas)?**
Sim. É importante que o software seja otimizado para ser acessado de vários dispositivos, incluindo telas menores como smartphones e médias como tablets.
- **O software contará com Renderização do lado do servidor (SSR)?**
Sim. A renderização do lado do servidor é imprescindível para este software, visto que aplicaremos técnicas de SEO pelas páginas.
- **O software precisa ser personalizável?**
Sim. Durante eventos, é possível que mudemos as cores da marca e alguns estilos padrões do site, e esta configuração deve ser fácil de gerenciar e versionar (por meio de variáveis acessíveis).

## Link do projeto no Figma:

Você pode baixar o projeto do AlgaNews através do repositório oficial no GitHub:

[AlgaNews - Figma](https://github.com/algaworks/alganews-figma)
