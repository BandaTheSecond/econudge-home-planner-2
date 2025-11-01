from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..extensions import db
from ..models.user import User

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.post("/register")
def register():
    data = request.get_json() or {}

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return {"error": "username, email and password are required"}, 400

    # check if exists
    if User.query.filter((User.username == username) | (User.email == email)).first():
        return {"error": "User with that username or email already exists"}, 400

    user = User(username=username, email=email)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.id)

    return {
        "message": "User registered",
        "user": {"id": user.id, "username": user.username, "email": user.email},
        "access_token": access_token
    }, 201


@auth_bp.post("/login")
def login():
    data = request.get_json() or {}
    email_or_username = data.get("email") or data.get("username")
    password = data.get("password")

    if not email_or_username or not password:
        return {"error": "email/username and password are required"}, 400

    # allow login by username OR email
    user = User.query.filter(
        (User.email == email_or_username) | (User.username == email_or_username)
    ).first()

    if not user or not user.check_password(password):
        return {"error": "Invalid credentials"}, 401

    access_token = create_access_token(identity=user.id)

    return {
        "message": "Login successful",
        "user": {"id": user.id, "username": user.username, "email": user.email},
        "access_token": access_token
    }, 200


@auth_bp.get("/me")
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
    }, 200
