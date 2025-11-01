from datetime import datetime
from ..extensions import db

class Plan(db.Model):
    __tablename__ = "plans"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    scheduled_for = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(20), default="pending")

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    nudge_id = db.Column(db.Integer, db.ForeignKey("nudges.id"))

    nudge = db.relationship("Nudge", backref="plans")
