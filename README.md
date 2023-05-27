<h1 align="center" >API Escola Organizada</h1>

<h2> Este é um projeto pessoal, que será integrado com o projeto <a href="https://github.com/Alexandresfi/EscolaOrganizada"> Escola Organizada </a> </h2>

<h3> 
  A função desta API é guardar e gerenciar informações sobre a vida acadêmica dos estudantes de qualquer escola de ensino regular. 
Está API conecta-se a um banco de dados Postgress 🐘, sendo possível criar, ler, atualizar e deletar informações do dado de dados.
<br> <br>
> obs: atualmente o projeto está em pausado, pois a heroku não possui mais hospedagem gratuíta, mas em breve voltarei a coloca-lo em produção.
</h3>

<h2>
    🔎 Acessando as informações da API
</h2>

<h3> 
 Todas as rotas são protegidas, sendo assim, é necessário fazer login para ter acesso a API, os acessos são divididos em três tipo: <br>
  - Admin "este usuário têm acesso a todas as rotas do projeto e tem permições para ler, criar, atualizar e deletar informações do banco de dados"<br>
  - Teacher "Este usuário pode atualizar informações dos alunos, como notas e frequência, por exemplo"<br>
  - Responsible "Este usuário por sua vez, tem permissão apenas de ver as informações dos filhos
</h3>

<h2> 
 💻 tecnologias / bibliotecas :
</h2>

-  <strong> `Node JS` <strong>
-  <strong> `React Router DOM` <strong>
-  <strong> `Postgress` <strong>
-  <strong> `Sequelize` <strong>
-  <strong> `YUP` <strong> : validações de dados
-  <strong> `Token JWT` <strong>
-  <strong> `Yarn`<strong>
-  <strong> `Hospedagem` <strong> : Heroku
-  <strong> `Estrutura de pastas` <strong> : MVC
-  <strong> `Docker` (localmente) <strong>
-  <strong> `Gitflow` <strong>
-  <strong> `Padronização de códigos` <strong> : prettier e eslint

<h2>
    📋 Pré-requisitos
</h2>

<p> Você precisará ter o node e o git instalados na sua máquina</p>


<h2>
    🔧 Usando na sua máquina
</h2>
Abra o git bash em uma pasta da sua escolha e execute o comando:

```md
git clone https://github.com/Alexandresfi/api-escola-organizada.git
```

Em seguida vá para a pasta `/src` e abra o terminal  e execute: 

```md
yarn
```

para instalar as dependências, logo em seguida execute o comando: 

```md
yarn dev
```

para rodar a aplicações. 

> É importante que você tenha algum aplicativo no seu notebook para fazer as consultas, como por exempplo o <a href="https://www.postman.com/downloads/"> postman </a>
ou o <a href="https://insomnia.rest/download">Insommia</a> 
Tendo um desses aplicativos, basta ir na basta /src/routes.js e usar umas das rotas.
<br>
>importante: Você não vai conseguir acessar as rodas do projeto, sem ter uma conta, e para abrir uma, entre em contato comigo pelo <a href="https://www.linkedin.com/in/alexandre-nascimento-66692920a/">linkedIn</a> 
