# MyHood

Aplicação React para registrar problemas da comunidade e acompanhar seus pedidos.

## Requisitos

- Node.js e npm

## Executar

```bash
npm install
npm run dev
```

## Verificações

```bash
npm run lint
npm run build
```

## Organização

- `src/pages` contém as telas e a apresentação.
- `src/hooks` concentra o estado e os fluxos de interface/negócio.
- `src/services` isola integrações externas e acesso a dados.
- `src/components` contém componentes reutilizáveis.

## API e persistência de demonstração

O serviço usa `https://dummyjson.com/users` para apresentar exemplos fictícios
de pessoas e `https://dummyjson.com/products` para demonstrar gravações:

- `GET /users` carrega nomes e cidades fictícios para os exemplos no dashboard.
- `POST /products/add` cria um pedido.
- `PUT /products/{id}` atualiza um pedido.
- `DELETE /products/{id}` remove um pedido.

Os exemplos de pessoas são somente leitura; não representam pedidos realmente
cadastrados. Os controles de status e exclusão ficam desativados nesses itens.

A DummyJSON simula as operações de escrita e não persiste alterações no servidor.
Para que pedidos criados, editados e excluídos continuem visíveis entre telas e
recarregamentos, a aplicação guarda essas alterações locais no `localStorage` e
as combina com a lista remota. Os dados iniciais exibidos são produtos de
demonstração da API.

Nome, CPF, CEP, endereço e descrição completa do pedido não são enviados à
DummyJSON; a API recebe somente metadados genéricos de demonstração. Os detalhes
pessoais permanecem no `localStorage` deste navegador, que não é um
armazenamento seguro. Use dados fictícios nesta versão acadêmica.

Como o identificador retornado pelo `POST /products/add` não representa um
produto persistido e não pode ser usado nos endpoints subsequentes, os pedidos
criados localmente recebem um identificador local único e usam o produto de
demonstração `1` como referência para as chamadas externas de atualização e
exclusão. Isso permite exercitar todo o fluxo da aplicação sem confundir o ID
repetido de criação da API com o identificador do pedido.

O formulário também consulta o ViaCEP quando um CEP válido é informado.

## Versionamento

O projeto usa Git. Faça commits pequenos e descritivos, por exemplo:

```text
feat: integrar CRUD de pedidos com DummyJSON
fix: preservar alterações locais do dashboard
docs: explicar limites da API de demonstração
```
