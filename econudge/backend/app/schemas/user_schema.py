from ..extensions import ma
from ..models.user import User
from .task_schema import TaskSchema

class UserSchema(ma.Schema):
    id = ma.Int(dump_only=True)
    username = ma.Str(required=True)
    name = ma.Str()
    email = ma.Str(required=True)
    tasks = ma.List(ma.Nested(TaskSchema), dump_only=True)
    completed_nudges = ma.List(ma.Nested(lambda: NudgeSchema()), dump_only=True)

user_schema = UserSchema()
users_schema = UserSchema(many=True)
