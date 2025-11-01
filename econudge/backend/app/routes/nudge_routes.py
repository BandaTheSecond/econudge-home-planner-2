from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models.nudge import Nudge
from ..models.tag import Tag

nudge_bp = Blueprint("nudge_bp", __name__)

# GET all
@nudge_bp.get("/")
def get_nudges():
    nudges = Nudge.query.all()
    return jsonify([
        {
            "id": n.id,
            "title": n.title,
            "description": n.description,
            "difficulty": n.difficulty,
            "points": n.points,
            "tags": [t.name for t in n.tags],
        } for n in nudges
    ]), 200

# GET one
@nudge_bp.get("/<int:nudge_id>")
def get_nudge(nudge_id):
    n = Nudge.query.get_or_404(nudge_id)
    return {
        "id": n.id,
        "title": n.title,
        "description": n.description,
        "difficulty": n.difficulty,
        "points": n.points,
        "tags": [t.name for t in n.tags],
    }, 200

# CREATE
@nudge_bp.post("/")
def create_nudge():
    data = request.get_json() or {}

    # simple validations
    required = ["title", "description"]
    for field in required:
        if field not in data:
            return {"error": f"{field} is required"}, 400

    nudge = Nudge(
        title=data["title"],
        description=data["description"],
        difficulty=data.get("difficulty", "easy"),
        points=data.get("points", 5),
    )

    # add tags if provided
    tag_names = data.get("tags", [])
    for name in tag_names:
        tag = Tag.query.filter_by(name=name).first()
        if not tag:
            tag = Tag(name=name)
        nudge.tags.append(tag)

    db.session.add(nudge)
    db.session.commit()

    return {"message": "Nudge created", "id": nudge.id}, 201

# UPDATE
@nudge_bp.patch("/<int:nudge_id>")
def update_nudge(nudge_id):
    n = Nudge.query.get_or_404(nudge_id)
    data = request.get_json() or {}

    if "title" in data:
        n.title = data["title"]
    if "description" in data:
        n.description = data["description"]
    if "difficulty" in data:
        n.difficulty = data["difficulty"]
    if "points" in data:
        n.points = data["points"]

    db.session.commit()
    return {"message": "Nudge updated"}, 200

# DELETE
@nudge_bp.delete("/<int:nudge_id>")
def delete_nudge(nudge_id):
    n = Nudge.query.get_or_404(nudge_id)
    db.session.delete(n)
    db.session.commit()
    return {"message": "Nudge deleted"}, 200
