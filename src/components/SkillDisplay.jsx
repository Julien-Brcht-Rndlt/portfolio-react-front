import { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';

export default function SkillDisplay({ id, label, level, setSkills }) {
    const [editable, setEditable] = useState(false);
    const [skill, setSkill] = useState({
        label,
        level,
    });
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (saving) {
            axios.patch(`http://localhost:8080/skills/${id}`, skill).then((response) => {
                if (response.status === 200) {
                    console.log('skill resource modify successfully');
                    setSkills((prevState) => [...prevState.filter((skill) => skill.id !== id), response.data]);
                    setSaving(false);
                } 
            })
              .catch((err) => console.error(err));
        } else if (deleting) {
            axios.delete(`http://localhost:8080/skills/${id}`).then((response) => {
                if (response.status === 204) {
                    console.log('skill resource deleted successfully');
                    setSkills((prevState) => [...prevState.filter((skill) => skill.id !== id)]);
                }
            })
              .catch((err) => console.error(err));
        }
    }, [saving, deleting, id]);

    const handleSkillChange = (event) => {
        setSkill((prevState) => {
            return {
            ...prevState,
            [event.target.name]: event.target.value,
            };
        });
    };

    const deleteSkill = () => {
        setDeleting(true);
    };

    const saveSkillEdit = () => {
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
                  <div><h4>{label}</h4></div>
                  <div><h5>{level}</h5></div>
                </div>
                <div>afficher icone</div>
              </div>
              <div>
                <Icon name='edit' onClick={() => setEditable(true)}/>
                <Icon name='trash' onClick={() => deleteSkill()}/>
              </div>
              </>
            )
            :
            (
              <>
              <div>
                <div>
                  <div><input name='label' value={skill.label} onChange={(event) => handleSkillChange(event)} /></div>
                  <div><input name='level' value={skill.level} onChange={(event) => handleSkillChange(event)} /></div>
                </div>
                <div>afficher icone</div>
              </div>
              <div>
                <Icon name='check' onClick={() => saveSkillEdit()} />
                <Icon name='x' onClick={() => setEditable(false)} />
              </div>
              </>
            )
        }
        </>
    );
}