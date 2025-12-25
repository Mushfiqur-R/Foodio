<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">🍽️ Foodio Backend - Restaurant Management API</h1>

<p align="center">A robust backend API for restaurant management system built with NestJS, Prisma ORM, and PostgreSQL.</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

## 📦 Technology Stack

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Prisma ORM (v6)** - Next-generation ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication & Authorization
- **Bcrypt** - Password hashing
- **Class Validator** - Request validation

## 🔹 Features

### Public APIs
- Browse menu categories and items
- View menu item details

### User APIs (Authenticated)
- Place orders
- Track order status (Pending → Preparing → Ready → Completed)
- View order history

### Admin APIs (Admin Role Required)
- Manage categories (Create, Edit, Delete)
- Manage menu items (Create, Edit, Delete, Availability)
- View and update all orders
- Manage order status

## 🗄️ Database Schema

### Tables

#### Role
- `id` - Primary key
- `name` - Role name (Admin/User)
- `description` - Role description
- `createdAt`, `updatedAt` - Timestamps

#### User
- `id` - Primary key
- `name` - User full name
- `email` - User email (unique)
- `passwordHash` - Hashed password
- `address` - Delivery address
- `roleId` - Foreign key to Role
- `createdAt`, `updatedAt` - Timestamps
- **Relations**: User belongs to Role, User has many Orders

#### Category
- `id` - Primary key
- `name` - Category name
- `createdAt`, `updatedAt` - Timestamps
- **Relations**: Category has many MenuItems

#### MenuItem
- `id` - Primary key
- `name` - Item name
- `description` - Item description
- `price` - Item price
- `imageUrl` - Item image URL
- `isAvailable` - Availability status (boolean)
- `categoryId` - Foreign key to Category
- `createdAt`, `updatedAt` - Timestamps
- **Relations**: MenuItem belongs to Category, MenuItem has many OrderItems

#### Order
- `id` - Primary key
- `userId` - Foreign key to User
- `totalPrice` - Total order amount
- `status` - Order status enum (Pending, Preparing, Ready, Completed)
- `createdAt`, `updatedAt` - Timestamps
- **Relations**: Order belongs to User, Order has many OrderItems

#### OrderItem
- `id` - Primary key
- `orderId` - Foreign key to Order
- `menuItemId` - Foreign key to MenuItem
- `quantity` - Item quantity
- `price` - Price at time of order
- **Unique constraint**: (orderId, menuItemId)
- **Relations**: OrderItem belongs to Order, OrderItem belongs to MenuItem

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone 
cd foodio_backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/foodio_db"

# JWT
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000

# Optional: File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR="./uploads"
```

### 4. Run Prisma migrations
```bash
npx prisma migrate dev --name init
```

### 5. Generate Prisma Client
```bash
npx prisma generate
```

### 6. (Optional) Seed the database
```bash
npm run seed
```

### 7. Start the development server
```bash
npm run start:dev
```

Server runs on **http://localhost:3000**

## 🚀 Running the Application

### Development mode
```bash
npm run start:dev
```

### Production mode
```bash
npm run build
npm run start:prod
```

### Watch mode
```bash
npm run start:debug
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
├── README.md                  # Project documentation
└── tsconfig.json              # TypeScript configuration
```

## 📝 API Endpoints

### Admin Routes

#### Authentication & User Management
```
POST   /admin/login            - Admin login
POST   /admin/createuser       - Create new user
POST   /admin/roles            - Create new role (Admin Only)
```

#### Category Management (Admin Only)
```
POST   /admin/createcategory   - Create new category
GET    /admin/categories       - Get all categories
DELETE /admin/deletecategory/:id - Delete category by ID
```

#### Menu Item Management (Admin Only)
```
POST   /admin/createmenuitem   - Create new menu item (with image upload)
GET    /admin/menu             - Get all menu items (optional: ?category=categoryName)
PATCH  /admin/updatemenuitem/:id - Update menu item (with optional image upload)
DELETE /admin/menuitem/:id     - Delete menu item by ID
```

#### Order Management (Admin Only)
```
GET    /admin/orders           - Get all orders
GET    /admin/order/:id        - Get single order details
PATCH  /admin/order/status/:id - Update order status
```

### User Routes

#### Authentication
```
POST   /user/login             - User login
POST   /user/createuser        - User registration
```

#### Menu Browsing (Public)
```
GET    /user/menu              - Get all menu items (optional: ?category=categoryName)
```

#### Order Management (User Only - Authenticated)
```
POST   /user/placeorder        - Place a new order
GET    /user/orders            - Get current user's orders
```

## 📋 Request/Response Examples

### Admin Login
```json
POST /admin/login
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Create Category
```json
POST /admin/createcategory
Headers: Authorization: Bearer 
{
  "name": "Appetizers"
}
```

