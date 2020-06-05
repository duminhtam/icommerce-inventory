# Inventory Service
Inventory service for icommerce, this is the example of creating extensible & scalable nodeJS backend microservices. This project is follow **The Twelve-Factor App**
  

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Solution Diagram
![](https://i.imgur.com/C4LF3v8.png)

## Postman Collection
https://www.getpostman.com/collections/56b3f4b8a42c3aa2cc4d

```
Create Postman environment: development
Add 3 variables: 
- token: null
- INVENTORY_URL: http://localhost:3001
- ACCOUNT_URL: http://localhost:3000
```

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

### Installing & start development

1. Start docker containers

```
docker-compose up -d
```
2. Install all package using yarn

```
yarn install
```
3. Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
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

### Test coverage

Get the coverage report

```
yarn test:cov
```

### And coding style tests

We using eslint standard

```
yarn lint
```

### Config
All the environment config store in .env

```dotenv
# Development will enable Data Synchronize
NODE_ENV=development

# Application/Service PORT
PORT=3001
USER_SERVICE_PORT=4000
AUTH_SERVICE_PORT=4010

# Product Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5456
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=inventory

# Tracking Database
TRACKING_POSTGRES_HOST=localhost
TRACKING_POSTGRES_PORT=5457
TRACKING_POSTGRES_USER=postgres
TRACKING_POSTGRES_PASSWORD=postgres
TRACKING_POSTGRES_DB=tracking

# Tracking Redis
TRACKING_REDIS_HOST=localhost
TRACKING_REDIS_PORT=6381

# JWT Config
JWT_SECRET=(this)(I)sSecre(t)
JWT_EXPIRES_IN=1h

```
## API Documents (swagger)

```bash
http://localhost:3001/docs
```

## Stay in touch

- Author - duminhtam@gmail.com

## License

This project is [MIT licensed](LICENSE).
