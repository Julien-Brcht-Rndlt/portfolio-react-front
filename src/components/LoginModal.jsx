import { useEffect, useState, useContext } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import AdminContext from '../contexts/AdminContext';
import Cookie from 'universal-cookie';

function LoginModal() {
    const [open, setOpen] = useState(false);
    const [checkLogin, setCheckLogin] = useState(false);
    const [admin, setAdmin] = useState({
        email: '',
        password: '',
    });

    const { isAdmin, setIsAdmin } = useContext(AdminContext);

    useEffect(() => {
      if(checkLogin) {
        axios.post('http://localhost:8080/auth/login', admin)
          .then((response) => {
              if (response.status === 200) {
                setIsAdmin(true);
              }
          })
          .catch((err) => console.error(err));
        setCheckLogin(false);
      }
      console.log('isAdmin', isAdmin);
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