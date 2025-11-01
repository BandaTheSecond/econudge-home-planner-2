from ..extensions import db
from datetime import datetime

class Report(db.Model):
    __tablename__ = "reports"

    id = db.Column(db.Integer, primary_key=True)
    generated_on = db.Column(db.DateTime, default=datetime.utcnow)
    summary = db.Column(db.Text)

    def __repr__(self):
        return f"<Report {self.id} - {self.generated_on}>"
