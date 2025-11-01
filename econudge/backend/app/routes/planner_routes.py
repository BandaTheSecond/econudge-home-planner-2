from flask import Blueprint, request, jsonify
from app.models.task import Task
from app.schemas.task_schema import TaskSchema
from app import db

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
    new_task = Task(title=data["title"], description=data.get("description"), completed=False)
    db.session.add(new_task)
    db.session.commit()
    return task_schema.jsonify(new_task)

@planner_bp.route("/<int:id>", methods=["PATCH"])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.get_json()
    task.completed = data.get("completed", task.completed)
    task.title = data.get("title", task.title)
    db.session.commit()
    return task_schema.jsonify(task)

@planner_bp.route("/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"})
