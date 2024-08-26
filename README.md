# Backend da Hooray 

Esta aplicação é voltada para a criação de organizações, onde cada organização pode ter vários membros e cada membro pode ter uma função dentro da organização. Os membros poderão se elogiar uns aos outros. Facilitando a comunicação e o gerenciamento de seus superiores.

## Documentação da APi

[Documentação da API](http://localhost:3333/docs)

## Funcionalidades

### Autenticação

- [X] Deve ser capaz de autenticar usando e-mail e senha;
- [ ] Deve ser capaz de recuperar senha usando e-mail;
- [X] Deve ser capaz de criar uma conta (e-mail, nome e senha);

### Organizações

- [X] Deve ser capaz de criar uma nova organização;
- [X] Deve ser capaz de atualizar uma organização;
- [X] Deve ser capaz de encerrar uma organização;
- [X] Deve ser capaz de transferir a propriedade da organização;

### Convites

- [ ] Deve ser capaz de convidar um novo membro (e-mail, função);
- [ ] Deve ser capaz de aceitar um convite;
- [ ] Deve ser capaz de revogar um convite pendente;

### Membros

- [X] Deve ser capaz de obter membros da organização;
- [X] Deve ser capaz de obter o perfil do usuário;
- [X] Deve ser capaz de atualizar o perfil do usuário;

### Elogios

- [X] Deve ser capaz de elogiar um membro;
- [ ] Deve ser capaz de obter elogios de um membro;
- [ ] Deve ser capaz de obter elogios recebidos por um membro;
- [ ] Deve ser capaz de deletar um elogio criado;
- [ ] Deve ser capaz de atualizar um elogio criado; 


### Funções

- Proprietário (conta como administrador)
- Administrador
- Membro

## Tecnologias utilizadas

- Node.js
- Turborepo
- Prisma
- Typescript
- Fastify
- Swagger


### Tabela de Permissões

|                        | Administrador | Membro  | 
| ---------------------- | ------------- | ------  | 
| Atualizar organização  | ✅            | ❌     | 
| Deletar organização    | ✅            | ❌     | 
| Convidar um membro     | ✅            | ❌     | 
| Revogar um convite     | ✅            | ❌     | 
| Listar membros         | ✅            | ✅     | 
| Atualizar função       | ✅            | ❌     | 
| Deletar membro         | ✅            | ⚠️     | 
| Elogiar um membro      | ✅            | ✅     | 
| Obter elogios de um membro | ✅            | ✅     | 
| Obter elogios recebidos por um membro | ✅            | ✅     | 


> ✅ = permitido
> ❌ = não permitido
> ⚠️ = permitido com condições

