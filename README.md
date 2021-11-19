# Project Store Front

## Installation
Install project dependencies running the following command `npm install`

Ensure you have Postgresql installed and running on its default port
[Postgresql install instructions](https://www.postgresql.org/download/)


## Environment Variables
The project has an example env file to get started 
```
POSTGRES_HOST='127.0.0.1'
POSTGRES_DB='shopping'
POSTGRES_USER='shopping_user'
POSTGRES_PASSWORD='password123'
POSTGRES_DB_TEST='shopping_test'
TOKEN_SECRET='YummyLittleDebbies'
PEPPER='helloAgain'
```

## Npm commands

1. Run the dev server with `npm run watch`
2. Run testing with `npm test`
3. Compile typescript to javascript `npm run build`


## Database setup
Database migrations are handled using the npm package [DB Migrate](https://www.npmjs.com/package/db-migrate)

Running `npm run migrate:up ` will setup all the tables you need
Running  `pm run migrate:down` will drop all the tables 