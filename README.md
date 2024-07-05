# Desafio Front-End 
Bem-vindo ao meu projeto de desafio de front-end Este projeto tem como objetivo criar uma aplicação que exibe detalhes de restaurantes e seus respectivos menus, permitindo que os clientes vejam cada item e os adicionem ao carrinho de compras.

## Visão Geral
Neste desafio, construí uma aplicação utilizando React TypeScript, onde os usuários podem navegar pelos menus dos restaurantes e adicionar itens ao carrinho de compras. 
O projeto foi hospedado no Netlify para demonstração pública.

 * ### Deploy do Projeto: https://desafio-fej24.netlify.app/
 

### Tecnologias Utilizadas
 - React TypeScript: Utilizei React com TypeScript para garantir a tipagem estática e melhorar a manutenção do código.
 - Tailwind CSS: Optei por Tailwind CSS para facilitar a estilização devido ao curto prazo de execução do projeto.
 - API Proxy allOrigins: Utilizei o proxy allOrigins para contornar restrições de CORS e acessar a API de produtos e configurações.
 - Netlify: O projeto está hospedado no Netlify para demonstração pública e facilitar o acesso.

###Estrutura de Pastas
A estrutura de pastas do projeto é organizada da seguinte forma:

```css
desafio-frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Carrinho.tsx
│   │   ├── CarrinhoMobile.tsx
│   │   ├── Produto.tsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Menu/
│   │   │   ├── index.tsx
│   │   │   ├── Product.tsx
│   │   │   └── ...
│   │   ├── Contact/
│   │   │   ├── index.tsx
│   │   │   └── ...
│   │   └── ...
│   │
│   ├── redux/
│   │   ├── storeCounter.tsx
│   │   ├── CartItems.tsx
│   │   ├── ItemCounter.tsx
│   │   └── ...
│   │
│   ├── App.tsx
│   ├── index.tsx
│   ├── styles.css
│   └── ...
│
├── .gitignore
├── package.json
└── README.md
```
### Como Rodar o Projeto Localmente
Para rodar o projeto localmente, siga os passos abaixo:

### Clone o Repositório:

```bash
git clone https://github.com/brunofranciscu/desafio-frontend.git
cd desafio-frontend
```

### Instale as Dependências:

```bash
npm install
```

### Rodar o Servidor de Desenvolvimento:

```bash
npm start
```
### Acesse no Navegador:
Abra o seu navegador e visite http://localhost:3000.

Contribuições e Melhorias Futuras
Este projeto foi desenvolvido dentro de um prazo limitado, portanto, existem oportunidades para melhorias e expansões, como:

Implementação de mais funcionalidades no carrinho de compras, como remoção de itens e cálculo de descontos.
Melhoria na responsividade e acessibilidade da aplicação.
Testes automatizados para garantir a robustez do código.
Sinta-se à vontade para explorar o código-fonte, fazer fork do repositório e enviar suas contribuições através de pull requests.
