# Vercel Environment Variable Setup Guide

## The Issue

Vercel deployment fails because `GEMINI_API_KEY` is not being recognized.

## Solution: Add Environment Variables in Vercel

### Step 1: Go to Your Project Settings

1. Open your Vercel dashboard
2. Select your project: `Portfolio_jigs`
3. Go to **Settings** → **Environment Variables**

### Step 2: Add These Variables

Add each variable with these **exact names**:

#### Required Variables

**Variable 1: GEMINI_API_KEY**
- **Name**: `GEMINI_API_KEY`
- **Value**: Your Gemini API key (starts with `AIza...`)
- **Environment**: Production, Preview, Development (select all)

**Variable 2: DATABASE_URL**
- **Name**: `DATABASE_URL`
- **Value**: Your PostgreSQL connection string
- **Environment**: Production, Preview, Development (select all)

Example for Neon:
```
postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

#### Optional Variables (for contact form)

**Variable 3: EMAIL_USER**
- **Name**: `EMAIL_USER`
- **Value**: `your-email@gmail.com`
- **Environment**: Production, Preview, Development

**Variable 4: EMAIL_PASS**
- **Name**: `EMAIL_PASS`
- **Value**: Your Gmail app password
- **Environment**: Production, Preview, Development

### Step 3: Redeploy

After adding variables:
1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Select **Use existing Build Cache** (faster)
5. Click **Redeploy**

## Common Issues & Solutions

### Issue 1: "GEMINI_API_KEY doesn't exist"

**Solution**: Make sure you're adding it in the correct format:
- ✅ Correct: `GEMINI_API_KEY` (all caps, underscores)
- ❌ Wrong: `Gemini_API_Key`, `gemini-api-key`, `GEMINI-API-KEY`

### Issue 2: Variable Not Loading

**Solution**: 
1. Delete the variable
2. Re-add it
3. Make sure to select all environments (Production, Preview, Development)
4. Redeploy

### Issue 3: Build Fails

**Solution**: Check build logs for specific error. Common fixes:
- Make sure `DATABASE_URL` is set (even if using SQLite locally)
- For production, use PostgreSQL, not SQLite

### Issue 4: API Key Invalid

**Solution**: 
1. Verify your Gemini API key at [aistudio.google.com](https://aistudio.google.com/app/apikey)
2. Make sure it's enabled and has no restrictions
3. Copy the key again (don't include any spaces)

## Setting Up Production Database (Required for Vercel)

Vercel doesn't support SQLite. You need PostgreSQL.

### Recommended: Neon (Free Tier)

1. **Sign up**: https://neon.tech
2. **Create project**: Click "Create Project"
3. **Get connection string**:
   - Go to your project dashboard
   - Click "Connection Details"
   - Copy the connection string
   - It looks like: `postgresql://user:pass@host/db?sslmode=require`

4. **Add to Vercel**:
   - Variable name: `DATABASE_URL`
   - Value: Your Neon connection string
   - Select all environments

5. **Run migrations**:
   ```bash
   # In your local terminal
   DATABASE_URL="your-neon-connection-string" npx prisma migrate deploy
   ```

## Verify Environment Variables

After deployment, check if variables are loaded:

1. Go to your deployed site
2. Try using the AI Advisors
3. If you see "MOCK RESPONSE", the API key isn't loaded
4. Check Vercel logs: **Deployments** → Click deployment → **Function Logs**

## Quick Checklist

- [ ] Added `GEMINI_API_KEY` to Vercel (all environments)
- [ ] Added `DATABASE_URL` with PostgreSQL connection (all environments)
- [ ] Redeployed after adding variables
- [ ] Ran database migrations on production database
- [ ] Tested AI Advisors on deployed site
- [ ] Checked function logs for errors

## Still Not Working?

If you're still having issues:

1. **Check the exact error message** in Vercel function logs
2. **Verify API key** works locally first
3. **Test with a simple deployment** - try deploying without database first
4. **Contact me** with the specific error message from Vercel logs

---

**Pro Tip**: Always add environment variables to ALL environments (Production, Preview, Development) to avoid issues with preview deployments.
