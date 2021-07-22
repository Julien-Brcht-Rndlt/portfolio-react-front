import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AboutMe from './AboutMe';
import ContactMe from './ContactMe';
import ProjectList from './ProjectList';
import SkillList from './SkillList';
import Login from './Login';

export default function Portfolio() {
    const [myProfile, setMyProfile] = useState({});
    const [isLoad, setIsLoad] = useState(false);
    const [content, setContent] = useState();

    useEffect(() => {
        const getMyProfile = async () => {
            const response = await axios.get('http://localhost:8080/myself');
            if (response.status === 200) {
                setMyProfile(response.data);
                setIsLoad(true);
                console.log(response.data);
            }
        };
        getMyProfile();
    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        setContent(event.target.name);
        console.log(event.target.name);
    }

    return (
        <>
        {
          isLoad &&
          (
           <div>
            <Login />
            <AboutMe {...myProfile} />
            <ContactMe {...myProfile} />
            <div><Link name='skills' onClick={(event) => handleClick(event)}>Skills</Link><Link name='projects' onClick={(event) => handleClick(event)}>Projects</Link></div>
            {
                content === 'projects' &&
                (
                  <ProjectList />
                )
            }
            {
                content === 'skills' &&
                (
                    <SkillList />
                )
            }
          </div>
          )
        }
        </>
    );
}