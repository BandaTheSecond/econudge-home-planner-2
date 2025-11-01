from flask import Blueprint, request, jsonify
from app.models.tag import Tag
from app import db

tag_bp = Blueprint("tag_bp", __name__, url_prefix="/api/tags")

@tag_bp.route("/", methods=["GET"])
def get_tags():
    tags = Tag.query.all()
    return jsonify([{"id": tag.id, "name": tag.name} for tag in tags])

@tag_bp.route("/", methods=["POST"])
def add_tag():
    data = request.get_json()
    tag = Tag(name=data["name"])
    db.session.add(tag)
    db.session.commit()
    return jsonify({"id": tag.id, "name": tag.name})
