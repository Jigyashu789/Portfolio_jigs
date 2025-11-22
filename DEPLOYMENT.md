# Quick Deployment Reference

## Files Created
- ✅ `vercel.json` - Vercel configuration
- ✅ `netlify.toml` - Netlify configuration  
- ✅ `package.json` - Added Prisma postinstall script

## Environment Variables Needed

```bash
DATABASE_URL="postgresql://user:password@host:port/database"
GEMINI_API_KEY="your-gemini-api-key"
EMAIL_USER="your-email@gmail.com"  # Optional
EMAIL_PASS="your-app-password"     # Optional
```

## Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

## Netlify Deployment

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify**
   - Go to https://app.netlify.com/start
   - Connect your repository
   - Add environment variables
   - Deploy!

## Database Setup

**Recommended: Neon (Free tier available)**
1. Sign up at https://neon.tech
2. Create new project
3. Copy connection string
4. Add to `DATABASE_URL` environment variable

## Build Verification

✅ Production build tested successfully
✅ All routes optimized
✅ Static pages: 9 routes
✅ Dynamic API routes: 2 routes
✅ Total bundle size: ~160 KB (optimized)

## Post-Deployment

After deployment, run migrations:
```bash
npx prisma migrate deploy
```

Or use Prisma Studio to manage data:
```bash
npx prisma studio
```

## Support

Full deployment guide: See `deployment-guide.md` in artifacts
