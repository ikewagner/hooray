# Aplicação Hooray

Esta aplicação é voltada para a criação de organizações, onde cada organização pode ter vários membros e cada membro pode ter uma função dentro da organização. Os membros poderão se elogiar uns aos outros. Facilitando a comunicação e o gerenciamento de seus superiores.



## Funcionalidades

### Autenticação

- [ ] Deve ser capaz de autenticar usando e-mail e senha;
- [ ] Deve ser capaz de autenticar usando conta do Github;
- [ ] Deve ser capaz de recuperar senha usando e-mail;
- [ ] Deve ser capaz de criar uma conta (e-mail, nome e senha);

### Organizações

- [ ] Deve ser capaz de criar uma nova organização;
- [ ] Deve ser capaz de obter organizações às quais o usuário pertence;
- [ ] Deve ser capaz de atualizar uma organização;
- [ ] Deve ser capaz de encerrar uma organização;
- [ ] Deve ser capaz de transferir a propriedade da organização;

### Convites

- [ ] Deve ser capaz de convidar um novo membro (e-mail, função);
- [ ] Deve ser capaz de aceitar um convite;
- [ ] Deve ser capaz de revogar um convite pendente;

### Membros

- [ ] Deve ser capaz de obter membros da organização;
- [ ] Deve ser capaz de atualizar a função de um membro;

### Elogios

- [ ] Deve ser capaz de elogiar um membro;
- [ ] Deve ser capaz de obter elogios de um membro;
- [ ] Deve ser capaz de obter elogios recebidos por um membro;


### Funções

- Proprietário (conta como administrador)
- Administrador
- Membro


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

