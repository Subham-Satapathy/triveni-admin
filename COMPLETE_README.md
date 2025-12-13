# Tour Admin Panel - Complete Standalone Application

A modern, production-ready admin panel for the Tour Booking System. Built with Next.js 15, TypeScript, and Tailwind CSS - designed to be deployed separately from the main application.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [API Integration](#api-integration)
- [Screenshots](#screenshots)

---

## ✨ Features

### Dashboard
- 📊 Real-time statistics and analytics
- 📈 Revenue tracking
- 📅 Recent bookings overview
- 🎯 Key metrics at a glance

### Vehicle Management
- ✏️ Create, edit, and delete vehicles
- 🚗 Support for cars and bikes
- 💰 Flexible pricing (hourly/daily rates)
- 🖼️ Image gallery support
- ⚡ Active/inactive status toggle
- ⭐ Featured vehicle marking

### Tour Management
- 🗺️ Tour package creation and editing
- 📍 Route planning (from city to city)
- 💵 Dynamic pricing configuration
- 🎨 Visual tour cards
- 📋 Tour highlights management

### Booking Management
- 📋 View all customer bookings
- 🔍 Filter by status (Pending, Paid, Cancelled)
- ✅ Update booking status
- 👥 Customer information access
- 💳 Payment tracking

### User Management
- 👥 View all registered users
- 🔒 Activate/deactivate accounts
- 📧 Contact information access
- 📊 User statistics

### Cities Management
- 🏙️ Add and manage service cities
- 🔗 Auto-slug generation
- ✏️ Quick edit functionality
- 🗑️ Safe deletion with confirmation

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Charts**: Recharts (ready for implementation)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Your main tour backend API running

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   cd tour-admin
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXTAUTH_URL=http://localhost:3001
   NEXTAUTH_SECRET=your-secret-key
   ADMIN_EMAIL=admin@tour.com
   ADMIN_PASSWORD=admin123
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

6. **Login**
   - Email: admin@tour.com
   - Password: admin123

### Using the Setup Script (Linux/Mac)

```bash
chmod +x setup.sh
./setup.sh
```

---

## 📁 Project Structure

```
tour-admin/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── auth/[...nextauth]/  # NextAuth config
│   ├── dashboard/               # Protected admin pages
│   │   ├── page.tsx            # Dashboard home
│   │   ├── vehicles/           # Vehicle management
│   │   ├── tours/              # Tours management
│   │   ├── bookings/           # Bookings management
│   │   ├── users/              # User management
│   │   └── cities/             # Cities management
│   ├── login/                   # Login page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── layout/
│   │   └── DashboardLayout.tsx # Main dashboard layout
│   └── Providers.tsx           # Context providers
├── lib/
│   ├── api-client.ts           # API client for backend
│   └── utils.ts                # Helper functions
├── types/
│   ├── index.ts                # TypeScript types
│   └── next-auth.d.ts          # NextAuth type extensions
├── proxy.ts                     # Route protection (Next.js 16)
├── .env.example                # Environment template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose setup
└── README.md
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3000` |
| `NEXTAUTH_URL` | Admin panel URL | `http://localhost:3001` |
| `NEXTAUTH_SECRET` | Secret for JWT signing | Generate with `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Admin login email | `admin@tour.com` |
| `ADMIN_PASSWORD` | Admin login password | `admin123` |

### Customization

#### Change Theme Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    // Your custom color palette
  }
}
```

#### Modify API Endpoints
Edit `lib/api-client.ts` to match your backend structure.

---

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guides including:

- **Vercel** (Recommended - One-click deploy)
- **Docker** (Containerized deployment)
- **VPS/Cloud** (Manual server setup)
- **Railway** (Easy deployment)
- **Render** (Free tier available)

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the button above
2. Connect your GitHub account
3. Configure environment variables
4. Deploy!

---

## 🔌 API Integration

This admin panel requires a backend API. See [API_ENDPOINTS.md](./API_ENDPOINTS.md) for:

- Complete API endpoint specifications
- Request/response formats
- Authentication requirements
- Error handling

### Key API Endpoints Needed

```
POST   /api/admin/login
GET    /api/admin/stats
GET    /api/admin/vehicles
POST   /api/admin/vehicles
GET    /api/admin/tours
POST   /api/admin/tours
GET    /api/admin/bookings
PUT    /api/admin/bookings/:id
GET    /api/admin/users
GET    /api/admin/cities
```

---

## 🔒 Security

- ✅ JWT-based authentication with NextAuth
- ✅ Protected routes with middleware
- ✅ Role-based access control
- ✅ Input validation with Zod
- ✅ CSRF protection
- ✅ Environment variable security
- ✅ HTTP-only cookies

**Important**: Always use HTTPS in production!

---

## 📸 Screenshots

### Login Page
Beautiful, responsive login interface with gradient background

### Dashboard
Real-time statistics with key metrics and recent activity

### Vehicle Management
Full CRUD operations with image support and filtering

### Booking Management
Comprehensive booking list with status management

---

## 🤝 Contributing

This is a standalone admin panel. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📝 License

MIT License - feel free to use this for your projects!

---

## 🆘 Support & Troubleshooting

### Common Issues

**Can't connect to API**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend API is running
- Review CORS settings on backend

**Login fails**
- Check admin credentials in `.env`
- Verify `NEXTAUTH_SECRET` is set
- Check browser console for errors

**Build errors**
- Run `npm install` to ensure all dependencies
- Check Node.js version (needs 18+)
- Clear `.next` folder and rebuild

### Getting Help

1. Check the documentation files
2. Review browser console errors
3. Check server logs
4. Verify environment variables
5. Test API endpoints independently

---

## 🎯 Roadmap

- [ ] Advanced analytics and charts
- [ ] Export data to CSV/Excel
- [ ] Email notifications
- [ ] Activity logs and audit trail
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Mobile app integration
- [ ] Advanced filtering and search
- [ ] Bulk operations

---

## 📞 Contact

For questions or support, please open an issue in the repository.

---

**Made with ❤️ for the Tour Booking System**
