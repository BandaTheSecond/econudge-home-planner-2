from flask import Flask
from config import Config
from .extensions import init_extensions
from .routes import register_blueprints
from .utils.error_handlers import register_error_handlers
import os

def create_app(config_class=Config):
    app = Flask(__name__, instance_relative_config=True)

    # make sure instance folder exists
    try:
        os.makedirs(app.instance_path, exist_ok=True)
    except OSError:
        pass

    app.config.from_object(config_class)

    init_extensions(app)
    register_blueprints(app)
    register_error_handlers(app)

    return app