### Create Menu Item
```
POST /admin/createmenuitem
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- name: "Chicken Burger"
- description: "Delicious grilled chicken burger"
- price: 12.99
- categoryId: 1
- image: [file upload]
```

### Update Menu Item
```
PATCH /admin/updatemenuitem/:id
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- name: "Updated Chicken Burger"
- description: "Updated description"
- price: 13.99
- categoryId: 1
- image: [optional file upload]
```

### Place Order
```json
POST /user/placeorder
Headers: Authorization: Bearer 
{
  "items": [
    {
      "menuItemId": 1,
      "quantity": 2
    }
  ],
  "totalPrice": 25.98
}
```

### Update Order Status
```json
PATCH /admin/order/status/:id
Headers: Authorization: Bearer 
{
  "status": "Preparing"
}
```
Available statuses: "Pending", "Preparing", "Ready", "Completed"

## 🔐 Authentication & Authorization

### JWT-based Authentication
- Users login with email and password
- JWT token issued upon successful authentication
- Token must be included in `Authorization: Bearer <token>` header

### Role-based Access Control
- **Public Routes**: No authentication required
- **User Routes**: Requires valid JWT token
- **Admin Routes**: Requires JWT token + Admin role

### Guards
- `AdminGuard` - Validates JWT token and checks for Admin role
- `UserGuard` - Validates JWT token for user routes

## 🧪 Testing

### Run unit tests
```bash
npm run test
```

### Run e2e tests
```bash
npm run test:e2e
```

### Test coverage
```bash
npm run test:cov
```

## 🛠️ Database Management

### View database in Prisma Studio
```bash
npx prisma studio
```

### Create a new migration
```bash
npx prisma migrate dev --name migration_name
```

### Reset database
```bash
npx prisma migrate reset
```

### Update Prisma Client
```bash
npx prisma generate
```

## 🔧 Configuration

### CORS
CORS is enabled for frontend communication. Configure allowed origins in `main.ts`:
```typescript
app.enableCors({
  origin: 'http://localhost:3001', // Frontend URL
  credentials: true,
});
```

### Validation
Global validation pipe is enabled for request validation using class-validator and class-transformer.

### File Upload
File uploads are stored in the `uploads/` directory. Configure multer settings in the respective modules.

## 📦 Key Modules

### Admin Module
- Handles all admin-specific operations
- Order management
- Menu item and category CRUD operations

### Auth Module
- User registration and login
- JWT token generation
- Password hashing with bcrypt
- Guards and strategies for route protection

### User Module
- User profile management
- User-specific operations

### Prisma Module
- Database connection and queries
- Shared across all modules
- Handles all database operations

## 🌐 Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/foodio_db"

# JWT
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000

# Optional: File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR="./uploads"
```

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm run start:prod
```

### Using PM2
```bash
npm install -g pm2
pm2 start dist/main.js --name foodio-backend
```

### Deploy to Cloud

When you're ready to deploy your NestJS application to production, check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS.

```bash
npm install -g @nestjs/mau
mau deploy
```

## 🐛 Troubleshooting

### Common Issues

**Prisma Client Not Generated**
```bash
npx prisma generate
```

**Migration Failed**
```bash
npx prisma migrate reset
npx prisma migrate dev
```

**Port Already in Use**
```bash
# Change PORT in .env file
# Or kill the process using the port
lsof -ti:3000 | xargs kill -9  # Unix/Linux
netstat -ano | findstr :3000   # Windows
```

**Database Connection Failed**
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Verify credentials and database exists

## 📚 Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).

## 📄 License

This project is licensed under the MIT License.

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Contact the development team
- Check documentation

## 🤝 Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

---

<p align="center">Built with ❤️ using NestJS and Prisma</p>