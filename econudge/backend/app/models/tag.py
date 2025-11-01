from ..extensions import db

class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    nudges = db.relationship(
        "Nudge",
        secondary="nudge_tags",
        back_populates="tags"
    )
