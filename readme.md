# App

GymPss style app.

## RFs (Requisistos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins relizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-in;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar adademias pelo nome;
- [ ] Deve ser possível o usuário relaizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;   
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode faer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] O dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)

# Notes

## Bibliotecas de desenvolviemnto

- typescript (Para o projeto conter typescript)
- @types/node (Tipagens do node para typescript)
- tsx (Para executar o typescript no node)
- tsup (Para fazer o build para JS da nossa aplicação)

## Comandos

```
$ npm i typescript @types/node tsx tsup -D
```

```
$ npx tsc --init
```

```
$ npx prisma generate
$ npx prisma migrate dev
$ npx prisma migrate deploy
$ npx prisma studio
```

```sh
$ docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest
```