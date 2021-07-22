import { useEffect, useState, useContext } from "react";
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import styled from 'styled-components';
import AdminContext from '../contexts/AdminContext';

export default function ContactMe({ contact, github, linkedin }) {
    const [myContact, setMyContact] = useState(contact);
    const [editContact, setEditContact] = useState(false);
    const [saveContact, setSaveContact] = useState(false);

    const [myGithub, setMyGithub] = useState(github);
    const [editGithub, setEditGithub] = useState(false);
    const [saveGithub, setSaveGithub] = useState(false);

    const [myLinkedIn, setMyLinkedIn] = useState(linkedin);
    const [editLinkedIn, setEditLinkedIn] = useState(false);
    const [saveLinkedIn, setSaveLinkedIn] = useState(false);

    const { isAdmin } = useContext(AdminContext);

    useEffect(() => {
        const saveContactChanges = async () => {
            const response = await axios.patch('http://localhost:8080/myself/1', {
                contact: myContact,
            });
            if (response.status === 200) {
                console.log('saving successful', response.data);
            }
        }
        if (saveContact) {
            saveContactChanges();
            setSaveContact(false);
        }
    }, [saveContact]);

    useEffect(() => {
        const saveGithubChanges = async () => {
            const response = await axios.patch('http://localhost:8080/myself/1', {
                github: myGithub,
            });
            if (response.status === 200) {
                console.log('saving successful', response.data);
            }
        }
        if (saveContact) {
            saveGithubChanges();
            setSaveGithub(false);
        }
    }, [saveGithub]);

    useEffect(() => {
        const saveLinkedInChanges = async () => {
            const response = await axios.patch('http://localhost:8080/myself/1', {
                linkedin: myLinkedIn,
            });
            if (response.status === 200) {
                console.log('saving successful', response.data);
            }
        }
        if (saveLinkedIn) {
            saveLinkedInChanges();
            setSaveLinkedIn(false);
        }
    }, [saveLinkedIn]);

    return(
        <div style={{display:"flex", alignItems:"center"}}>
        <ul style={{listStyle:"none"}}>
          <li>
          {
            editLinkedIn ?
            (
              <>
                <input id='myLinkedIn' value={myLinkedIn} onChange={(event) => (setMyLinkedIn(event.target.value))}/>
                <Icon name='check' onClick={() => {
                    setSaveLinkedIn(true);
                    setEditLinkedIn(false);
                }} />
                <Icon name='x' onClick={() => setEditLinkedIn(false)} />
              </>
            )
            : 
            (
              <>
                <a href={myLinkedIn}><Icon name='linkedin' style={{color:"white", fontSize: "50px"}}/></a>
                {
                  isAdmin && (
                    <Icon name='edit' onClick={() => setEditLinkedIn(true)}/>
                  )
                }
              </>
            )
          }
          </li>
          <li>
          {
            editGithub ?
            (
              <>
                <Icon name='github' />
                <input id='myGithub' value={myGithub} onChange={(event) => (setMyGithub(event.target.value))}/>
                <Icon name='check' onClick={() => {
                    setSaveGithub(true);
                    setEditGithub(false);
                }} />
                <Icon name='x' onClick={() => setEditGithub(false)} />
              </>
            )
            : 
            (
              <>
                <a href={myGithub}><Icon style={{color:"white", fontSize: "50px"}} name='github' /></a>
                {
                  isAdmin && (
                    <Icon name='edit' onClick={() => setEditGithub(true)}/>
                  )
                }
              </>
            )
          }
          </li>
          <li >
          {
            editContact ?
            (
             <>
                <input id='myContact' value={myContact} onChange={(event) => (setMyContact(event.target.value))}/>
                <Icon name='check' onClick={() => {
                    setSaveContact(true);
                    setEditContact(false);
                }} />
                <Icon name='x' onClick={() => setEditContact(false)} />
         </>
            )
            : 
            (
             <>
              <a href={`mailto:${myContact}`} ><Icon name='mail' style={{color:"white", fontSize: "50px"}} /></a>
                {
                  isAdmin && (
                    <Icon name='edit' onClick={() => setEditContact(true)}/>
                  )
                }
             </>
            )
          }
          </li>
        </ul>     
        </div>
    );
}