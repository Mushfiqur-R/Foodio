<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

🍽️ Foodio Backend - Restaurant Management API
A robust backend API for restaurant management system built with NestJS, Prisma ORM, and PostgreSQL.
📦 Technology Stack

NestJS - Progressive Node.js framework
TypeScript - Type-safe JavaScript
Prisma ORM (v6) - Next-generation ORM
PostgreSQL - Relational database
JWT - Authentication & Authorization

2. Install dependencies
bashnpm install
3. Setup environment variables
Create a .env file in the root directory:
envDATABASE_URL="postgresql://username:password@localhost:5432/foodio_db"
JWT_SECRET="your-secret-key-here"

4. Run Prisma migrations
bashnpx prisma migrate dev --name init
5. Generate Prisma Client
bashnpx prisma generate
6. (Optional) Seed the database
bashnpm run seed
7. Start the development server
bashnpm run start:dev
Server runs on http://localhost:3000
🚀 Running the Application
Development mode
bashnpm run start:dev
Production mode
bashnpm run build
npm run start:prod
Watch mode
bashnpm run start:debug
```

## 📁 Project Structure
```
foodio_backend/
├── node_modules/              # Dependencies
├── prisma/                    # Prisma configuration
│   ├── migrations/           # Database migrations
│   └── schema.prisma         # Database schema
├── src/                       # Source code
│   ├── admin/                # Admin module
│   │   ├── admin.controller.ts
│   │   ├── admin.service.ts
│   │   └── admin.module.ts
│   ├── auth/                 # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── guards/          # Auth guards (JWT, Roles)
│   │   ├── strategies/      # Passport strategies
│   │   └── decorators/      # Custom decorators
│   ├── DTOs/                 # Data Transfer Objects
│   │   ├── auth.dto.ts
│   │   ├── category.dto.ts
│   │   ├── menu-item.dto.ts
│   │   └── order.dto.ts
│   ├── prisma/               # Prisma service
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── user/                 # User module
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.module.ts
│   ├── app.controller.spec.ts
│   ├── app.controller.ts     # Main app controller
│   ├── app.module.ts         # Root module
│   ├── app.service.ts        # Main app service
│   └── main.ts               # Application entry point
├── test/                      # Test files
│   ├── app.e2e-spec.ts       # E2E tests
│   └── jest-e2e.json         # Jest E2E config
├── uploads/                   # File uploads directory
│   └── menu/                 # Menu item images
├── .env                       # Environment variables
├── .gitignore                 # Git ignore rules
├── .prettierrc                # Prettier configuration
├── eslint.config.mjs          # ESLint configuration
├── nest-cli.json              # Nest CLI configuration
├── package.json               # Project dependencies
├── package-lock.json          # Locked dependencies
├── prisma.config.ts           # Prisma configuration (TypeScript)
├── README.md                  # Project documentation
└── tsconfig.json              # TypeScript configuration

🔐 Authentication & Authorization
JWT-based Authentication

Users login with email and password
JWT token issued upon successful authentication
Token must be included in Authorization: Bearer <token> header


## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
