from flask import Blueprint, request, jsonify
from app.models.task import Task
from app.schemas.task_schema import TaskSchema
from app import db
from datetime import datetime

planner_bp = Blueprint("planner_bp", __name__, url_prefix="/api/planner")
task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

@planner_bp.route("/", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return tasks_schema.jsonify(tasks)

@planner_bp.route("/", methods=["POST"])
def add_task():
    data = request.get_json()
    new_task = Task(
        title=data["title"],
        scheduled_for=datetime.fromisoformat(data["scheduled_for"]).date(),
        due_date=datetime.fromisoformat(data["due_date"]).date() if data.get("due_date") else None
    )
    db.session.add(new_task)
    db.session.commit()
    return task_schema.jsonify(new_task)

@planner_bp.route("/<int:id>", methods=["PUT"])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.get_json()
    task.title = data.get("title", task.title)
    if "scheduled_for" in data:
        task.scheduled_for = datetime.fromisoformat(data["scheduled_for"]).date()
    if "due_date" in data:
        task.due_date = datetime.fromisoformat(data["due_date"]).date() if data["due_date"] else None
    db.session.commit()
    return task_schema.jsonify(task)

@planner_bp.route("/<int:id>/progress", methods=["PATCH"])
def update_progress(id):
    task = Task.query.get_or_404(id)
    data = request.get_json()
    if "status" in data:
        task.status = data["status"]
        # Auto-set progress based on status if not manually set
        if "progress_percentage" not in data:
            status_progress = {'pending': 0, 'in_progress': 25, 'completed': 100}
            task.progress_percentage = status_progress.get(task.status, task.progress_percentage)
    if "progress_percentage" in data:
        task.progress_percentage = min(100, max(0, data["progress_percentage"]))
    db.session.commit()
    return task_schema.jsonify(task)

@planner_bp.route("/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"})
