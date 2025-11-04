from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models.user import User
from ..schemas.user_schema import user_schema, users_schema

user_bp = Blueprint("user_bp", __name__)

# ✅ Get status
@user_bp.route("/status", methods=["GET"])
def status():
    return jsonify({"status": "running"}), 200

# ✅ Get all users
@user_bp.route("/", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify(users_schema.dump(users)), 200


# ✅ Get a single user by ID
@user_bp.route("/<int:id>", methods=["GET"])
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user_schema.dump(user)), 200


# ✅ Create a new user
@user_bp.route("/", methods=["POST"])
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        new_user = User(
            username=data.get("username"),
            name=data.get("name"),
            email=data.get("email"),
            password=data.get("password")  # hash this in model or use bcrypt
        )
        new_user.set_password(data.get("password"))
        db.session.add(new_user)
        db.session.commit()
        return jsonify(user_schema.dump(new_user)), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# ✅ Update user info
@user_bp.route("/<int:id>", methods=["PATCH"])
def update_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    user.username = data.get("username", user.username)
    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)

    if "password" in data:
        user.set_password(data["password"])

    db.session.commit()
    return jsonify(user_schema.dump(user)), 200


# ✅ Delete a user
@user_bp.route("/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"User {id} deleted"}), 200
