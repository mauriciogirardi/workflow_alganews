# React moderno: O que você precisa saber para começar com React em 2020

Não é de hoje que o React.js é o queridinho das empresas de desenvolvimento de software quando se fala em mobile e front-end web, e isso fez com que surgissem inúmeras vagas relacionadas à tecnologia.

Mas nem todo profissional ou iniciante da área de desenvolvimento tem domínio da linguagem de programação JavaScript (que é a base do React.js), e acabam com medo de iniciar com a tecnologia.

Se você é um deles, seus problemas acabaram agora. Neste artigo vamos abordar **tudo que você precisa saber sobre React**, sem a necessidade de muito conhecimento em JavaScript.

## Índice

- O que é React.js
  - Framework ou Biblioteca?
  - Metodologia de componentes
- Como funcionam os componentes no React.js
  - Propriedades no componente React
- Como renderizar componentes React
- Virtual DOM
- Explicações finais
  - Por que não focamos mais em componentes baseados em classe?
  - Por qual motivo temos que importar o pacote React antes utilizar JSX?



## O que é o React.js

Não podemos pular essa parte de jeito nenhum! Para usar o React.js você precisa, antes de tudo, entender o que é e como funciona.

React.js é uma biblioteca de renderização de componentes. Simples assim.

### Framework ou Biblioteca?

Esse é um questionamento muito comum, especialmente no caso do React.js. Antes de responder, vamos entender o que são frameworks e bibliotecas, respectivamente:

- Framework é um conjunto de ferramentas gerais preparado para ajudar o desenvolvedor a criar aplicações, geralmente, robustas e com um nível de padronização e abstração um pouco maior que o desenvolvimento diretamente com a linguagem. Exemplos de frameworks no mercado: Laravel, Nest, Angular, etc.

- Uma biblioteca é uma ferramenta especializada na resolução de um problema específico. Geralmente, bibliotecas são utilizadas dentro de frameworks.

Tendo isso em mente e sabendo o que o React.js faz, fica fácil de entender que ele é uma biblioteca de renderização de componentes.

Mas por que, geralmente, se referem à ele como framework? A resposta é simples: dificilmente utilizamos somente a biblioteca React.js nos projetos. Geralmente utilizamos outras bibliotecas, para resolvermos problemas comuns, como roteamento (React Router) e gerenciamento de estado (Redux).

O ponto é: o nome React se tornou mais que uma biblioteca, se tornou um ecossistema completo.

### Metodologia de componentes

A ideia de trabalhar com a **metodologia de componentes** vem se tornado muito frequente no desenvolvimento, pois facilita muito na manutenção futura e reaproveitamento.

Componentes são baseados em 3 pontos:
- UI: elemento que será renderizado
- Props: propriedades que serão passadas ao componente por quem for utilizá-lo
- Estado: dados que aquele componente terá internamente

Algumas vantagens de trabalhar com a metodologia de componentes:

- Componentes organizados em arquivos separados
- Componentes podem ser reutilizados em diversos lugares com estados isolados
- O mesmo componente pode ter variações para cada lugar onde é utilizado, através de propriedades
- Facilidade na hora de aplicar e dar manutenção em lógica de renderização (caso alguma propriedade seja `false`, esconda tal parte da UI)

Então, concluímos que, atualmente, trabalhar com a metodologia de componentes é o que nos torna mais produtivos, e o React.js é a biblioteca que vai nos ajudar a concretizar isso de forma altamente performática e simples.

## Como funcionam os componentes no React.js

