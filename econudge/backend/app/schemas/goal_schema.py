from app.extensions import ma
from app.models.goal import Goal

class GoalSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Goal
        load_instance = True
        include_fk = True
        include_relationships = False
        sqla_session = None

goal_schema = GoalSchema()
goals_schema = GoalSchema(many=True)
