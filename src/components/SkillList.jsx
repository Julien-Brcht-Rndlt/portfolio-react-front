import { useState, useEffect } from 'react';
import axios from 'axios';

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
    });

    console.log(mySkills);

    return (
        <div>
            {
                mySkills.map((skill) => <div>{skill.label}</div>)
            }
        </div>
    );
}