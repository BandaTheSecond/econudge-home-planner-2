from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models.nudge import Nudge
from flask_jwt_extended import jwt_required

nudge_bp = Blueprint("nudges", __name__)

@nudge_bp.get("/")
@jwt_required(optional=True)
def list_nudges():
    nudges = Nudge.query.order_by(Nudge.created_at.desc()).all()
    return jsonify([n.to_dict() for n in nudges]), 200

@nudge_bp.post("/")
@jwt_required()
def create_nudge():
    data = request.get_json() or {}
    nudge = Nudge(
        title=data.get("title", "Untitled Nudge"),
        description=data.get("description", ""),
        category=data.get("category", "general"),
        difficulty=data.get("difficulty", "easy")
    )
    db.session.add(nudge)
    db.session.commit()
    return jsonify(nudge.to_dict()), 201
