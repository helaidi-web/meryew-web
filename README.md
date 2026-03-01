# Porteforyou - Portfolio Management Application

A modern portfolio management application built with Next.js, featuring user authentication, database persistence, and a beautiful responsive UI.

## Features

- 🔐 **User Authentication** - Secure signup and signin with NextAuth.js
- 📂 **Portfolio Management** - Create and manage your portfolio projects
- 🗄️ **SQLite Database** - Persistent data storage
- 🎨 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **Next.js 16** - Latest Next.js with App Router
- 🔒 **Protected Routes** - Secure dashboard for authenticated users

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, CSS Modules
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js with Credentials Provider
- **Database**: SQLite3
- **Password Hashing**: bcryptjs
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mtouhafiriffi-a11y/porte-for-m.git
cd porteforyou
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file (it's already created with defaults):
```
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

For production, generate a strong secret:
```bash
openssl rand -base64 32
```

## Running Locally

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Features to Test

1. **Home Page** (`/`) - Welcome and navigation
2. **Sign Up** (`/auth/signup`) - Create a new account
3. **Sign In** (`/auth/signin`) - Login with credentials
4. **Dashboard** (`/dashboard`) - Manage your portfolio
   - View all portfolio items
   - Add new portfolio projects
   - Each project requires a title
   - Optional: description, image URL, project link

## Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
porteforyou/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.ts    # NextAuth handler
│   │   │   │   └── register/route.ts          # Registration endpoint
│   │   │   └── portfolio/route.ts             # Portfolio CRUD endpoints
│   │   ├── auth/
│   │   │   ├── signin/page.tsx                # Sign in page
│   │   │   └── signup/page.tsx                # Sign up page
│   │   ├── dashboard/page.tsx                 # Protected dashboard
│   │   ├── layout.tsx                         # Root layout with SessionProvider
│   │   ├── page.tsx                           # Home page
│   │   └── globals.css                        # Global styles
│   ├── components/
│   │   ├── Navbar.tsx                         # Navigation component
│   │   ├── SessionProvider.tsx                # Session provider wrapper
│   │   └── *.module.css                       # Component styles
│   └── lib/
│       ├── auth.ts                            # NextAuth configuration
│       └── db.ts                              # Database setup and utilities
├── vercel.json                                # Vercel deployment config
├── package.json                               # Dependencies and scripts
└── README.md                                  # This file
```

## Database

The application uses SQLite with the following tables:
- **users** - User accounts (email, password, name)
- **portfolios** - Portfolio projects (userId, title, description, image, link)
- **sessions** - NextAuth sessions

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/signin` - Sign in (handled by NextAuth)
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints

### Portfolio
- `GET /api/portfolio` - Get user's portfolio items
- `POST /api/portfolio` - Create new portfolio item

## Deployment on Vercel

1. **Push to GitHub**:
```bash
git remote add origin https://github.com/yourusername/porte-for-m.git
git push -u origin main
```

2. **Deploy on Vercel**:
   - Go to [Vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables:
     - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
     - `NEXTAUTH_URL` - Your production URL (e.g., https://yourapp.vercel.app)
   - Deploy!

The `vercel.json` configuration is already included for optimal deployment.

## Environment Variables

### Development (.env.local)
```
NEXTAUTH_SECRET=dev-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### Production (Vercel Dashboard)
```
NEXTAUTH_SECRET=<generated-random-key>
NEXTAUTH_URL=https://your-app-url.vercel.app
```

## Security Notes

- Always change `NEXTAUTH_SECRET` in production
- Passwords are hashed with bcryptjs
- Use HTTPS in production
- Keep dependencies updated

## Troubleshooting

### Database Issues
- The SQLite database file (`porteforyou.db`) is created automatically
- Tables are initialized on first run
- Check file permissions if you get database errors

### Authentication Issues
- Ensure `.env.local` is set up correctly
- Clear browser cookies if you experience login issues
- Check that NEXTAUTH_SECRET is set

### Vercel Deployment
- Ensure all environment variables are set in Vercel dashboard
- Check the build logs in Vercel for errors
- Verify that your GitHub repository is connected

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, reach out to: m.touhafiriffi@esisa.ac.ma

---

**Created**: March 2026
**Last Updated**: March 2026

