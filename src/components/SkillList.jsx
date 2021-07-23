import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from "styled-components";
import SkillDisplay from './SkillDisplay';
import AddSkillModal from './AddSkillModal';
import AdminContext from '../contexts/AdminContext';

const SkillListCont = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

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
        <SkillListCont>
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
        </SkillListCont>
    );
}