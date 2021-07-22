import { useEffect, useState } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react';
import axios from 'axios';

function LoginModal() {
    const [open, setOpen] = useState(false);
    const [checkLogin, setCheckLogin] = useState(false);
    const [admin, setAdmin] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
      if(checkLogin) {
        axios.post('http://localhost:8080/auth/login', admin)
          .then((response) => {
              if (response.status === 200) {
                console.log('auth login', response);
                console.log('cookie', response.cookie('jwt'));
                console.log('resp data token', response.data.token);
                window.localStorage.setItem('token', response.cookie('jwt'));
              }
          })
          .catch((err) => console.error(err));
        setCheckLogin(false);
      }
    }, [checkLogin]);

    const handleFormChange = (event) => {
        setAdmin({
            ...admin,
            [event.target.name]: event.target.value,
        });
    }

    const handleCheckLogin = (event) => {
        event.preventDefault();
        setCheckLogin(true);
        setOpen(false);
    }
  
    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button><Icon name='cogs' /></Button>}
      >
        <Modal.Header>Login Form</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Enter your credentials</Header>
            <Form>
                <Form.Field>
                <label>Username/Email</label>
                <input name='email' value={admin.email} placeholder='type your email' onChange={(event) => handleFormChange(event)}/>
                </Form.Field>
                <Form.Field>
                <label>Password</label>
                <input type='password' name='password' value={admin.password} placeholder='type your password..' onChange={(event) => handleFormChange(event)} />
                </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Login"
            labelPosition='right'
            icon='checkmark'
            onClick={(event) => handleCheckLogin(event)}
            positive
            disabled={!admin.email || !admin.password}
          />
        </Modal.Actions>
      </Modal>
    )
  }
  
  export default LoginModal;