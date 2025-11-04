# Deployment Instructions for Render

## Overview
Your Econudge app is now ready for production deployment on Render. The backend (Flask) will serve the React frontend statically, so you only need to deploy the backend as a web service.

## Prerequisites
- Create a Render account at https://render.com
- GitHub repository with your code (push the current changes)

## Step 1: Prepare for Production
1. Ensure all changes are committed and pushed to GitHub.
2. For production, consider switching to PostgreSQL:
   - Update `config.py` DATABASE_URL to use PostgreSQL (Render provides this via environment variables).
   - Install `psycopg2-binary` in requirements.txt if using PostgreSQL.

## Step 2: Deploy Backend on Render
1. Go to Render Dashboard > New > Web Service
2. Connect your GitHub repo
3. Configure:
   - **Name**: econudge-backend (or your choice)
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT econudge.backend.wsgi:app`
4. Add Environment Variables:
   - `FLASK_DEBUG`: False
   - `SECRET_KEY`: Generate a secure random key
   - `JWT_SECRET_KEY`: Generate a secure random key
   - `DATABASE_URL`: Render will provide this for PostgreSQL (or use SQLite for simplicity)
5. Click Create Web Service

## Step 3: Access Your App
- Once deployed, Render will provide a URL (e.g., https://econudge-backend.onrender.com)
- Your full-stack app will be live at that URL

## Notes
- Free tier has limitations; upgrade for more resources.
- Monitor logs in Render dashboard for any issues.
- For custom domain, configure in Render settings.

## Testing
- Visit the deployed URL to see the React app.
- Test API endpoints like `/api/users/status` to ensure backend works.
