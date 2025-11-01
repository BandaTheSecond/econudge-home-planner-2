from ..extensions import ma
from ..models.task import Task

class TaskSchema(ma.Schema):
    id = ma.Int(dump_only=True)
    title = ma.Str(required=True)
    description = ma.Str()
    completed = ma.Bool()
    user_id = ma.Int()

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)
