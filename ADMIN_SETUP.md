# Admin System Setup

This document explains how to set up and use the admin system for Tumaini Fitness.

## Features

- ✅ Admin authentication with JWT tokens
- ✅ Secure login/logout system
- ✅ Modern dashboard with sidebar navigation
- ✅ Tour management overview
- ✅ Statistics and analytics
- ✅ Responsive design using Shadcn/ui components

## Setup Instructions

### 1. Environment Variables

Make sure you have the following environment variables in your `.env` file:

```env
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
DATABASE_URL="your-postgresql-database-url"
```

### 2. Database Migration

Run the Prisma migration to create the Admin table:

```bash
npx prisma migrate dev --name add-admin-model
```

### 3. Create Admin User

Run the script to create your first admin user:

```bash
npx ts-node scripts/create-admin.ts
```

This will create an admin user with:

- **Email**: admin@tumainifitness.co.ke
- **Password**: admin123

**⚠️ Important**: Change the password after first login for security.

## Usage

### Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Use the credentials created above
3. You'll be redirected to `/admin/dashboard`

### Admin Dashboard Features

- **Dashboard Overview**: View statistics about tours, bookings, and revenue
- **Tour Management**: See recent tours with ratings and booking information
- **Sidebar Navigation**: Easy access to different admin sections
- **Secure Logout**: Properly clears authentication tokens

### API Endpoints

- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/verify` - Verify admin authentication

## Security Features

- JWT tokens stored in httpOnly cookies
- Password hashing with bcrypt
- Authentication middleware
- Automatic redirect for unauthenticated users
- Secure cookie settings for production

## Development

The admin system is built with:

- Next.js 15 with App Router
- TypeScript for type safety
- Prisma for database management
- Shadcn/ui for modern UI components
- Tailwind CSS for styling
- JWT for authentication
- bcrypt for password hashing

## File Structure

```
src/app/admin/
├── layout.tsx          # Admin layout with authentication
├── page.tsx           # Admin redirect page
├── login/
│   └── page.tsx       # Login page
└── dashboard/
    └── page.tsx       # Main dashboard

src/app/api/admin/
├── login/
│   └── route.ts       # Login API
├── logout/
│   └── route.ts       # Logout API
└── verify/
    └── route.ts       # Verification API

src/lib/
└── auth.ts            # Authentication utilities

scripts/
└── create-admin.ts    # Admin user creation script
```

## Customization

You can customize the admin system by:

1. **Adding new menu items** in `src/app/admin/dashboard/page.tsx`
2. **Creating new admin pages** in the `src/app/admin/` directory
3. **Modifying the dashboard** to show different statistics
4. **Adding new API endpoints** for admin functionality

## Security Recommendations

1. Change the default admin password immediately
2. Use a strong JWT_SECRET in production
3. Enable HTTPS in production
4. Consider adding rate limiting to login endpoints
5. Implement proper logging for admin actions
6. Add two-factor authentication for enhanced security

## Troubleshooting

### Common Issues

1. **"Property 'admin' does not exist"**: Run `npx prisma generate` to update Prisma client
2. **Authentication errors**: Check JWT_SECRET is set correctly
3. **Database connection issues**: Verify DATABASE_URL is correct
4. **Migration errors**: Ensure database is accessible and has proper permissions

### Getting Help

If you encounter issues:

1. Check the browser console for errors
2. Check the server logs
3. Verify environment variables are set
4. Ensure database migrations have run successfully
