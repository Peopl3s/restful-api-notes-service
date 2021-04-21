from config import db, SYMBOLS_COUNT
from flask import make_response, abort
from models import Note, NoteSchema
from utility import get_first_n_symbols_content

def read_all(query=None):
    notes = None
    if query:
        notes =  Note.query.filter((Note.title.like(f'%{query}%')) | (Note.title.like(f'%{query}%'))).order_by(Note.title)
    else:
        notes = Note.query.order_by(Note.title)
    note_schema = NoteSchema(many=True)
    return note_schema.dump(notes.all())

def read_one(note_id):
    note = Note.query.filter(Note.note_id == note_id).one_or_none()
    if note is not None:
        note_schema = NoteSchema()
        return note_schema.dump(note)
    else:
        abort(400, f'Note with id - {note_id} not found')

def create(note):
    content = note.get('content', None)
    title = note.get('title', None)
    remind = note.get('remind', None)

    if not title:
        title = get_first_n_symbols_content(SYMBOLS_COUNT, content)
        note['title'] = title
    
    existing_note = Note.query.filter(Note.title == title)\
    .filter(Note.content == content)\
    .filter(Note.remind == remind)\
    .one_or_none()
    
    if existing_note is None:
        schema = NoteSchema()
        print(note)
        new_note = schema.load(note, session=db.session)

        db.session.add(new_note)
        db.session.commit()

        return schema.dump(new_note), 201
    else:
        abort(406, 'Note already exists')

def update(note_id, note):
    update_note = Note.query.filter(Note.note_id == note_id).one_or_none()

    content = note.get('content', None)
    title = note.get('title', None)
    remind = note.get('remind', None)

    if not title:
        title = get_first_n_symbols_content(SYMBOLS_COUNT, content)
        note['title'] = title

    existing_note = Note.query.filter(Note.title == title)\
        .filter(Note.content == content)\
        .filter(Note.remind == Note.remind)\
        .one_or_none()
    
    if update_note is None:
        abort(404, 'Note with not found')
    elif (existing_note is not None and existing_note.note_id != note_id):
        abort(406, 'Note already exists')
    else:
        schema = NoteSchema()
        update = schema.load(note, session=db.session)

        update.note_id = update_note.note_id

        db.session.merge(update)
        db.session.commit()

        data = schema.dump(update_note)

        return data, 200

def delete(note_id):
    note = Note.query.filter(Note.note_id == note_id).one_or_none()
    if note is not None:
        db.session.delete(note)
        db.session.commit()
        return make_response('Note successfully deleted', 200)
    else:
        abort(404, 'Note with not found')
