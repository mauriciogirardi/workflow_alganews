# alganews-infra

## Preparando o ambiente

Para realizar a instalação do **Docker** e **Docker Compose**, 
siga as instruções de acordo com o **sistema operacional**:

- Windows
  - Baixe o instalador do **Docker** https://hub.docker.com/editions/community/docker-ce-desktop-windows/
  - Abra o arquivo **executável** (.exe), siga as instruções apresentadas na tela para realizar a instalação.
   
- Ubuntu 20
  - Execute o **comando** abaixo para realizar a instalação:
```shell script
sudo apt install docker.io docker-compose
```

Referências:

https://docs.docker.com/docker-for-windows/install/

https://docs.docker.com/compose/install/

## Iniciando os serviços

Na pasta raiz deste onde o **docker-compose.yml** e **docker-compose.front.yml** são localizados, 
execute os comandos a seguir.

Para inicializar somente o **backend** (e suas dependências, como o banco de dados):
```shell script
docker-compose up
```
Para inicializar somente o **frontend**:
```shell script
docker-compose -f docker-compose.front.yml up 
```

Para inicializar ambos:
```shell script
docker-compose -f docker-compose.yml -f docker-compose.front.yml up
```

## Acessando os serviços

Cada serviço estará conectado a uma **porta** (ex: 3000),
na rede privada dos **containers** e outro na rede do computador **hospedeiro**, ou seja, o seu computador.

O endereço na rede **privada** dos containers é somente utilizado para comunicação interna de contêiner para contêiner, 
por exemplo, da API REST para o banco de dados.

Já o endereço em rede **local**, serve para comunicação entre a sua máquina e o contêiner.

Para acessar os serviços da sua maquina, 
utilize o endereço de rede **local** respectivo:

### Endereço dos serviços

| Serviço               | Endereço privado | Endereço local |
| --------------------- | ------------- | ----- |
| Swagger UI   | alganews-swagger-ui:8080 | http://localhost:8082 |
| AlgaNews Blog   | alganews-blog:3000 | http://localhost:3000 |
| AlgaNews CMS   | alganews-cms:80 | http://localhost:3001 |
| AlgaNews Admin   | alganews-admin:80 | http://localhost:3002 |
| AlgaNews API  | alganews-api:8080 | http://localhost:8080 |
| AlgaNews Auth Server  | alganews-api:8081 | http://localhost:8081 |
| Banco de dados MySQL  | mysql://alganews-mysql-database:3306 | mysql://localhost:3316 |

_Observação:_ O único serviço não exibo na lista é o _alganews-setup-local_, 
ele tem o objetivo de configurar armazenamento de arquivo local, e não possui portas de acesso. 

## Senhas de acesso

Alguns serviços requerem autenticação, todos os acessos são gerenciados pelo **Auth Server** (com exceção do banco de dados),
 utilizando __OAuth2__ junto ao **JWT** 

Existem três tipos de usuários na **AlgaNews**, os **editores**, **gerentes** e os **assistentes**, cada um com um nível de acesso.

### Acessos de editores
Os acessos abaixo podem ser utilizados nos serviços **AlgaNews CMS**, **Swagger UI**, **API** e **Auth Server**.

| E-mail | Senha |
| --- | --- |
| manoel.loja@gmail.com | alganews |
| email.teste.debora@gmail.com | alganews |
| email.teste.carlos@gmail.com | alganews |

### Acessos de administrador
Os acessos abaixo podem ser utilizados nos serviços **AlgaNews Admin**, **Swagger UI**, **API** e **Auth Server**.

| E-mail | Senha |
| --- | --- |
| joao.ger@alganews.com.br | alganews |
| maria.vnd@alganews.com.br | alganews |

### Acessos de assistentes
Os acessos abaixo podem ser utilizados nos serviços **AlgaNews Admin**, **Swagger UI**, **API** e **Auth Server**.

| E-mail | Senha |
| --- | --- |
| jose.aux@alganews.com.br | alganews |
| sebastiao.cad@alganews.com.br | alganews |

### Acesso do banco de dados
Diferente dos acessos de usuários do sistema **AlgaNews**, este acesso é somente utilizado para o banco de dados.

| Usuário | Senha |
| --- | --- |
| root |  |

## Alterando configurações dos containers
Existem algumas configurações que podem ser alteradas para, 
afim de por exemplo desabilitar a segurança na API ou desabilitar o *reset* do banco de dados.

### Tabela de configurações do Alganews API

A tabela abaixo mostra as variáveis do container e seus exemplos de configuração:

| Variável | Descrição da variável | Valor | Descrição da valor |
| --- | --- | --- | --- |
| SPRING_FLYWAY_LOCATIONS | Scripts de banco de dados |  classpath:db/migration,classpath:db/testdata | Configuração do schema do banco com reset | 
| | |  classpath:db/migration | Configuração do schema do banco sem o reset |
| SPRING_PROFILES_ACTIVE | Perfil de configuração da aplicação | docker | Perfil padrão | 
|  | | chaos-request | Perfil para utilização do Chaos nos requests |  


### Simulando erros nas requisições
A API do *AlgaNews* possui o sistema de **Chaos**, 
para ativá-lo, altere o perfil da aplicação (variável *SPRING_PROFILES_ACTIVE* do *docker-compose.yml*) para **chaos-request**.

Em seguida utilize um dos valores a da tabela a seguir, como um *query param* na URL, chamado de **chaos** durante uma requisição.

## Tipos de erros do Chaos
| Valor | Descrição | Código HTTP da resposta |
| ----- | --------- | ----------------------- |
| model | Envia um *JSON* vazio na resposta | 200 |
| timeout | Simula um tempo de resposta longo de dois minutos  | 200 |
| service | Simula erro de violação de regra de negócio | 400 |
| not-found | Simula recurso não encontrado | 404 |
| internal | Simula erro interno | 500 |

