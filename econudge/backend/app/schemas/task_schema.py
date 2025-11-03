from ..extensions import ma
from ..models.task import Task

class TaskSchema(ma.Schema):
    id = ma.Int(dump_only=True)
    title = ma.Str(required=True)
    description = ma.Str()
    scheduled_for = ma.Date(required=True)
    due_date = ma.Date()
    status = ma.Str()
    progress_percentage = ma.Int()
    user_id = ma.Int()

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)
