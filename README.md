# Jukwaa La Demokrasia

## Project Overview

Jukwaa La Demokrasia (JLD) is a non-partisan civic education platform dedicated to empowering citizens, strengthening democracy, and transforming Kenya through civic education and leadership development across all 47 counties.

## Features

- Civic education resources
- Leadership development programs
- News and updates on democratic processes
- Event management and registration
- Team and gallery sections
- Subscription-based resource access

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn-ui
- **Backend**: Node.js, Express, Supabase Postgres

## Getting Started

### Prerequisites

- Node.js & npm installed
- Supabase project (for backend database)

### Installation

```sh
# Install frontend dependencies
npm install

# Install backend dependencies
cd Backend
npm install
```

### Environment Variables

Frontend (`.env`):

```sh
VITE_API_BASE_URL=http://localhost:5000/api
```

Backend (`Backend/.env`):

```sh
SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
PORT=5000
FRONTEND_ORIGIN=http://localhost:8080,http://localhost:5173
BACKEND_PUBLIC_URL=http://localhost:5000
ALLOW_START_WITHOUT_DB=false
ADMIN_EMAIL=admin@jukwaa.local
ADMIN_PASSWORD=admin123
ADMIN_NAME=Primary Admin
JWT_SECRET=replace_with_a_strong_random_secret
```

### Running Locally

```sh
# Start frontend development server
npm run dev

# Start backend server
cd Backend
npm run dev
```

### Netlify Frontend + Supabase Backend (Recommended)

This frontend should connect to your deployed backend API, and the backend connects to Supabase using the service role key.

1. Deploy backend (Render, Railway, Fly.io, etc.).
2. Set backend env vars:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `FRONTEND_ORIGIN=https://YOUR_NETLIFY_SITE.netlify.app`
   - `BACKEND_PUBLIC_URL=https://YOUR_BACKEND_DOMAIN`
3. In Netlify site environment variables, set:
   - `VITE_API_BASE_URL=https://YOUR_BACKEND_DOMAIN/api`
4. Deploy frontend on Netlify (build command `npm run build`, publish directory `dist`).

Do not place `SUPABASE_SERVICE_ROLE_KEY` in Netlify frontend variables.

## License

MIT
