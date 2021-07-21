import { useState, useEffect } from 'react';
import axios from 'axios';
import AboutMe from './AboutMe';
import ProjectList from './ProjectList';
import SkillList from './SkillList';

export default function Portfolio() {
    const [myProfile, setMyProfile] = useState({});

    useEffect(() => {
        const getMyProfile = async () => {
            const response = await axios.get('http://localhost:8080/myself');
            if (response.status === 200) {
                setMyProfile(response.data);
            }
        };
        getMyProfile();
    }, []);

    return (
        <div>
            <AboutMe {...myProfile} />
            <ProjectList />
            <SkillList />
        </div>
    );
}