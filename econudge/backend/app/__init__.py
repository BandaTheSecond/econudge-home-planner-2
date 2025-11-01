from flask import Flask
from .extensions import db, migrate, bcrypt, jwt, cors
from .main import register_blueprints
from .utils.error_handlers import register_error_handlers
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    register_blueprints(app)
    register_error_handlers(app)

    return app
