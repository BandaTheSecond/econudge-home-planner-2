import os
from datetime import timedelta

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'econudge.db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-econudge")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-jwt")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=2)

    # Production settings
    DEBUG = os.getenv("FLASK_DEBUG", "False").lower() in ("true", "1", "yes")
    TESTING = False
