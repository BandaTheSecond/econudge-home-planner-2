from app.extensions import db
from datetime import datetime

class Nudge(db.Model):
    __tablename__ = "nudges"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(80), default="general")
    difficulty = db.Column(db.String(50), default="easy")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "difficulty": self.difficulty,
            "created_at": self.created_at.isoformat()
        }
