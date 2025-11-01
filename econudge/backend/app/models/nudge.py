from ..extensions import db

class Nudge(db.Model):
    __tablename__ = "nudges"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    difficulty = db.Column(db.String(20), default="easy")  # validation
    points = db.Column(db.Integer, default=5)

    tags = db.relationship(
        "Tag",
        secondary="nudge_tags",
        back_populates="nudges"
    )

    users_completed = db.relationship(
        "User",
        secondary="user_nudges",
        back_populates="completed_nudges"
    )
