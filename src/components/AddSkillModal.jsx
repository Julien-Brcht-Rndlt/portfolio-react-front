import { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Header, Modal, Form } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react';

function ModalExampleModal() {
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [skill, setSkill] = useState({
        label: '',
        level: '',
    });

    useEffect(() => {
        axios.post('http://localhost:8080/skills', skill)
          .then((response) => {
              if (response.status === 201) {
                console.log('new skill added to portfolio');
              }
          })
          .catch((err) => console.error(err));
    }, [saving]);

    const handleFormChange = (event) => {
        setSkill({
            ...skill,
            [event.target.name]: event.target.value,
        });
    }

    const saveNewSkill = (event) => {
        event.preventDefault();
        setSaving(true);
        setOpen(false);
    }
  
    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button><Icon name='add' /></Button>}
      >
        <Modal.Header>Add a new skill</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>New Skill Form</Header>
            <Form>
                <Form.Field>
                <label>Skill Name/Title</label>
                <input name='label' value={skill.label} placeholder='Skill Name' onChange={(event) => handleFormChange(event)}/>
                </Form.Field>
                <Form.Field>
                <label>Your skill level</label>
                <input name='level' value={skill.level} placeholder='beginner, intermediate, advanced..' onChange={(event) => handleFormChange(event)} />
                </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Save"
            labelPosition='right'
            icon='checkmark'
            onClick={(event) => saveNewSkill(event)}
            positive
          />
        </Modal.Actions>
      </Modal>
    )
  }
  
  export default ModalExampleModal
  