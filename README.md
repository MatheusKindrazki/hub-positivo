<h1 align="center">
  <br>
  <img src="https://editorati.visualstudio.com/62146a26-1398-4837-9c09-d05b262140cc/_apis/git/repositories/5f530fe6-eea4-4cfb-9467-171f7045552c/items?path=%2Fdocs%2Ficons%2Flogo.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=develop&resolveLfs=true&%24format=octetStream&api-version=5.0" alt="Hub Digital" width="100">
  <br>
  Hub Digital
  <br>
</h1>

<h4 align="center">
  O Hub é a Home Page do Positivo On. Este repositório serve, de maneira unificada, todas as soluções didáticas oferecidas ao usuário em uma única página.
  ⚡️🔥
</h4>

<br>

<p align="center">
  <img src="https://img.shields.io/badge/yarn-v1.22.5-blue" alt="Yarn version" />

  <img alt="Node version" src="https://img.shields.io/badge/node-14%2B-green">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%238257E6">

  <img alt="Deploy" src="https://editorati.visualstudio.com/Produtos%20Digitais/_apis/build/status/PipelinesAntigos/hubdigital-front?branchName=master">
</p>

<br>

<p align="center">
  <img src="https://editorati.visualstudio.com/62146a26-1398-4837-9c09-d05b262140cc/_apis/git/repositories/5f530fe6-eea4-4cfb-9467-171f7045552c/items?path=%2Fdocs%2Ficons%2Fcoverage_branches.svg&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=develop&resolveLfs=true&%24format=octetStream&api-version=5.0&download=false" alt="Coverage branches" />
  <img src="https://editorati.visualstudio.com/62146a26-1398-4837-9c09-d05b262140cc/_apis/git/repositories/5f530fe6-eea4-4cfb-9467-171f7045552c/items?path=%2Fdocs%2Ficons%2Fcoverage_functions.svg&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=develop&resolveLfs=true&%24format=octetStream&api-version=5.0&download=false" alt="Coverage statements" />
  <img src="https://editorati.visualstudio.com/62146a26-1398-4837-9c09-d05b262140cc/_apis/git/repositories/5f530fe6-eea4-4cfb-9467-171f7045552c/items?path=%2Fdocs%2Ficons%2Fcoverage_line.svg&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=develop&resolveLfs=true&%24format=octetStream&api-version=5.0&download=false" alt="Coverage lines" />
  <img src="https://editorati.visualstudio.com/62146a26-1398-4837-9c09-d05b262140cc/_apis/git/repositories/5f530fe6-eea4-4cfb-9467-171f7045552c/items?path=%2Fdocs%2Ficons%2Fcoverage_line.svg&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=develop&resolveLfs=true&%24format=octetStream&api-version=5.0&download=true" alt="Coverage functions" />
</p>

# Sumário

