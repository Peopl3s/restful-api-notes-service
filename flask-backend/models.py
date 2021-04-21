from datetime import datetime
from config import db, ma
from werkzeug.security import generate_password_hash,  check_password_hash

class Note(db.Model):
    __tablename__ = 'note'
    note_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), index=True)
    content = db.Column(db.String(50))
    remind = db.Column(db.Boolean)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, 
                                        onupdate=datetime.utcnow)

class NoteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Note
        include_relationships = True
        #sqla_session = db.session    
        load_instance = True                               

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password_hash = db.Column(db.String(100), nullable=False)
    created_on = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_on = db.Column(db.DateTime(), default=datetime.utcnow,  
                                            onupdate=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
        
    def __repr__(self):
        return f'<{self.id}:{self.username}>'