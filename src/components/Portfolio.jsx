import { useState, useEffect } from 'react';
import axios from 'axios';
import AboutMe from './AboutMe';
import ProjectList from './ProjectList';
import SkillList from './SkillList';

export default function Portfolio() {
    const [myProfile, setMyProfile] = useState({});
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        const getMyProfile = async () => {
            const response = await axios.get('http://localhost:8080/myself');
            if (response.status === 200) {
                setMyProfile(response.data);
                setIsLoad(true);
            }
        };
        getMyProfile();
    }, []);

    return (
        <>
        {
          isLoad &&
          (
           <div>
            <AboutMe {...myProfile} />
            <ProjectList />
            <SkillList />
          </div>
          )
        }
        </>
    );
}