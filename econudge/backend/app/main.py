from flask import Blueprint

def register_blueprints(app):
    from .routes.auth_routes import auth_bp
    from .routes.user_routes import user_bp
    from .routes.nudge_routes import nudge_bp
    from .routes.planner_routes import planner_bp
    from .routes.tag_routes import tag_bp
    from .routes.goal_routes import goal_bp
    from .routes.reward_routes import reward_bp
    from .routes.report_routes import report_bp
    from .routes.weather_routes import weather_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(user_bp, url_prefix="/api/users")
    app.register_blueprint(nudge_bp, url_prefix="/api/nudges")
    app.register_blueprint(planner_bp, url_prefix="/api/planner")
    app.register_blueprint(tag_bp, url_prefix="/api/tags")
    app.register_blueprint(goal_bp, url_prefix="/api/goals")
    app.register_blueprint(reward_bp, url_prefix="/api/rewards")
    app.register_blueprint(report_bp, url_prefix="/api/reports")
    app.register_blueprint(weather_bp, url_prefix="/api/weather")
