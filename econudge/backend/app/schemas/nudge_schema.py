from ..extensions import ma
from ..models.nudge import Nudge

class NudgeSchema(ma.Schema):
    id = ma.Int(dump_only=True)
    title = ma.Str(required=True)
    description = ma.Str(required=True)
    difficulty = ma.Str()
    points = ma.Int()

nudge_schema = NudgeSchema()
nudges_schema = NudgeSchema(many=True)
