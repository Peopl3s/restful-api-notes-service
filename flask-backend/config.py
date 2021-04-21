import os
import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

basedir = os.path.abspath(os.path.dirname(__file__))

connex_app = connexion.App(__name__, specification_dir=basedir)
app = connex_app.app
CORS(app)

db_username = os.environ['DATABASE_USERNAME']
db_userpassword = os.environ['DATABASE_USERNAME_PASSWORD']
db_host = os.environ['DATABASE_HOST']
db_port = os.environ['DATABASE_PORT']
db_name = os.environ['DATABASE_TABLENAME']

SYMBOLS_COUNT = 5 # the first characters of the note text (for an unspecified title)

app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_username}:{db_userpassword}@{db_host}:{db_port}/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

ma = Marshmallow(app)