1. **[Clonando o repositório](#clonando-o-repositório)**
2. **[Instalando dependências](#instalando-dependências)**
3. **[Removendo dependências](#removendo-dependências)**
4. **[Configurando as variáveis de ambiente](#configurando-as-variáveis-de-ambiente)**
5. **[Inicializando](#inicializando)**
6. **[Estrutura monorepo](#estrutura-monorepo)**
7. **[Principais dependências](#principais-dependências)**
8. **[Guia de estilo](#guia-de-estilo)**
9. **[Versionamento](#versionamento)**
10. **[Testes](#testes)**
11. **[Padronização](#padronização)**
12. **[Como contribuir](#como-contribuir)**
13. **[Changelog](#changelog)**

# Clonando o repositório

O **primeiro passo** para inicializar o projeto é fazer a clonagem do repositório remoto. Se não houver uma chave SSH cadastrada siga estas [instruções](https://docs.microsoft.com/pt-br/azure/virtual-machines/linux/mac-create-ssh-keys).

No terminal de sua máquina, faça:

```bash
git clone editorati@vs-ssh.visualstudio.com:v3/editorati/Produtos%20Digitais/HubDigitalFront
```

### 1.1. **Uma alternativa ao clone com SSH:**

Alternativamente, há a opção de fazer a clonagem do repositório via HTTPS.

```bash
git clone https://editorati.visualstudio.com/Produtos%20Digitais/_git/HubDigitalFront
```

Haverá a necessidade de autenticar-se através do terminal, como mostra a imagem abaixo:

![README%20md%2019b2c3ae73c343e19c7ac9209dd44294/auth.png](README%20md%2019b2c3ae73c343e19c7ac9209dd44294/auth.png)

Após inserir o Username e Password (credenciais **PESSOAIS** geradas através do Azure devOps) o projeto estará disponível localmente.

*Clonar o repositório utilizando chave SSH não requer a geração de credenciais para autenticação, sendo necessário apenas que a chave esteja cadastrada em seu perfil da Azure Devops.*


# Instalando dependências

O **segundo passo** é fazer a instalação das dependências, utilizando Yarn.

```bash
yarn install
```

*Se finalizado sem erros, todas as dependências foram instaladas com sucesso.*

### 2.1. Instalando as dependências individuais no hub-web

Para instalar uma dependência individual do hub-web:

```bash
yarn workspace @hub/web add NOME_DA_DEPENDÊNCIA
```

# Removendo dependências

Para remover uma dependência individual do hub-web:

```bash
yarn workspace @hub/web remove NOME_DA_DEPENDÊNCIA
```

# Configurando variáveis de ambiente

Antes de inicializar, precisa-se que as [**variáveis de ambiente](https://dev.to/guiselair/utilizando-variaveis-de-ambiente-com-create-react-app-5ckc)**  sejam configuradas no repositório. Elas, por padrão, não vêm configuradas na clonagem do repositório remoto.

No diretório `packages/apps/hub-web/src` existe um arquivo nomeado `.env.exemple` . Nele há um exemplo das variáveis de ambientes necessárias para que o projeto funcione. **Preencha todas as variáveis.**

Em seguida, renomeie o arquivo `.env.exemple` para `.env.development.local` ou simplesmente crie um arquivo com o nome `.env.development.local` e copie as variáveis de ambiente preenchidas para ele.

Exemplo de uma variável de ambiente preenchida corretamente:

```
REACT_APP_HUB_TITLE='Hub Positivo'
```

# Inicializando

Neste momento já é possível inicializar o projeto localmente. Na raiz do projeto digite:

```bash
yarn workspace @hub/web start
```

*Espera-se que o navegador abra na porta padrão do React (3000) com o projeto inicializado na tela de Login do Hub.*

# Estrutura Monorepo

O projeto foi construído em arquitetura monorepo. O que implica na união de todos os repositórios que compõem a aplicação em um só, e impacta diretamente na estrutura de pastas utilizada.

Com exclusão da pasta node_modules, o diagrama abaixo ilustra a organização dos diretórios do projeto:

```bash
packages
    ├── api
    │   └── src
    ├── apps
    │   ├── header-inject
    │   └── hub-web
    │       ├── public
    │       └── src
    │           ├── assets
    │           ├── components
    │           ├── hooks
    │           ├── layouts
    │           ├── pages
    │           ├── routes
    │           ├── services
    │           ├── store
    │           ├── styles
    │           ├── @types
    │           ├── utils
    │           └── validators
    ├── common
    │   ├── components
    │   ├── hooks
    │   ├── layout
    │   └── utils
    └── eslint
```

Na composição das pastas podemos identificar pontos importantes a serem ressaltados. A pasta *common* guarda os recursos reutilizáveis do monorepo, como componentes e hooks genéricos que são utilizados por outras soluções além do Hub.

No diretório *api* temos a configuração das chamadas às APIS utilizadas no funcionamento do Hub, através do *[axios](https://www.npmjs.com/package/axios).*

Na pasta *apps* temos os arquivos relacionados ao Hub como solução individual, que se integram entre si mas não são exportados para outras soluções que compõem o monorepo.

# Principais dependências

### 7.1. `redux`

O [Redux](https://redux.js.org/introduction/getting-started) é uma biblioteca para armazenamento de estados de aplicações Javascript. Através dela é possível lidar com o gerenciamento de estado global de uma aplicação, além de compartilhá-los entre vários componentes diferentes.

**7.1.1. `redux-saga`**

[Redux Saga](https://redux-saga.js.org/) é uma biblioteca que foca em fazer os efeitos colaterais como chamadas assíncronas para buscar dados em uma API, transformações impuras como acessar o cache do navegador etc. em aplicações React/Redux serem mais fáceis e simples de se criar e manter.

**9.1.2.** `**react-redux**`

[React Redux](https://react-redux.js.org/introduction/quick-start) é a biblioteca oficial que combina React com Redux. Ela permite, através de hooks próprios, que os componentes React leiam dados de uma store Redux e despache ações para a store, dessa forma atualizando os dados armazenados no estado global da aplicação.

### 7.2. `react-router-dom`

O [React Router Dom](https://reactrouter.com/web/guides/quick-start) é a biblioteca padrão de roteamento do React.js que mantém a interface do usuário em sincronia com o valor atual da URL acessada. Ela tem uma API poderosa que traz a possibilidade de roteamento dinâmico, da utilização de hooks, do manuseio das rotas e muitas outras abordagens. ****

### 7.3. `lodash`

[Lodash](https://lodash.com/docs/) é uma biblioteca JavaScript que fornece funções utilitárias para operações comuns usando o paradigma de programação funcional. A [Lodash](https://lodash.com/docs/) torna o JavaScript mais fácil ao assumir o incômodo de trabalhar com matrizes, números, objetos, strings, etc. e é ótima para lidar com iterações, manipulação e teste de valores, além de facilitar a criação de funções compostas.

## Warning: Atualização de dependências

As Dependências a seguir **não são recomendadas** atualização:

**Husky**

A Atualização do husky causa o não funcionamento do arquivo de configuração presente na raiz do projeto.

**History**

A versão 5+ do history torna incompatível a comunicação dentre o connected router dom e o Hash router.

**React router | Connected Router**

A atualização de quaisquer libs de rotas tornam necessária uma nova configuração de rotas dentro do projeto, tornando inviável a manutenção futura.

# Guia de estilo

Para estilização dos componentes React, o projeto utiliza duas principais dependências:

### 8.1. `chacka-ui`

[Chakra UI](https://chakra-ui.com/docs/getting-started) é uma biblioteca de componentes simples, modular e acessível que fornece os blocos de construção de que uma aplicação precisa para construir suas aplicações React.

O hub-web utiliza majoritariamente esta biblioteca para fazer o encapsulamento de estilos e temas nos componentes React da aplicação. Isso dar-se pela facilitação da estilização dos mesmos no próprio escopo do componente (através de props). Veja um exemplo de uso abaixo:

***Trecho de código 1**:*

```jsx
import React from 'react'
import { Box as BoxChakra, BoxProps as Props } from '@chakra-ui/react' //Importando componentes
export interface BoxProps extends Props {
  size?: Props['width']
}
const Box: React.FC<BoxProps> = ({ children, ...rest }) => {
  return <BoxChakra {...rest}>{children}</BoxChakra>
}
// Criação de componente 'Box' que recebe, através de props, toda estilização e childrens.
...
```

*Componente disponível em `packages/commom`.*

No diretório `*packages/commom*` está disponível a grande maioria dos componentes criados com o Chacka UI. Dessa forma é possível prover utilitários comuns entre a aplicação, sem depender de uma estilização específica, deixando isso por responsabilidade de quem for utilizar este componente *genérico*.  [O trecho de código 2]() demonstra como o [trecho de código 1]() é utilizado.

**Trecho de código 2:**

```jsx
<Box p="6">
  <GoBack colorScheme="blue" onClick={handleGoBack}>
    O link não pôde ser enviado
  </GoBack>
  <Box d="flex" flexDir="column">
    <Text fontSize="md" color="gray.500" mb="6">
      Entre em contato com sua escola para realizar essa requisição
    </Text>
    <Button
      colorScheme="blue"
      size="lg"
      onClick={() => history.push('/login')}
    >
      Voltar para o login
    </Button>
  </Box>
</Box>
...
```

*Código disponível em `packages/apps/hub-web/src/pages/Auth/ForgotPassword/index.tsx`*

Após importar o componente **Box** para utilização na página de Forgot Password, é possível observar que a estilização é feita através de props que, ao chegar no componente genérico, será interpretado como `{ ...rest }` , ou seja, sendo possível a utilização de quaisquer estilos não previamente definidos, deixando o componente totalmente reutilizável.

**Nota: Nos casos em que os estilos deixam os componentes muito verbosos, entende-se como boa prática criar um arquivo próprio para estilização chamado, por conversão, de `styles.ts` que utiliza a biblioteca styled-components.**

### 8.2.`styled-components`

[Styled Components](https://styled-components.com/docs) é uma biblioteca para React e React Native que permite a utilização de estilos ao nível de componente em uma aplicação. Eles são escritos em uma mistura de JavaScript com CSS.

No hub-web a styled-components é utilizada nos casos em que a estilização através do [Chacka UI]() fica muito verbosa. Nestes casos, como boa prática, cria-se um arquivo chamado `styles.ts` para criação dos estilos. Após isso, faz-se a utilização dele através do encapsulamento dos componentes que devem ser afetados por sua estilização, como mostra o Trecho de código 4, que importa os estilos do Trecho de código 3.

**Trecho de código 3:**

```jsx
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 73px);

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  padding: 10px;

  @media (min-width: 480px) {
    padding: 0;
  }
`
```

*Código disponível em `packages/apps/hub-web/src/layouts/Auth/styles.ts`*

Este código demonstra a criação de um componente `Container` que utiliza como base uma `div` que possui toda a estilização descrita no escopo que está entre as crases ( **`** ).

**Trecho de código 4:**

```jsx
<Container>
  <BarLoader width="100%" height="4px" loading={loading} />
  <Logo />
  <CardBox mt="2.1875rem" maxWidth="25.9375rem">
    {children}
  </CardBox>
</Container>
...
```

*Código disponível em `packages/apps/hub-web/src/layouts/Auth/index.tsx`*

Neste trecho demonstra-se como o `Container` criado no [Trecho de código 3]() encapsula todos os componentes que deseja-se estilizar. Simples e limpo.

# Padronização

Visando manter a organização, e um mínimo de qualidade, o desenvolvimento deste projeto conta com a aplicação de alguns padrões:

### 9.1. Padrões de branch e Commit messages

O versionamento do projeto segue o modelo de branches de [Vincent Driessen](https://nvie.com/posts/a-successful-git-branching-model/), aplicado com o uso do [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/index.pt_BR.html).

A criação de novas branches deverá ser feita através da CLI do Git Flow, cujos comandos estão expressos no cheatset do link acima.

A nomenclatura das branches respeita o padrão declarativo do projeto a depender do propósito da modificação trazida em seu conteúdo, iniciando com:

- `Feature`
- `Bugfix`
- `Hotfix`
- `Release`

Os commits no repositório do Hub estarão sujeitos à análise do [Husky](https://www.npmjs.com/package/husky), devendo respeitar as regras de estilo, os testes do projeto e por fim à padronização das mensagens de commit utilizadas no versionamento do Hub.

O commit deverá seguir o fluxo da CLI do Husky para ser feito, após avançar pelas etapas da interface, será gerado um commit personalizado de acordo com o padrão esperado no projeto, como consta na imagem abaixo:

![README%20md%2019b2c3ae73c343e19c7ac9209dd44294/Captura_de_tela_de_2021-02-09_13-52-36.png](README%20md%2019b2c3ae73c343e19c7ac9209dd44294/Captura_de_tela_de_2021-02-09_13-52-36.png)

### 9.2. Regras de estilo

O projeto conta com padronização de estilo própria. É necessário estar de acordo com as regras de estilo para que seja possível realizar um commit, caso contrário a modificação ficará travada na fase *lint staged* do Husky.

# Testes

Atualmente o projeto conta com um coverage de testes de 75%. Os testes são aplicados às páginas, layouts, hooks e componentes  predominantemente com o uso de [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), assim como os middlewares, validadores, módulos da store e funções utilitárias são testadas unitariamente com [Jest](https://jestjs.io/docs/en/getting-started).

Ressaltamos que para correta execução dos testes se faz necessário, no mínimo, o uso do [Node](https://nodejs.org/en/) v14.15.4.

No trecho de código 5 pode-se observar um caso simples de teste que utiliza React Testing Library, que testa os componentes Accordion e UnmountClosed.

**Trecho de código 5:**

```jsx
import React from 'react'

import { render } from '@hub/test-utils'

import { Accordion, UnmountClosed } from '../../components/Accordion'

describe('Accordion an UnmountClosed components', () => {
  it('Accordion being rendered on canvas', () => {
    const wrapper = render(<Accordion isOpened>hub</Accordion>)
    expect(wrapper).toMatchSnapshot()
  })

  it('UnmountClosed being rendered on canvas', () => {
    const wrapper = render(<UnmountClosed isOpened>hub</UnmountClosed>)

    expect(wrapper).toMatchSnapshot()
  })
})
```

*Código disponível em`packages/commom/__tests__/components/Accordion.spec.tsx`*

No primeiro teste (*it*) se renderiza o componente Accordion com o "hub" inserido como children, espera-se que ele tenha sido renderizado corretamente.

# Como contribuir

No arquivo`docs/CONTRIBUTING.md` presente na raiz do projeto encontra-se a explicação de como contribuir com o projeto, desde como ajudá-lo a melhorar diretamente a como enviar feedback.

# Changelog

O histórico de alterações no código encontra-se no arquivo`docs/CHANGELOG.md` , este arquivo possui todas as **features**, **bug fixes**, **hot fixes** e **releases** e está na raiz do projeto.
