from app.extensions import ma
from app.models.reward import Reward

class RewardSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Reward
        load_instance = True

reward_schema = RewardSchema()
rewards_schema = RewardSchema(many=True)
