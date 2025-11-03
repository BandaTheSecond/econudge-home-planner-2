from flask import Blueprint, jsonify
from app.models.task import Task
from app.models.goal import Goal
from app.models.reward import Reward
from sqlalchemy import func
from app import db

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

@report_bp.route("/planner-summary", methods=["GET"])
def planner_summary():
    # Aggregate task counts by status
    status_counts = db.session.query(Task.status, func.count(Task.id)).group_by(Task.status).all()
    status_dict = {status: count for status, count in status_counts}

    total_tasks = sum(status_dict.values())
    pending = status_dict.get('pending', 0)
    in_progress = status_dict.get('in_progress', 0)
    completed = status_dict.get('completed', 0)

    return jsonify({
        "total_tasks": total_tasks,
        "pending": pending,
        "in_progress": in_progress,
        "completed": completed,
        "data": [
            {"name": "Pending", "value": pending},
            {"name": "In Progress", "value": in_progress},
            {"name": "Completed", "value": completed}
        ]
    })
