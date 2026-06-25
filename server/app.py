from flask import Flask

from flask_cors import CORS

from flask_jwt_extended import JWTManager

from dotenv import load_dotenv

import os

from database.db import db

load_dotenv()

app = Flask(__name__)

database_url = os.getenv(
    "DATABASE_URL"
)

database_url = database_url.replace(
    "postgresql://",
    "postgresql+psycopg2://",
    1
)

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = database_url

app.config[
    "JWT_SECRET_KEY"
] = os.getenv("JWT_SECRET_KEY")

app.config[
    "SQLALCHEMY_TRACK_MODIFICATIONS"
] = False

db.init_app(app)

jwt = JWTManager(app)

CORS(app)

from routes.auth_routes import auth_bp
from routes.task_routes import task_bp

app.register_blueprint(auth_bp)

app.register_blueprint(task_bp)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)