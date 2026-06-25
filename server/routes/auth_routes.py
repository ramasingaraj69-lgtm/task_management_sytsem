from flask import Blueprint
from flask import request
from flask import jsonify

from werkzeug.security import \
generate_password_hash

from werkzeug.security import \
check_password_hash

from flask_jwt_extended import \
create_access_token

from database.db import db

from models.user import User

auth_bp = Blueprint(
    "auth",
    __name__
)

# REGISTER
@auth_bp.route(
    "/api/register",
    methods=["POST"]
)

def register():

    data = request.json

    existing_user = User.query.filter_by(
        email=data["email"]
    ).first()

    if existing_user:

        return jsonify({
            "message":
            "Email already exists"
        }), 400

    hashed_password = \
    generate_password_hash(
        data["password"]
    )

    user = User(
        name=data["name"],
        email=data["email"],
        password=hashed_password
    )

    db.session.add(user)

    db.session.commit()

    return jsonify({
        "message":
        "User Registered"
    })


# LOGIN
@auth_bp.route(
    "/api/login",
    methods=["POST"]
)

def login():

    data = request.json

    user = User.query.filter_by(
        email=data["email"]
    ).first()

    if not user:

        return jsonify({
            "message":
            "Invalid Email"
        }), 401

    if not check_password_hash(
        user.password,
        data["password"]
    ):

        return jsonify({
            "message":
            "Invalid Password"
        }), 401

    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "token": token,
        "name": user.name
    })