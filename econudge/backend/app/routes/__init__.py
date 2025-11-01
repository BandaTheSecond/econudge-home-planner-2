from flask import Blueprint
from .auth_routes import auth_bp
from .user_routes import user_bp
from .nudge_routes import nudge_bp
from .planner_routes import planner_bp
from .reward_routes import reward_bp
from .report_routes import report_bp
from .weather_routes import weather_bp

def register_blueprints(app):
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(user_bp, url_prefix="/api/users")
    app.register_blueprint(nudge_bp, url_prefix="/api/nudges")
    app.register_blueprint(planner_bp, url_prefix="/api/planner")
    app.register_blueprint(reward_bp, url_prefix="/api/rewards")
    app.register_blueprint(report_bp, url_prefix="/api/reports")
    app.register_blueprint(weather_bp, url_prefix="/api/external")
