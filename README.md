# Tour Admin Panel

Standalone admin panel for the Tour Booking System. This is a separate Next.js application that manages vehicles, tours, bookings, users, and cities.

## Features

- 🔐 Secure admin authentication
- 📊 Dashboard with statistics and analytics
- 🚗 Vehicle management (CRUD)
- 🗺️ Tour packages management
- 📅 Booking management and status updates
- 👥 User management
- 🏙️ Cities management
- 📈 Analytics and reporting
- 📱 Responsive design

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Auth**: NextAuth.js
- **API Client**: Axios
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Your main Tour application backend running

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd tour-admin
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
- `NEXT_PUBLIC_API_URL`: URL of your main tour backend (e.g., http://localhost:3000)
- `NEXTAUTH_SECRET`: Generate a secret key
- Admin credentials (or configure to use database)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3001](http://localhost:3001) in your browser

### Default Admin Login

- Email: admin@tour.com
- Password: admin123

**⚠️ Change these credentials in production!**

## Project Structure

```
tour-admin/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   │   └── login/         # Admin login
│   ├── (dashboard)/       # Dashboard layout group
│   │   ├── dashboard/     # Main dashboard
│   │   ├── vehicles/      # Vehicle management
│   │   ├── tours/         # Tours management
│   │   ├── bookings/      # Bookings management
│   │   ├── users/         # User management
│   │   └── cities/        # Cities management
│   ├── api/               # API routes
│   │   └── auth/          # NextAuth configuration
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── layout/           # Layout components
│   └── forms/            # Form components
├── lib/                  # Utilities and configurations
│   ├── api-client.ts     # API client for backend
│   ├── auth.ts           # Auth utilities
│   └── utils.ts          # Helper functions
├── types/                # TypeScript types
└── public/              # Static assets
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

### Docker

```bash
# Build
docker build -t tour-admin .

# Run
docker run -p 3001:3001 tour-admin
```

### Manual Deployment

```bash
npm run build
npm start
```

## Configuration

### Connecting to Backend

The admin panel connects to your main tour application via API calls. Configure the backend URL in `.env`:

```
NEXT_PUBLIC_API_URL=https://your-tour-api.com
```

### Authentication

Admin authentication is handled by NextAuth.js. You can:
- Use the simple credential provider (current setup)
- Integrate with your main app's user database
- Use OAuth providers (Google, GitHub, etc.)

## API Endpoints Required

Your main tour application should expose these API endpoints:

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/verify` - Verify admin session

### Dashboard
- `GET /api/admin/stats` - Dashboard statistics

### Vehicles
- `GET /api/admin/vehicles` - List vehicles
- `GET /api/admin/vehicles/:id` - Get vehicle
- `POST /api/admin/vehicles` - Create vehicle
- `PUT /api/admin/vehicles/:id` - Update vehicle
- `DELETE /api/admin/vehicles/:id` - Delete vehicle

### Tours
- `GET /api/admin/tours` - List tours
- `GET /api/admin/tours/:id` - Get tour
- `POST /api/admin/tours` - Create tour
- `PUT /api/admin/tours/:id` - Update tour
- `DELETE /api/admin/tours/:id` - Delete tour

### Bookings
- `GET /api/admin/bookings` - List bookings
- `GET /api/admin/bookings/:id` - Get booking
- `PUT /api/admin/bookings/:id` - Update booking status

### Users
- `GET /api/admin/users` - List users
- `GET /api/admin/users/:id` - Get user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

### Cities
- `GET /api/admin/cities` - List cities
- `POST /api/admin/cities` - Create city
- `PUT /api/admin/cities/:id` - Update city
- `DELETE /api/admin/cities/:id` - Delete city

## Security

- All routes under `/dashboard` are protected by middleware
- Admin role verification on every API call
- CSRF protection with NextAuth
- Environment variables for sensitive data
- Input validation with Zod schemas

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT
