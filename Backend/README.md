# Backend API (Supabase + Express)

This backend now uses **Supabase Postgres** instead of MongoDB.

## Setup
1. Create a Supabase project.
2. Run `db/init-supabase.sql` in Supabase SQL editor.
3. Copy `.env.example` to `.env` and set:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
4. Install dependencies and run:

```bash
npm install
npm run dev
```

API runs at `http://localhost:5000/api` by default.

## Deploy on Render (Recommended)
1. Push this repository to GitHub.
2. In Render, create a new Blueprint and select this repo.
3. Render will detect `render.yaml` and create `jukwaa-backend`.
4. Fill required secret env vars in Render:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
5. Deploy and verify:
   - `https://YOUR_RENDER_SERVICE/api/health`
   - `https://YOUR_RENDER_SERVICE/api/news?limit=1`

After backend is live, set Netlify frontend env var:
- `VITE_API_BASE_URL=https://YOUR_RENDER_SERVICE/api`

Then trigger a Netlify redeploy.

## Environment Variables
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PORT`
- `FRONTEND_ORIGIN`
- `BACKEND_PUBLIC_URL`
- `ALLOW_START_WITHOUT_DB`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_NAME`
- `JWT_SECRET`

## Database Schema
- SQL file: `db/init-supabase.sql`
- Tables include:
  - `blogs`, `resources`, `careers`, `career_applications`
  - `events`, `event_registrations`
  - `advertisements`, `subscriptions`
  - `team_members`, `videos`, `gallery_items`
  - `resource_downloads`, `admin_users`

## Notes
- API responses still expose `_id` for frontend compatibility.
- Date fields are stored as `timestamptz` and returned as ISO timestamps.
- Legacy Mongo model files and scripts are no longer used by the running API.
