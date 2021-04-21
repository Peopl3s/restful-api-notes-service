import React, { Component, Input } from 'react';
import { Table, Button, Container, Modal } from 'react-bootstrap';
import { CustomDialog, useDialog } from 'react-st-modal';
import { FaPlusCircle } from 'react-icons/fa';
import LoginModal from './LoginModal';
import LoginModalNoteForm from './LoginModalNoteForm';

export default class Notelist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			showModal: false
		};
		this.createNote = this.createNote.bind(this);
		this.editNote = this.editNote.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
		this.getListNotes = this.getListNotes.bind(this);
	}

	getListNotes() {
		fetch("http://127.0.0.1:5000/api/notes")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result.sort((a, b) => parseInt(a.note_id) - parseInt(b.note_id))
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	componentDidMount() {
		this.getListNotes()
	}

	componentDidUpdate() {
		this.getListNotes()
	}

	createNote(result) {
		let authString = `${result.login}:${result.password}`
		let data = {
			title: result.title,
			content: result.content,
			remind: result.remind == "on" ? true : false
		}
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		headers.set('Content-Type', 'application/json')
		fetch(`http://127.0.0.1:5000/api/notes`, { method: 'POST', headers: headers, body: JSON.stringify(data) })
			.then(res => res.json())
			.then(
				(result) => {
					console.log('Success')
				},
				(error) => {
					console.log(error)
				}
			)
	}

	editNote(id, result) {
		let authString = `${result.login}:${result.password}`
		let data = {
			title: result.title,
			content: result.content,
			remind: result.remind == "on" ? true : false
		}
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		headers.set('Content-Type', 'application/json')
		fetch(`http://127.0.0.1:5000/api/notes/${id}`, { method: 'PUT', headers: headers, body: JSON.stringify(data) })
			.then(res => res.json())
			.then(
				(result) => {
					console.log('Success')
				},
				(error) => {
					console.log(error)
				}
			)
	}

	deleteNote(id, result) {
		let authString = `${result.login}:${result.password}`
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + btoa(authString))
		fetch(`http://127.0.0.1:5000/api/notes/${id}`, { method: 'DELETE', headers: headers })
			.then(res => res.json())
			.then(
				(result) => {
					console.log('Success')
				},
				(error) => {
					console.log(error)
				}
			)
	}

	render() {
		const { error, isLoaded, items } = this.state;
		if (error) {
			return <div>Ошибка: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Загрузка...</div>;
		} else {
			return (
				<Container>
					<div className="d-flex justify-content-center align-items-center">
						<h1 className="m-4">Notes</h1>
						<Button className="align-self" style={{ maxHeight: "45px" }} variant="light" onClick={async () => {
							const result = await CustomDialog(<LoginModalNoteForm />, {
								title: 'Create note',
								showCloseIcon: true,
							});
							this.createNote(result);
						}}><FaPlusCircle /></Button>
					</div>
					<Container>
						<Table striped bordered hover variant="dark">
							<thead>
								<tr>
									<th>ID</th>
									<th>Title</th>
									<th>Content</th>
									<th>Remind</th>
									<th>Timestamp</th>
									<th>Options</th>
								</tr>
							</thead>
							<tbody>
								{items.map(item => (
									<tr>
										<td>{item.note_id}</td>
										<td>{item.title}</td>
										<td>{item.content}</td>
										<td>{item.remind ? '✔' : '-'}</td>
										<td>{item.timestamp}</td>
										<td>
											<div>
												<Button className="m-2" variant="info" onClick={async () => {
													const result = await CustomDialog(<LoginModalNoteForm />, {
														title: 'Update note',
														showCloseIcon: true,
													});
													this.editNote(item.note_id, result);
												}}>Edit</Button>
												<Button variant="danger" onClick={async () => {
													const result = await CustomDialog(<LoginModal />, {
														title: 'Auth',
														showCloseIcon: true,
													});
													this.deleteNote(item.note_id, result);
												}}>Delete</Button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Container>
				</Container>
			)
		}
	}
}