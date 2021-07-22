import { useEffect, useState, useContext } from "react";
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import styled from 'styled-components';
import AdminContext from '../contexts/AdminContext';
import { AboutContainer, AboutPresentation } from '../styles/Portfolio/StyledPortfolio';
import { ReactComponent as Van } from "../assets/Van.svg";

export default function AboutMe({ firstname, lastname, role, remote, about}) {
    const [myRole, setMyRole] = useState(role);
    const [editRole, setEditRole] = useState(false);
    const [saveRole, setSaveRole] = useState(false);


    const [myAbout, setMyAbout] = useState(about);
    const [editAbout, setEditAbout] = useState(false);
    const [saveAbout, setSaveAbout] = useState(false);

    const { isAdmin } = useContext(AdminContext);
     

    useEffect(() => {
        const saveRoleChanges = async () => {
            const response = await axios.patch('http://localhost:8080/myself/1', {
                role: myRole,
            });
            if (response.status === 200) {
                console.log('saving successful', response.data);
            }
        }
        if (saveRole) {
            saveRoleChanges();
            setSaveRole(false);
        }
    }, [saveRole]);

    useEffect(() => {
        const saveAboutChanges = async () => {
            const response = await axios.patch('http://localhost:8080/myself/1', {
                about: myAbout,
            });
            if (response.status === 200) {
                console.log('saving successful', response.data);
            }
        }
        if (saveAbout) {
            saveAboutChanges();
            setSaveAbout(false);
        }
    }, [saveAbout]);

    return (
      <div>
        <AboutContainer>
          <h3 style={{fontSize:"50px", paddingTop:"15px"}}>{firstname}</h3>
        <div>
          {
            editRole ?
            (
              <>
              
                <input id='myRole' value={myRole} onChange={(event) => (setMyRole(event.target.value))}/>
                {
                isAdmin && (
                  <>
                 <Icon name='check' onClick={() => {
                    setSaveRole(true);
                    setEditRole(false)
                }} />
                <Icon name='x' onClick={() => setEditRole(false)} />
                </>
                )
              }
              </>
            )
            : 
            (
              <>
                <h4 style={{fontSize:"25px"}}>{myRole}</h4>
                {
                isAdmin && (
                <Icon name='edit' onClick={() => setEditRole(true)}/>
                )
              }
              </>
            )
          }
        </div>
        <div><h5 style={{fontSize:"17px", color:"white", fontWeight:"bold", paddingTop:"20px"}}>{remote}</h5></div>
        <div>
          <Van style={{ width: "300px", height: "300px" }}/>
        </div>
        <div>
        {
          editAbout ?
          (
            <>
              <textarea id='myAbout' value={myAbout} onChange={(event) => (setMyAbout(event.target.value))}/>
              {
                isAdmin && (                  
                <>
                  <Icon name='check' onClick={() => {
                      setSaveAbout(true);
                      setEditAbout(false)
                  }} />
                  <Icon name='x' onClick={() => setEditAbout(false)} />
                  </>
                )
              }
            </>
          )
          : 
          (
            <>
              <AboutPresentation>{myAbout}</AboutPresentation>
              {
                isAdmin && (
                  <Icon name='edit' onClick={() => setEditAbout(true)}/>
                )
              }
            </>
          )
        }
        
        </div>
        </AboutContainer>
      </div>
      
    );
}