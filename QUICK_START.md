# 🚀 PORTEFORYOU - QUICK REFERENCE

## Location
```
c:\Users\elaid\OneDrive\Desktop\prj meryem\porteforyou
```

## Run Locally (Development)
```bash
cd "c:\Users\elaid\OneDrive\Desktop\prj meryem\porteforyou"
npm run dev
# Open http://localhost:3000
```

## Build for Production
```bash
npm run build
npm start
```

## Push to GitHub
```bash
# Navigate to project
cd "c:\Users\elaid\OneDrive\Desktop\prj meryem\porteforyou"

# Generate GitHub Personal Access Token from:
# https://github.com/settings/tokens (scopes: repo, write:repo_hook)

# Update remote with token (replace <TOKEN>)
git remote set-url origin https://<TOKEN>@github.com/mtouhafiriffi-a11y/porte-for-m.git

# Push to GitHub
git push -u origin main
```

## Deploy on Vercel
```bash
npm install -g vercel
cd "c:\Users\elaid\OneDrive\Desktop\prj meryem\porteforyou"
vercel
```

**Manual Option**: 
1. Go to https://vercel.com
2. Import GitHub repo: `mtouhafiriffi-a11y/porte-for-m`
3. Add env vars:
   - `NEXTAUTH_SECRET` = [generate secure key]
   - `NEXTAUTH_URL` = https://your-app-name.vercel.app
4. Deploy

## Generate Secure Key
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Project Structure
- `/src/app` - Next.js pages and layouts
- `/src/app/api` - API endpoints
- `/src/components` - React components
- `/src/lib` - Utilities (auth, db)
- `vercel.json` - Vercel deployment config
- `.env.local` - Environment variables

## Key Routes
- `/` - Home (public)
- `/auth/signin` - Login (public)
- `/auth/signup` - Register (public)
- `/dashboard` - Portfolio (protected)

## API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/signin` - User login (NextAuth)
- `GET /api/portfolio` - Get user's projects
- `POST /api/portfolio` - Add project

## Test User Flow
1. Visit http://localhost:3000
2. Click "Sign Up"
3. Create account (email, password, name)
4. Sign in with credentials
5. Add portfolio projects on dashboard

## Files & Guides
- `README.md` - Full documentation
- `PROJECT_SUMMARY.md` - Technical details
- `DEPLOYMENT_GUIDE.md` - GitHub & Vercel setup
- `COMPLETION_SUMMARY.md` - Project overview

## Tech Stack
- Next.js 16 + React 19 + TypeScript
- SQLite3 database
- NextAuth.js authentication
- Express.js ready
- bcryptjs password hashing

## Environment Setup
- NEXTAUTH_SECRET = [secure random key]
- NEXTAUTH_URL = http://localhost:3000 (dev)
- NEXTAUTH_URL = https://domain.vercel.app (prod)

## Troubleshooting

**Dev server won't start:**
```bash
rm -r .next node_modules
npm install
npm run dev
```

**GitPush fails:**
- Use Personal Access Token (recommended)
- Or configure SSH key
- See DEPLOYMENT_GUIDE.md

**Build fails:**
```bash
npm run build  # Verify locally first
```

## Git Commands
```bash
# Check status
git status

# View commits
git log --oneline

# Add changes
git add .

# Commit
git commit -m "Your message"

# Push
git push origin main
```

## Important Links
- GitHub: https://github.com/mtouhafiriffi-a11y/porte-for-m.git
- Repo: https://github.com/mtouhafiriffi-a11y/porte-for-m
- Email: m.touhafiriffi@esisa.ac.ma
- Vercel: https://vercel.com

## Current Status
✅ Application complete
✅ Local testing working
✅ Git commits ready
✅ vercel.json configured
✅ Ready for GitHub push & Vercel deployment

## Next Action
→ Push to GitHub using personal access token
→ Deploy on Vercel
→ Test live application

---

**Version**: 1.0.0  
**Created**: March 1, 2026  
**Status**: Ready for Production 🚀
