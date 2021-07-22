import { useEffect, useState, useContext } from "react";
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import styled from 'styled-components';
import AdminContext from '../contexts/AdminContext';

export const AboutMeContainer = styled.div``;

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
        <div>
          <h3>{firstname}</h3></div>
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
                <h4>{myRole}</h4>
                {
                isAdmin && (
                <Icon name='edit' onClick={() => setEditRole(true)}/>
                )
              }
              </>
            )
          }
        </div>
        <div><h5>{remote}</h5></div>
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
              <p>{myAbout}</p>
              {
                isAdmin && (
                  <Icon name='edit' onClick={() => setEditAbout(true)}/>
                )
              }
            </>
          )
        }
        
        </div>
      </div>
    );
}