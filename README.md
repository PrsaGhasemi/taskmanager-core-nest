## Description

  NadinSoft Node.Js backend test, TaskManager built with nestjs/ts/prisma on mysql
  Parsa Ghasemi


## Installation

#before doing anything:
create .env and .env.test files after pulling this repo and copy values from
their example into your own .env file

```bash
$ yarn install
```

## Running the app

#first run this script which is responsible to restart the docker and migrate the prisma
schema again:

```bash
#restart docker
$ yarn db:dev:restart

#This script creates the server and run the project
```bash
$ yarn start:dev

## Test

#i only created a template for e2e testing based on jest but to run it
```bash
# e2e tests
$ yarn test:e2e

