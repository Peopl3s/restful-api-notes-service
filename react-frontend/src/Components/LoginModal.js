import React, { Component, useState } from 'react';
import { CustomDialog, useDialog } from 'react-st-modal';
import { Form, Button, Container } from 'react-bootstrap';

function LoginModal() {
      const dialog = useDialog();

      const [login, setLogin] = useState("");
      const [password, setPassword] = useState("");

      return (
            <Container>
                  <Form>
                        <Form.Group controlId="formGroupEmail">
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
                        <Button className="mr-2 mt-2 mb-2" variant="primary" onClick={() => {
                              dialog.close({ login, password });
                        }}>Submit</Button>
                  </Form>
            </Container>
      );
}

export default LoginModal;