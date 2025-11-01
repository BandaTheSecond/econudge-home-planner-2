from ..extensions import db

nudge_tags = db.Table(
    "nudge_tags",
    db.Column("nudge_id", db.Integer, db.ForeignKey("nudges.id"), primary_key=True),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id"), primary_key=True)
)

user_nudges = db.Table(
    "user_nudges",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("nudge_id", db.Integer, db.ForeignKey("nudges.id"), primary_key=True),
    db.Column("completed", db.Boolean, default=False),
    db.Column("completed_at", db.DateTime)
)
