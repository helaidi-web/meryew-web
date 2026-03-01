# Porteforyou - Deployment & GitHub Push Guide

## ⚠️ Important: GitHub Push Issue

The initial push to GitHub failed due to authentication permissions. Here's how to fix it:

### Option 1: Using Personal Access Token (Recommended)

1. **Generate GitHub Personal Access Token:**
   - Go to https://github.com/settings/tokens
   - Click "Generate new token"
   - Select scopes: `repo`, `write:repo_hook`
   - Copy the token

2. **Update Remote URL with Token:**
```bash
cd c:\Users\elaid\OneDrive\Desktop\prj meryem\porteforyou
git remote remove origin
git remote add origin https://<TOKEN>@github.com/mtouhafiriffi-a11y/porte-for-m.git
git push -u origin main
```

Replace `<TOKEN>` with your actual GitHub personal access token.

### Option 2: Using SSH Key

1. **Generate SSH Key:**
```bash
ssh-keygen -t ed25519 -C "m.touhafiriffi@esisa.ac.ma"
```

2. **Add to GitHub:**
   - Go to https://github.com/settings/keys
   - Click "New SSH key"
   - Paste your public key from `~/.ssh/id_ed25519.pub`

3. **Update Remote URL:**
```bash
git remote remove origin
git remote add origin git@github.com:mtouhafiriffi-a11y/porte-for-m.git
git push -u origin main
```

### Option 3: GitHub Desktop or VS Code Git

- Use Visual Studio Code's built-in Git extension
- Login with your GitHub account
- Push directly through the UI

## 🚢 Vercel Deployment Steps

After pushing to GitHub, deploy on Vercel:

### Step 1: Login to Vercel
```bash
npm install -g vercel
vercel login
```

### Step 2: Deploy from CLI
```bash
cd c:\Users\elaid\OneDrive\Desktop\prj meryem\porteforyou
vercel
```

### Step 3: Manual Deployment via Web

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import from GitHub repository
4. Select: `mtouhafiriffi-a11y/porte-for-m`
5. Configure build settings (should be auto-detected):
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Add Environment Variables:
   ```
   NEXTAUTH_SECRET = [generate-secure-random-key]
   NEXTAUTH_URL = https://your-app-name.vercel.app
   ```
7. Click "Deploy"

### Step 4: Generate Secure NEXTAUTH_SECRET

In PowerShell:
```powershell
$env:OPENSSL_CONF = ""
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

Or use this Node.js command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 📋 Checklist for Deployment

- [ ] Code pushed to GitHub repository
- [ ] Repository is public (or accessible by Vercel)
- [ ] `.env.local` file exists locally but is in `.gitignore`
- [ ] All environment variables configured in Vercel dashboard
- [ ] NEXTAUTH_SECRET is unique and secure
- [ ] NEXTAUTH_URL matches your Vercel domain
- [ ] Build succeeds without errors
- [ ] Database initialized correctly
- [ ] All routes are accessible

## 🔍 Troubleshooting Deployment

### Build Fails

**Error**: Module not found / TypeScript errors

**Solution**:
```bash
# Clear cache and rebuild locally
rm -r .next node_modules
npm install
npm run build
```

### Database Issues on Vercel

**Note**: SQLite doesn't persist on Vercel by default (serverless)

**Solutions**:
1. Use external database (PostgreSQL, MongoDB)
2. Use Vercel KV for sessions
3. Implement cloud storage for portfolio data

### Environment Variables Not Loading

- Double-check variable names in Vercel dashboard
- Ensure they match `.env.local` locally
- Redeploy after setting variables

### Authentication Not Working

- Verify NEXTAUTH_SECRET is set in Vercel
- Check NEXTAUTH_URL matches your domain exactly
- Clear browser cookies and try again

## 🎯 Vercel Deployment URL Structure

After deployment, your app will be at:
```
https://porte-for-m.vercel.app
or
https://[custom-domain].vercel.app
```

## 📝 Current Git Status

```bash
# Current commits:
# 1b7220b Update .gitignore with environment and database files
# 20fdd46 Add comprehensive project summary documentation
# e811e59 Add vercel.json and comprehensive README
# 2a30bcb Initial commit: Porteforyou portfolio application
# 20318df Initial commit from Create Next App
```

## 🔐 Post-Deployment Security

1. **Verify HTTPS**: Vercel provides automatic SSL certificates
2. **Monitor Logs**: Check Vercel dashboard for issues
3. **Update Dependencies**: Run `npm audit fix` regularly
4. **Backup Data**: If using SQLite, implement backup strategy

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **NextAuth Docs**: https://next-auth.js.org
- **GitHub Issues**: Check project repository for issues

## ✅ Once Deployed

1. Test all features:
   - Sign up with new account
   - Add portfolio items
   - Sign in/out
   - Protected routes

2. Monitor Vercel dashboard for:
   - Build status
   - Error logs
   - Performance metrics

3. Share your deployed app:
   - GitHub repository
   - Vercel deployment URL
   - Live application link

---

**Next Steps**: Push to GitHub → Deploy on Vercel → Monitor & Update

**Email**: m.touhafiriffi@esisa.ac.ma
