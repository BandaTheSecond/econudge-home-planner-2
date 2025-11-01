from ..extensions import db

class Reward(db.Model):
    __tablename__ = "rewards"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    points = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f"<Reward {self.name}>"