Componentes no React são escritos em arquivos JavaScript comuns, através de uma extensão da linguagem chamada JSX. O JSX é, basicamente, uma forma de escrever linguagem de marcação (extremamente semelhante ao HTML) de componentes dentro do JavaScript, podendo aproveitar todos os recursos da linguagem para aplicar lógica na renderização. Se você quiser saber mais sobre JSX, acesse o melho lugar para isso é a [documentação oficial do JSX no React](https://pt-br.reactjs.org/docs/introducing-jsx.html).

Um componente React pode ser escrito da seguinte forma:

``` jsx
import React from 'react' // necessário para usar JSX no arquivo

function HelloWorldComponent (props) {
  return <div className="HelloWorld">Hello, World!</div>
}
```

Ou, também, da seguinte forma:

``` jsx
import React from 'react' // necessário para usar JSX no arquivo

class HelloWorldComponent extends React.Component {
  render() {
    return <div className="HelloWorld">Hello, World!</div>
  }
}
```

O primeiro exemplo é de um componente funcional. É uma função que retorna um JSX. Já o segundo, é um componente baseado em classe. Ele extende de uma classe `React.Component`, que nos possibilita utilizar estado, ciclos de vida, e muito mais.

O mercado está abandonando o uso de componentes baseados em classe e focando em componentes funcionais, por conta dos Hooks e outras facilidades. No final do artigo tem uma explicação técnica para isso. Por esse motivo, todo o artigo será escrito pensando em componentes funcionais. 

Na primeira linha do primeiro exemplo, fazemos a importação do pacote React, que é necessário para a utilização do JSX dentro do arquivo (a explicação técnica para isso vai estar no final do artigo).

Em seguida criamos um método com o nome do nosso componente ("HelloWorldComponent", no caso) que retorna um elemento JSX.

**Atenção:** É importante que nosso componente esteja dentro de uma função que retorna o JSX, e não em uma constante que retorna diretamente o JSX, pois o React espera o método para ser executado, e não a execução do método em si, para ser reativo.

### Propriedades no componente React

Se você prestou atenção no nosso código anterior, deve ter percebido que a função recebia um parâmetro `props`. Isso significa que podemos enviar e receber propriedades em nossos componentes, e essas propriedades estarão disponíveis no primeiro parâmetro da função do nosso componente.

Vamos a um exemplo prático:

``` jsx
import React from 'react' // necessário para usar JSX no arquivo

export function HelloWorldComponent (props) {
  return (
    <div
      style={{ color: props.color || 'black' }}
      className="HelloWorld"
    >
      Hello, World!
    </div>
  )
}
```

Refatoramos nosso componente de forma a dar suporte para uma propriedade `color` e, então, usamos o valor dessa propriedade dentro do *style* da nossa div. Caso essa propriedade não seja passada, ou venha como undefined, definimos um valor padrão para  `"black"`, usando o [operador lógico OR](https://www.w3schools.com/js/js_comparisons.asp) (`||`).

Agora podemos chamar nosso componente e passar nossa propriedade:

``` jsx
import React from 'react' // necessário para usar JSX no arquivo
import { HelloWorldComponent } from './HelloWorldComponent' // importando nosso componente

function App () {
  return (
    <HelloWorldComponent color="red" />
  )
}
```

Irá renderizar nosso componente com a o texto da cor vermelha. Mas, caso a gente não passe a propriedade color, o valor padrão (`"black"`, no nosso caso) será assumido.

## Como renderizar componentes React

Você deve estar se perguntando nesse exato momento: "onde eu digito tudo isso? como vejo o resultado?". E é agora que vamos por a mão na massa!

Iniciar um projeto react é muito simples. Abra seu terminal preferido no seu diretório de desenvolvimento e execute o comando:

``` bash
npx create-react-app my-app
```

e aguarde uns 2 minutos. Isso vai gerar um novo diretório chamado `my-app` na raiz de onde executou o comando.

Após finalizar a execução desse comando, abra o diretório com seu editor ou IDE preferido. Você vai ver uma estrutura parecida com essa:

- src
  - App.css
  - App.js
  - App.test.js
  - index.css
  - index.js
  - logo.svg
  - serviceWorker.js
  - setupTests.js

Vamos entender para que serve cada arquivo:

### index.js

Arquivo inicial que será executado na nossa aplicação. Tudo que for chamado na nossa aplicação, estará ali. Incluindo nosso `App.js`. Ideal para abstrair  configurações gerais do projeto.

### App.js

Componente raiz da nossa aplicação. Este componente que vai ser renderizado dentro do index, e ele se encarrega de procurar aninhar todos os outros componentes.

### serviceWorker.js, setupTests.js e App.test.js

`serviceWorker.js` é arquivo que vem por padrão caso queira ativar o modo PWA no projeto. `setupTests.js` é um arquivo de configuração do Jest, para testes automatizados. `App.test.js` é um arquivo de teste automatizado. Abordamos sobre ambos os assuntos no [nosso curso completo de React](https://danielbonifacio.com.br). Por hora, não vamos nos preocupar com isso.

Sugiro que limpe seu ambiente de trabalhado deletando os arquivos:

- logo.svg (remova a importação e utilização na tag `<img />` no arquivo `App.js`)
- serviceWorker.js (remova a importação e utilização no final do arquivo `index.js`)
- setupTests.js
- App.test.js

Agora basta executar o comando `npm start` e começar a brincar com seu projeto React.

## Virtual DOM

Antes de antes de entender o que é o Virtual DOM, precisamos entender o que é o DOM em si. Temos um [artigo completo sobre DOM](#artigo-dom), mas vamos resumir ele um pouco sobre ele aqui.

Basicamente, todos os elementos que você cria com HTML, precisam ser interpretados renderizados. Porém, para ter acesso a cada elemento individualmente, por meio do JavaScript, os navegadores armazenam uma cópia da estrutura hierárquica do nosso HTML em um formato que pode ser acessado pelo JavaScript. Então, concluímos que o DOM é uma representação do nosso HTML que pode ser acessada e manipulada dentro do JavaScript.

Porém, executar operações constantemente nesse grande objeto, se torna algo complexo e lento. Por esse motivo, o Facebook criou o chamado Virtual DOM. Ele é, basicamente, uma representação mais simples e mais leve do DOM, que pode ser manipulada de forma mais performática e, somente quando necessário, refletir as operações no DOM original.

Essa é uma informação apenas teórica, pois você não precisa se preocupar em aplicar o Virtual DOM, pois é abstraída pelo pacote `react-dom` (vem por padrão no `npx create-react-app`).


## High Order Components

## Explicações finais

### Por que não focamos mais em componentes baseados em classe?

Componentes baseados em classe foram extremamente importantes no desenvolvimento com React há alguns anos. Antigamente, apenas componentes baseados em classe podiam ter estado e executar ações no que a gente chama de ciclo de vida do componente.

#### Ciclo de vida do componente React

Componentes possuem um ciclo de vida, e, para cada evento do ciclo, podemos executar métodos específicos.

![Lifecycle react](https://miro.medium.com/max/3348/1*cEWErpe-oY-_S1dOaT1NtA.jpeg)

Ou seja, com componentes baseados em classe, podemos executar algo assim que o componente for montado, ou, por exemplo, alguma propriedade ou estado foi alterado, da seguinte forma:

```jsx
import React from 'react'

class CoolComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      amICool: true
    }

  }

  componentDidMount() {
    window.alert('WoW! I just got mounted! Ihuuuuu')
    setTimeout(() => {
      this.setState({ amICool: false })
    }, 5000)
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.amICool !== this.state.amICool) {
      window.alert('My cool status has been changed.')
    }
  }
  
  render() {
    return <div>
      {
        this.state.amICool
          ? 'I am a cool component. Just that.'
          : 'Maybe I am not so cool :C'
      }
    </div>
  }
}
```

O código acima usa componente baseado em classe para observar se o estado `amICool` do componente é alterado, e, caso ele seja, emite um alerta. Também emite um alerta inicial, quando o componente é criado, e programa uma alreação no estado para os próximos 5 segundos.

Muito legal e simples de entender. Porém, muito verboso. A gente consegue fazer isso com Hooks de forma mais simples:

``` jsx
import React, { useState, useEffect } from 'react'

function CoolComponent () {
  const [amICool, setAmICool] = useState(true)
  
  useEffect(() => {
    window.alert('WoW! I just got mounted! Ihuuuuu')
    setTimeout(() => setAmICool(false), 5000)
  }, [])

  useEffect(() => {
    window.alert('My cool status has been changed.')
  }, [amICool])

  return return <div>
    {
      this.state.amICool
        ? 'I am a cool component. Just that.'
        : 'Maybe I am not so cool :C'
    }
  </div>
}
```

Os Hooks trabalham de forma mais inteligente, usando a metodologia de dependência. E só podemos utiliza Hooks dentro de componentes funcionais. E esse é um dos motivos pelo qual o mercado está focando em componentes funcionais.

Isso não significa que componentes baseados em classe estão obsoletos ou algo do tipo. Ainda são válidos e terão um bom suporte. Apenas significa que existe uma outra forma de trabalhar com ciclos de vida e reatividade, com componentes funcionais, e isso é ótimo.

### Por qual motivo temos que importar o pacote React antes utilizar JSX?

A resposta para isso é bem simples, e tem a ver com o compilador de JavaScript babel. Ao retornar uma tag JSX, o compilador renderiza:

``` jsx
const a = <div>Hello, World</div>
```

para:

``` js
const a = React.createElement(
  "div",
  null,
  "Hello, World"
);
```

E, por isso, você precisa importar o React, pois, por debaixo dos panos, se usa o `React.createElement`. Se quiser se aprofundar mais sobre o compilador babel, e onde ele afeta no desenvolvimento, temos um [curso completo de React.js](https://danielbonifacio.com.br) que vai elevar todas as suas skills sobre o ecossistema React/JavaScript.

---
