# Deployment Preparation Plan for Econudge App

## Steps to Complete

- [x] Fix Vite config proxy to target port 5555
- [x] Configure Flask to serve React static files and handle client-side routing
- [x] Update backend config for production (environment variables for secrets and database)
- [x] Add Gunicorn to backend requirements for production WSGI server
- [x] Build the React frontend for production
- [x] Test the integrated app locally (backend serves frontend, API works)
- [x] Provide deployment instructions for Render (backend web service, frontend static or separate)

## Notes
- Ensure SQLite is replaced with PostgreSQL for production if needed.
- Test thoroughly to confirm the app works well before deployment.
