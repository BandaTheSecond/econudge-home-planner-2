from flask import Flask, send_from_directory
from .extensions import db, migrate, ma, bcrypt, jwt, cors
import os

def create_app():
    app = Flask(__name__)

    # Config
    from config import Config
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, origins=app.config['CORS_ORIGINS'])

    # Serve React App - register before blueprints to avoid catching API routes
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path.startswith('api/'):
            # Let Flask handle API routes
            from flask import abort
            abort(404)
        if path != "" and os.path.exists(app.static_folder + '/' + path):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    # Register blueprints
    from .main import register_blueprints
    register_blueprints(app)

    return app
