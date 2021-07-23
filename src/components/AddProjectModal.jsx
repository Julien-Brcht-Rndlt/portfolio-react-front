import { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Header, Modal, Form } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react';

function AddProjectModal({ setProjectList }) {
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [project, setProject] = useState({
        title: '',
        main_img: '',
        desc: '',
        github: '',
        url: '',
    });

    useEffect(() => {
      if (saving) {
        axios.post('http://localhost:8080/projects', project)
          .then((response) => {
              if (response.status === 201) {
                console.log('new project added to portfolio');
                setProjectList((prevState) => [...prevState, response.data]);
                setSaving(false);
              }
          })
          .catch((err) => console.error(err));
      }
    }, [saving]);

    const handleFormChange = (event) => {
        setProject({
            ...project,
            [event.target.name]: event.target.value,
        });
    }

    const saveNewProject = (event) => {
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
        <Modal.Header>Add a new project to you Portfolio</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>New Project Form</Header>
            <Form>
                <Form.Field>
                <label>Project Name/Title</label>
                <input name='title' value={project.title} placeholder='Project Name' onChange={(event) => handleFormChange(event)}/>
                </Form.Field>
                <Form.Field>
                <label>Project Pic</label>
                <input name='main_img' value={project.main_img} placeholder='' onChange={(event) => handleFormChange(event)} />
                </Form.Field>
                <Form.Field>
                <label>Description</label>
                <textarea name='desc' value={project.desc} placeholder='tell us a bit more about it..' onChange={(event) => handleFormChange(event)} />
                </Form.Field>
                <Form.Field>
                <label>Project GitHub</label>
                <input name='github' value={project.github} placeholder='http://...github...' onChange={(event) => handleFormChange(event)} />
                </Form.Field>
                <Form.Field>
                <label>Url where Project is deployed</label>
                <input name='url' value={project.url} placeholder='http://...' onChange={(event) => handleFormChange(event)} />
                </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button basic color='blue'
            content="Save"
            labelPosition='right'
            icon='checkmark'
            onClick={(event) => saveNewProject(event)}
          />
        </Modal.Actions>
      </Modal>
    )
  }
  
  export default AddProjectModal;
  