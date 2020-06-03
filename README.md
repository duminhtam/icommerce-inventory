# Inventory Service
Inventory service for icommerce, this is the example of creating extensible & scalable nodeJS backend microservices. This project is follow **The Twelve-Factor App**
  

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Structure
```
├── dist						# Build folder
├── libs						# Library folder
│   └── slug
├── migrations					# Migration scripts
│   ├── factories
│   └── seeds
├── src
│   ├── product					# Product Module
│   │   ├── controllers			# API Controller
│   │   ├── entities			# Data Model
│   │   ├── guards				# App Guard/Firewall
│   │   └── services
│   └── tracking				# Tracking Module
│       ├── controllers
│       ├── entities
│       └── services
└── test						# E2E Test

```


### Prerequisites

What things you need to install & start development

* Node.js v10 or above
* Docker & Docker Compose to start Redis & PostgresDB

### Installing

Install all package using yarn

```
yarn install
```

## Running the tests

This project use Jest & NestJS test

### Unit Test

This project only have 1 sample test for /libs.
 

```
yarn test
```
### E2E Test

Run end to end test, you should stop the development server first

```
yarn test:e2e
```

### And coding style tests

We using eslint standard

```
yarn lint
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

### Config
All the environment config store in .env

## API Documents (swagger)

```bash
http://localhost:3001/docs
```

## Stay in touch

- Author - duminhtam@gmail.com

## License

This project is [MIT licensed](LICENSE).
