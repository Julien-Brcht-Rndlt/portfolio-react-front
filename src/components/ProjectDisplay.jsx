import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import AdminContext from '../contexts/AdminContext';

const ProjectDisplayCard = styled.div`
  padding: 45px;
  width: 30rem;
  border: 1px solid #3993c7;
  border-radius: 4px;
`;

const ProjectDisplayHeader = styled.div``;

const ProjectDisplayLabel = styled.h4``;

const ProjectDiplayContent = styled.div``;

const ProjectDisplayInfo = styled.h5``;

const ProjectDisplayImage = styled.img``;


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

    const { isAdmin } = useContext(AdminContext);

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
        <ProjectDisplayCard>
        {
            !editable ? (
                <>
                <div>
                    <div>
                        <div><h4> {'@jna-wcs$_'}{project.title}</h4></div>
                        <div><img src={project.main_img} alt={`title-${title}`} /></div>
                        <div><p>{'<  '}{project.desc}{' />'}</p></div>
                        <div style={{display: "flex"}}>
                            <div><a href={project.github}><Icon name='github' /></a></div>
                            <div><a href={project.url}><Icon name='world' /></a></div>
                        </div>
                    </div>
                </div>
                <div>
                {
                  isAdmin && (
                  <>
                    <Icon name='edit' onClick={() => setEditable(true)}/>
                    <Icon name='trash' onClick={() => deleteProject()}/>
                  </>
                  )
                }
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
        </ProjectDisplayCard>
    );
}