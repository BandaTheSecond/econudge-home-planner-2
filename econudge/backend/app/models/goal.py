from ..extensions import db

class Goal(db.Model):
    __tablename__ = "goals"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    target_amount = db.Column(db.Float, nullable=False)
    progress = db.Column(db.Float, default=0.0)

    def __repr__(self):
        return f"<Goal {self.title}>"
