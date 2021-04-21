import React, { Component, useState } from 'react';
import { CustomDialog, useDialog } from 'react-st-modal';
import { Form, Button, Container } from 'react-bootstrap';

function LoginModalNoteForm() {
    const dialog = useDialog();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [remind, setRemind] = useState();

    return (
        <Container>
            <Form>
                <Form.Group controlId="formGroupLogin">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" placeholder="Login" onChange={(e) => {
                        setLogin(e.target.value);
                    }} />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </Form.Group>
                <hr />
                <Form.Group controlId="formGroupTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="title" onChange={(e) => {
                        setTitle(e.target.value);
                    }} />
                </Form.Group>
                <Form.Group controlId="formGroupContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" placeholder="content" onChange={(e) => {
                        setContent(e.target.value);
                    }} />
                </Form.Group>
                <Form.Group controlId="formGroupRemind">
                    <Form.Label>Remind</Form.Label>
                    <Form.Control type="checkbox" label="Remind" onChange={(e) => {
                        setRemind(e.target.value);
                    }} />
                </Form.Group>
                <Button className="m-2" variant="primary" onClick={() => {
                    dialog.close({ login, password, title, content, remind });
                }}>Submit</Button>
            </Form>
        </Container>
    );
}

export default LoginModalNoteForm;