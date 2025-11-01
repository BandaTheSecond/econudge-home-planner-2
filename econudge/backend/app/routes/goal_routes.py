from flask import Blueprint, request, jsonify
from app.models.goal import Goal
from app.schemas.goal_schema import GoalSchema
from app import db

goal_bp = Blueprint("goal_bp", __name__, url_prefix="/api/goals")
goal_schema = GoalSchema()
goals_schema = GoalSchema(many=True)

@goal_bp.route("/", methods=["GET"])
def get_goals():
    return goals_schema.jsonify(Goal.query.all())

@goal_bp.route("/", methods=["POST"])
def add_goal():
    data = request.get_json()
    goal = Goal(title=data["title"], target_amount=data["target_amount"])
    db.session.add(goal)
    db.session.commit()
    return goal_schema.jsonify(goal)
