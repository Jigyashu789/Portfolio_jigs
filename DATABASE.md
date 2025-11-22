# Database Management Guide

## Current Setup

✅ **Database Type**: SQLite (Development)
✅ **Location**: `prisma/dev.db`
✅ **Size**: 56 KB
✅ **Status**: Initialized and ready

## Database Schema

Your database has 3 tables:

### 1. Conversation
- Stores AI chat conversations
- Fields: id, sessionId, agentType, createdAt, updatedAt
- Relations: Has many Messages

### 2. Message
- Stores individual chat messages
- Fields: id, conversationId, role, content, createdAt
- Relations: Belongs to Conversation

### 3. ContactMessage
- Stores contact form submissions
- Fields: id, name, email, message, createdAt

## Managing Your Database

### View and Edit Data (Prisma Studio)

Open Prisma Studio to view and edit your database visually:

```bash
npx prisma studio
```

This will open a web interface at `http://localhost:5555` where you can:
- View all tables
- Add, edit, delete records
- Search and filter data

### Reset Database

If you need to clear all data and start fresh:

```bash
npx prisma migrate reset
```

⚠️ **Warning**: This will delete all data!

### Generate Prisma Client

After schema changes, regenerate the client:

```bash
npx prisma generate
```

### Create New Migration

After modifying `schema.prisma`:

```bash
npx prisma migrate dev --name your_migration_name
```

## Production Database Setup

For production (Vercel/Netlify), you should use PostgreSQL instead of SQLite.

### Recommended: Neon (Serverless Postgres)

1. **Sign up**: https://neon.tech
2. **Create project**: Free tier available
3. **Get connection string**: 
   ```
   postgresql://user:password@host/database?sslmode=require
   ```
4. **Update schema.prisma**:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. **Add to environment variables** in Vercel/Netlify
6. **Run migrations**:
   ```bash
   npx prisma migrate deploy
   ```

### Alternative: Supabase

1. **Sign up**: https://supabase.com
2. **Create project**
3. **Get connection string** from Settings → Database
4. Follow same steps as Neon above

## Backup Your Data

### Export SQLite Database

```bash
# Create backup
cp prisma/dev.db prisma/dev.db.backup

# Or export to SQL
sqlite3 prisma/dev.db .dump > backup.sql
```

### Restore from Backup

```bash
# Restore from file
cp prisma/dev.db.backup prisma/dev.db

# Or restore from SQL
sqlite3 prisma/dev.db < backup.sql
```

## Troubleshooting

### "Database not found" Error

```bash
npx prisma migrate dev --name init
```

### "Prisma Client not generated" Error

```bash
npx prisma generate
```

### Connection Issues

Check your `.env` file has:
```
DATABASE_URL="file:./dev.db"
```

## Quick Commands Reference

```bash
# View database in browser
npx prisma studio

# Run migrations
npx prisma migrate dev

# Deploy migrations (production)
npx prisma migrate deploy

# Generate client
npx prisma generate

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Format schema file
npx prisma format
```

## Database Status

Current configuration:
- ✅ Schema defined
- ✅ Migrations applied
- ✅ Prisma Client generated
- ✅ Database file created
- ✅ Ready for development

Your database is fully set up and ready to use! 🎉
