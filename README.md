# TaskHub Service

A high-performance REST API service for task and project management, built with Fastify and TypeScript. TaskHub provides a comprehensive backend solution for managing workspaces, boards, lists, and cards with user authentication and authorization.

## Features

- **Authentication & Authorization**: Secure user authentication with session management and password hashing using Argon2
- **Workspace Management**: Organize projects into workspaces with ownership controls
- **Board Management**: Create and manage boards within workspaces
- **List & Card System**: Organize tasks using lists and cards with positioning support
- **Board Members**: Collaborative features with role-based access control
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Type Safety**: Full TypeScript support with Zod schema validation
- **Database Migrations**: Version-controlled database schema with Drizzle ORM
- **Error Handling**: Comprehensive error handling with domain-specific error types

## Tech Stack

- **Runtime**: Node.js
- **Framework**: [Fastify](https://www.fastify.io/) - High-performance web framework
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- **Validation**: [Zod](https://zod.dev/) - Schema validation
- **Password Hashing**: [Argon2](https://github.com/napi-rs/node-rs) via `@node-rs/argon2`
- **Logging**: [Pino](https://getpino.io/) - Fast JSON logger

## Prerequisites

- **Node.js**: v18 or higher
- **pnpm**: v8 or higher (package manager)
- **PostgreSQL**: v16 or higher
- **Docker & Docker Compose** (optional, for local development)

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd taskhub-service
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and configure the following variables:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/taskhub
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=taskhub
```

### Database Setup

#### Using Docker Compose (Recommended for Development)

Start PostgreSQL using Docker Compose:

```bash
docker-compose up -d
```

#### Manual Setup

1. Create a PostgreSQL database:

```bash
createdb taskhub
```

2. Update `DATABASE_URL` in your `.env` file with your database credentials.

#### Run Migrations

Apply database migrations using Drizzle Kit:

```bash
pnpm drizzle-kit push
```

Or generate migration files and apply them:

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

### Development

Start the development server with hot-reload:

```bash
pnpm dev
```

The API will be available at `http://localhost:3000`.

### Production Build

Build the TypeScript project:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## API Documentation

Once the server is running, access the interactive API documentation at:

- **Swagger UI**: http://localhost:3000/docs

All API endpoints are prefixed with `/api`.

### Main API Endpoints

- **Authentication**

  - `POST /api/auth/signup` - Register a new user
  - `POST /api/auth/login` - Authenticate and create session
  - `POST /api/auth/logout` - Terminate session
  - `GET /api/auth/me` - Get current authenticated user

- **Workspaces**

  - `GET /api/workspaces` - List workspaces
  - `POST /api/workspaces` - Create workspace
  - `PATCH /api/workspaces/:id` - Update workspace
  - `DELETE /api/workspaces/:id` - Delete workspace

- **Boards**

  - `GET /api/boards` - List user's boards
  - `POST /api/boards` - Create board
  - `GET /api/boards/:boardId` - Get board details
  - `PATCH /api/boards/:boardId` - Update board
  - `DELETE /api/boards/:boardId` - Delete board

- **Board Members**

  - `GET /api/boards/:boardId/members` - List board members
  - `POST /api/boards/:boardId/members` - Add member to board
  - `DELETE /api/boards/:boardId/members/:userId` - Remove member from board

- **Lists**

  - `GET /api/boards/:boardId/lists` - List board lists
  - `POST /api/boards/:boardId/lists` - Create list
  - `PATCH /api/boards/:boardId/lists/:listId` - Update list
  - `DELETE /api/boards/:boardId/lists/:listId` - Delete list
  - `POST /api/boards/:boardId/lists/reorder` - Reorder lists

- **Cards**
  - `GET /api/boards/:boardId/lists/:listId/cards` - List cards in list
  - `POST /api/boards/:boardId/lists/:listId/cards` - Create card
  - `GET /api/boards/:boardId/lists/:listId/cards/:cardId` - Get card details
  - `PATCH /api/boards/:boardId/lists/:listId/cards/:cardId` - Update card
  - `DELETE /api/boards/:boardId/lists/:listId/cards/:cardId` - Delete card
  - `POST /api/boards/:boardId/lists/:listId/cards/:cardId/move` - Move card

## Project Structure

```
taskhub-service/
├── src/
│   ├── app.ts                 # Application factory
│   ├── server.ts              # Server entry point
│   ├── db/                    # Database configuration and schema
│   │   ├── schema.ts          # Drizzle ORM schema definitions
│   │   ├── client.ts          # Database client
│   │   └── ...
│   ├── domain/                # Domain layer (business logic)
│   │   ├── auth/              # Authentication domain
│   │   ├── board/             # Board domain
│   │   ├── card/              # Card domain
│   │   └── ...
│   ├── routes/                # API route handlers
│   │   ├── auth/              # Authentication routes
│   │   ├── boards/            # Board routes
│   │   └── workspaces/        # Workspace routes
│   ├── services/              # Service layer
│   ├── repositories/          # Data access layer
│   ├── plugins/               # Fastify plugins
│   ├── lib/                   # Shared utilities
│   └── types/                 # TypeScript type definitions
├── drizzle/                   # Database migration files
├── dist/                      # Compiled JavaScript (production)
├── docker-compose.yml         # Docker Compose configuration
├── drizzle.config.ts          # Drizzle Kit configuration
└── package.json
```

## Development Tools

- **Linting & Formatting**: [Biome](https://biomejs.dev/) - Fast formatter and linter
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) - Git hooks made easy
- **Commit Linting**: [Commitlint](https://commitlint.js.org/) - Lint commit messages
- **Dead Code Detection**: [Knip](https://knip.dev/) - Find unused files and dependencies

## Scripts

- `pnpm dev` - Start development server with hot-reload
- `pnpm build` - Build TypeScript to JavaScript
- `pnpm start` - Start production server
- `pnpm knip` - Analyze for unused code and dependencies

## Environment Variables

| Variable            | Description                           | Required | Default |
| ------------------- | ------------------------------------- | -------- | ------- |
| `NODE_ENV`          | Environment (development/production)  | Yes      | -       |
| `PORT`              | Server port                           | No       | 3000    |
| `DATABASE_URL`      | PostgreSQL connection string          | Yes      | -       |
| `POSTGRES_USER`     | PostgreSQL username (for Docker)      | No       | -       |
| `POSTGRES_PASSWORD` | PostgreSQL password (for Docker)      | No       | -       |
| `POSTGRES_DB`       | PostgreSQL database name (for Docker) | No       | -       |

## Security

- Password hashing using Argon2id (resistant to timing attacks)
- Session-based authentication with secure cookie handling
- Input validation using Zod schemas
- SQL injection prevention via Drizzle ORM (parameterized queries)
- CORS and security headers (configure as needed)

## Contributing

1. Follow the existing code style and architecture patterns
2. Code formatting and linting is automatically handled via Husky git hooks (using Biome)
3. Write meaningful commit messages following conventional commits (enforced by Commitlint)
4. Test your changes thoroughly before submitting
5. Run `pnpm knip` to check for unused code and dependencies

## License

ISC

## Support

For issues, questions, or contributions, please open an issue on the repository.
