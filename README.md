## Description

  NadinSoft Node.Js backend test, TaskManager built with nestjs/ts/prisma on mysql
  Thanks for reviewing my project.
  Parsa Ghasemi


## Installation

#Before doing anything:
create .env and .env.test files after pulling this repo and copy values from

their example into your own .env file.

update from 2/15:
  - Postman collection added to the repo and some changes on Task module
  

```bash
$ yarn install
```

## Running the app

#First script is responsible for restarting dev container and run prisma migration command

```bash
#restart docker
$ yarn db:dev:restart

#This script creates the server and run the project
```bash
$ yarn start:dev

## Test

#This script restarts test db container
```bash
$ yarn db:test:restart

```bash
# e2e tests
$ yarn test:e2e

