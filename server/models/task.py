from database.db import db

class Task(db.Model):

    __tablename__ = "tasks"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    title = db.Column(
        db.String(255),
        nullable=False
    )

    description = db.Column(
        db.Text
    )

    status = db.Column(
        db.String(50),
        default="Pending"
    )

    priority = db.Column(
        db.String(50),
        default="Medium"
    )

    due_date = db.Column(
        db.String(50)
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id")
    )