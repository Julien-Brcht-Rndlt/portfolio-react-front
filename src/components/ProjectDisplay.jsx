import { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';

export default function ProjectDisplay({ id, title, main_img, desc, github, url, setProjects }) {
    const [editable, setEditable] = useState(false);
    const [project, setProject] = useState({
        title,
        main_img,
        desc,
        github,
        url,
    });
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (saving) {
            axios.patch(`http://localhost:8080/projects/${id}`, project).then((response) => {
                if (response.status === 200) {
                    console.log('project resource modify successfully');
                    setProjects((prevState) => [...prevState.filter((project) => project.id !== id), response.data]);
                    setSaving(false);
                } 
            })
              .catch((err) => console.error(err));
        } else if (deleting) {
            axios.delete(`http://localhost:8080/projects/${id}`).then((response) => {
                if (response.status === 204) {
                    console.log('project resource deleted successfully');
                    setProjects((prevState) => [...prevState.filter((project) => project.id !== id)]);
                }
            })
              .catch((err) => console.error(err));
        }
    }, [saving, deleting, id]);

    const handleProjectChange = (event) => {
        setProject((prevState) => {
            return {
            ...prevState,
            [event.target.name]: event.target.value,
            };
        });
    };

    const deleteProject = () => {
        setDeleting(true);
    };

    const saveProjectEdit = () => {
        setSaving(true);
        setEditable(false)
    };

    return (
        <>
        {
            !editable ? (
                <>
                <div>
                    <div>
                        <div>{project.main_img}</div>
                        <div><h4>{project.title}</h4></div>
                        <div><p>{project.desc}</p></div>
                        <div>{project.github}</div>
                        <div>{project.url}</div>
                    </div>
                </div>
                <div>
                <Icon name='edit' onClick={() => setEditable(true)}/>
                <Icon name='trash' onClick={() => deleteProject()}/>
                </div>
                </>
            )
            :
            (
                <>
                <div>
                    <div>
                        <div><input name='main_img' value={project.main_img} onChange={(event) => handleProjectChange(event)} /></div>
                        <div><input name='title' value={project.title} onChange={(event) => handleProjectChange(event)} /></div>
                        <div><input name='desc' value={project.desc} onChange={(event) => handleProjectChange(event)} /></div>
                        <div><input name='github' value={project.github} onChange={(event) => handleProjectChange(event)} /></div>
                        <div><input name='url' value={project.url} onChange={(event) => handleProjectChange(event)} /></div>
                    </div>
                </div>
                <div>
                <Icon name='check' onClick={() => saveProjectEdit()} />
                <Icon name='x' onClick={() => setEditable(false)} />
                </div>
                </>
            )
        }
        </>
    );
}