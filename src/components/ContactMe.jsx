import { useEffect, useState } from "react";
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import styled from 'styled-components';

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
        <div>
        <ul>
          <li>
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
                {myContact}
                <Icon name='edit' onClick={() => setEditContact(true)}/>
              </>
            )
          }
          </li>

          <li>
          {
            editGithub ?
            (
              <>
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
                {myGithub}
                <Icon name='edit' onClick={() => setEditGithub(true)}/>
              </>
            )
          }
          </li>

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
                {myLinkedIn}
                <Icon name='edit' onClick={() => setEditLinkedIn(true)}/>
              </>
            )
          }
          </li>
        </ul>     
        </div>
    );
}