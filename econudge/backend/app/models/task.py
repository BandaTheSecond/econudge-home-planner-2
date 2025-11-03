from ..extensions import db

class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    scheduled_for = db.Column(db.Date, nullable=False)
    due_date = db.Column(db.Date, nullable=True)
    status = db.Column(db.String(20), default='pending')  # pending, in_progress, completed
    progress_percentage = db.Column(db.Integer, default=0)  # 0-100

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    def __repr__(self):
        return f"<Task {self.title}>"
