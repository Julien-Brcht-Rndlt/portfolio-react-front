import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import AdminContext from '../contexts/AdminContext';

const SkillDisplayCard = styled.div`
  padding: 35px;
  border: 1px solid #3993c7;
  border-radius: 4px;
`;

const SkillDisplayHeader = styled.div``;

const SkillDisplayLabel = styled.h4``;

const SkillDiplayContent = styled.div``;

const SkillDisplayInfo = styled.h5``;

const SkillDisplayImage = styled.img``;

export default function SkillDisplay({ id, label, level, main_img, setSkills }) {
    const [editable, setEditable] = useState(false);
    const [skill, setSkill] = useState({
        label,
        level,
    });
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const { isAdmin } = useContext(AdminContext);

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
        <SkillDisplayCard>
        {
            !editable ? (
              <>
              <div>
                <div>
                  <div><h4> {'>_'} {label}</h4></div>
                  <div><h5>{'level:'} {level}{/*  {'(optimist)'} */}</h5></div>
                </div>
                <div><img src={main_img} alt={`label-${label}`} /></div>
              </div>
              <div>
                {
                  isAdmin && (
                  <>
                    <Icon name='edit' onClick={() => setEditable(true)}/>
                    <Icon name='trash' onClick={() => deleteSkill()}/>
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
                  <div><input name='label' value={skill.label} onChange={(event) => handleSkillChange(event)} /></div>
                  <div><input name='level' value={skill.level} onChange={(event) => handleSkillChange(event)} /></div>
                </div>
                <div><input name='main_img' value={skill.main_img} onChange={(event) => handleSkillChange(event)} /></div>
              </div>
              <div>
                <Icon name='check' onClick={() => saveSkillEdit()} />
                <Icon name='x' onClick={() => setEditable(false)} />
              </div>
              </>
            )
        }
        </SkillDisplayCard>
    );
}