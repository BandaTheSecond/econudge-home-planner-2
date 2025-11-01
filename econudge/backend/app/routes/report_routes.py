from flask import Blueprint, jsonify
from app.models.task import Task
from app.models.goal import Goal
from app.models.reward import Reward

report_bp = Blueprint("report_bp", __name__, url_prefix="/api/reports")

@report_bp.route("/", methods=["GET"])
def generate_report():
    total_tasks = Task.query.count()
    completed_tasks = Task.query.filter_by(completed=True).count()
    goals = Goal.query.count()
    rewards = Reward.query.count()
    return jsonify({
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "goals": goals,
        "rewards": rewards,
        "completion_rate": round((completed_tasks / total_tasks) * 100, 2) if total_tasks > 0 else 0
    })
