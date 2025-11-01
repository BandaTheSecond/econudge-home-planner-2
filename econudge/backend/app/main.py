from flask import Blueprint
from .routes.auth_routes import auth_bp
from .routes.user_routes import user_bp
from .routes.nudge_routes import nudge_bp
from .routes.planner_routes import planner_bp
from .routes.tag_routes import tag_bp

def register_blueprints(app):
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(user_bp, url_prefix="/api/users")
    app.register_blueprint(nudge_bp, url_prefix="/api/nudges")
    app.register_blueprint(planner_bp, url_prefix="/api/planner")
    app.register_blueprint(tag_bp, url_prefix="/api/tags")
