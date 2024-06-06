# Projeto VibeChat

Este projeto é um site e aplicativo de chat em tempo real, similar ao WhatsApp, desenvolvido utilizando várias tecnologias modernas como NestJS, Ionic, MongoDB, Prisma, React, Redis e Swagger.

## Tecnologias Utilizadas

- **NestJS**: Framework para construir aplicações de servidor escaláveis e eficientes.
- **Ionic**: Framework para desenvolvimento de aplicativos móveis híbridos.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Prisma**: ORM (Object-Relational Mapping) para trabalhar com o banco de dados.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Redis**: Banco de dados em memória utilizado para cache e gerenciamento de sessões.
- **Swagger**: Ferramenta para documentação da API.
- **prisma-erd-generator**: Ferramenta para gerar o modelo ERD (Entity-Relationship Diagram) do banco de dados em tempo real.
- **SCSS**: Extensão do CSS que permite o uso de variáveis, aninhamento de regras e mais.
- **Material UI**: Biblioteca de componentes de interface de usuário para React que implementa o design do Google Material.
- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações em containers.
- **Docker Compose**: Ferramenta para definir e gerenciar multi-containers Docker.
- **WebSocket**: Protocolo para comunicação em tempo real bidirecional entre cliente e servidor.

## Funcionalidades

- **Autenticação de Usuário**: Registro e login de usuários.
- **Chat em Tempo Real**: Envio e recebimento de mensagens instantâneas.
- **Notificações em Tempo Real**: Notificações de novas mensagens e eventos.
- **Sistema de Amigos**: Adição e gerenciamento de amigos.

### Deploy web app

### Pré-requisitos

- Node.js
- yarn
- Docker
- pm2
- git
- http-server
- Docker Compose
- (Opcional) Android Studio

### Passos

1. Clone o repositório:

```
git clone https://github.com/weslleycz/VibeChat
```

2. Modifique a variável de ambiente no arquivo .env do frontend para a url onde o backend vai rodar
3. Subindo a aplicação web para produção:

   ```
   ./deploy_web.sh
   ```
4. Configure um servidor web para adicionar suporte a SSL e WebSocket. As portas são:

   ```
   - Porta 3000 para o backend
   - Porta 8080 para o frontend
   ```

### Deploy apenas backend

### Pré-requisitos

- Node.js
- yarn
- Docker
- pm2
- git
- Docker Compose
- (Opcional) Android Studio

### Passos

1. Clone o repositório:

```
git clone https://github.com/weslleycz/VibeChat
```

2. Subindo a aplicação para produção:
   ```
   ./deploy_backend.sh
   ```
3. Configure um servidor web para adicionar suporte a SSL e WebSocket. As portas são:
   ```
   - Porta 3000 para o backend
   ```
### Build app android
1. Clone o repositório:

```
git clone https://github.com/weslleycz/VibeChat
```
2. Modifique a variável de ambiente no arquivo .env do frontend para a url onde o backend vai rodar

3. Subindo para android studio:
```
./android_builder.sh
```
4. Realize o build no android studio: