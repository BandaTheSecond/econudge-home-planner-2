from flask import Blueprint, request, jsonify
from app.models.reward import Reward
from app.schemas.reward_schema import RewardSchema
from app import db

reward_bp = Blueprint("reward_bp", __name__, url_prefix="/api/rewards")
reward_schema = RewardSchema()
rewards_schema = RewardSchema(many=True)

@reward_bp.route("/", methods=["GET"])
def get_rewards():
    return rewards_schema.jsonify(Reward.query.all())

@reward_bp.route("/", methods=["POST"])
def add_reward():
    data = request.get_json()
    reward = Reward(name=data["name"], points=data["points"])
    db.session.add(reward)
    db.session.commit()
    return reward_schema.jsonify(reward)
