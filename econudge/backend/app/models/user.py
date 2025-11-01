from ..extensions import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    tasks = db.relationship("Task", backref="user", lazy=True)

    completed_nudges = db.relationship(
        "Nudge",
        secondary="user_nudges",
        back_populates="users_completed"
    )

    def __repr__(self):
        return f"<User {self.email}>"
