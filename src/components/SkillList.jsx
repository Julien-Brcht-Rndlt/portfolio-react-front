import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SkillDisplay from './SkillDisplay';
import AddSkillModal from './AddSkillModal';
import AdminContext from '../contexts/AdminContext';

export default function SkillList() {
    const [mySkills, setMySkills] = useState([]);

    const { isAdmin } = useContext(AdminContext);

    useEffect(() => {
        axios.get('http://localhost:8080/skills')
          .then((response) => {
              if (response.status === 200) {
                setMySkills(response.data);
              }
          })
          .catch((err) => console.error(err));
    }, []);

    console.log('mySkills', mySkills);

    return (
        <div>
            <div>
            {
                mySkills.map((skill) => <SkillDisplay key={skill.id} {...skill} setSkills={setMySkills} />)
            }
            </div>
            <div>
            {
              isAdmin && (
                <AddSkillModal setSkillList={setMySkills} />
              )
            }
            </div>
        </div>
    );
}