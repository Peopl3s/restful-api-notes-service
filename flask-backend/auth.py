from config import db
from models import User

def basic_auth(username, password, required_scopes=None):
    user = User.query.filter(User.username == username).one_or_none()
    if user is not None and user.check_password(password):
        return {'sub': 'admin'}
    return None
