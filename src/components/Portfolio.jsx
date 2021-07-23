import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'semantic-ui-react'
import AboutMe from './AboutMe';
import ContactMe from './ContactMe';
import ProfilePic from './ProfilePic';
import ProjectList from './ProjectList';
import SkillList from './SkillList';
import HobbiesList from './HobbiesList';
import Login from './Login';
import { HeaderContainer, LoginContainer, MainContainerIcons } from '../styles/Portfolio/StyledPortfolio';

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
            <LoginContainer>
                <Login />
            </LoginContainer>
            <HeaderContainer>
            {/* <ProfilePic {...myProfile} /> */}
            <div style={{display:"flex", justifyContent:"flex-end" }}>
            <AboutMe {...myProfile} />  
            <ContactMe {...myProfile} />
            </div>  
            </HeaderContainer>
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{padding:"40px", display:"flex"}}>
                <Button style={{width:"11rem"}} basic color='blue' name='skills' onClick={(event) => handleClick(event)}>
                    // Skills
                </Button>
                <div style={{paddingRight:"20px", paddingLeft:"20px"}}>
                <Button style={{width:"11rem"}} basic color='blue' name='projects' onClick={(event) => handleClick(event)}>
                    // Projects
                </Button>
                </div>
                <Button style={{width:"11rem"}} basic color='blue' name='hobbies' onClick={(event) => handleClick(event)}>
                    // Hobbies
                </Button>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
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
            {
                content === 'hobbies' &&
                (
                    <HobbiesList />
                )
            }
            </div>
          </div>
          )
        }
        </>
    );
}