from flask import Blueprint
from flask import request
from flask import jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from database.db import db

from models.task import Task

task_bp = Blueprint(
    "tasks",
    __name__
)

# =========================
# GET ALL TASKS
# =========================
@task_bp.route(
    "/api/tasks",
    methods=["GET"]
)
@jwt_required()
def get_tasks():

    user_id = int(get_jwt_identity())

    tasks = Task.query.filter_by(
        user_id=user_id
    ).all()

    result = []

    for task in tasks:

        result.append({

            "id": task.id,

            "title": task.title,

            "description":
            task.description,

            "status":
            task.status,

            "priority":
            task.priority,

            "due_date":
            task.due_date

        })

    return jsonify(result)


# =========================
# CREATE TASK
# =========================
@task_bp.route(
    "/api/tasks",
    methods=["POST"]
)
@jwt_required()
def create_task():

    user_id = int(get_jwt_identity())

    data = request.get_json()

    if not data.get("title"):

        return jsonify({
            "message":
            "Title is required"
        }), 400

    task = Task(

        title=data.get("title"),

        description=
        data.get("description", ""),

        status=
        data.get("status", "Pending"),

        priority=
        data.get("priority", "Medium"),

        due_date=
        data.get("due_date", ""),

        user_id=user_id
    )

    db.session.add(task)

    db.session.commit()

    return jsonify({
        "message":
        "Task Added"
    }), 201


# =========================
# UPDATE TASK
# =========================
@task_bp.route(
    "/api/tasks/<int:id>",
    methods=["PUT"]
)
@jwt_required()
def update_task(id):

    user_id = int(get_jwt_identity())

    task = Task.query.filter_by(
        id=id,
        user_id=user_id
    ).first()

    if not task:

        return jsonify({
            "message":
            "Task not found"
        }), 404

    data = request.get_json()

    task.title = data.get(
        "title",
        task.title
    )

    task.description = data.get(
        "description",
        task.description
    )

    task.status = data.get(
        "status",
        task.status
    )

    task.priority = data.get(
        "priority",
        task.priority
    )

    task.due_date = data.get(
        "due_date",
        task.due_date
    )

    db.session.commit()

    return jsonify({
        "message":
        "Task Updated"
    })


# =========================
# DELETE TASK
# =========================
@task_bp.route(
    "/api/tasks/<int:id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_task(id):

    user_id = int(get_jwt_identity())

    task = Task.query.filter_by(
        id=id,
        user_id=user_id
    ).first()

    if not task:

        return jsonify({
            "message":
            "Task not found"
        }), 404

    db.session.delete(task)

    db.session.commit()

    return jsonify({
        "message":
        "Task Deleted"
    })