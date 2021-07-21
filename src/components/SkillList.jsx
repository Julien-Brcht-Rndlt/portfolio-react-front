import { useState, useEffect } from 'react';
import axios from 'axios';
import AddSkillModal from './AddSkillModal';

export default function SkillList() {
    const [mySkills, setMySkills] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/skills')
          .then((response) => {
              if (response.status === 200) {
                setMySkills(response.data);
              }
          })
          .catch((err) => console.error(err));
    }, []);

    console.log(mySkills);

    return (
        <div>
            <div>
            {
                mySkills.map((skill) => <div>{skill.label}</div>)
            }
            </div>
            <div>
                <AddSkillModal />
            </div>
        </div>
    );
}