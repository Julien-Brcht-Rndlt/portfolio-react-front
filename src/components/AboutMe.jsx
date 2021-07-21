import { useEffect, useState } from "react";
import { Icon } from 'semantic-ui-react';
import axios from 'axios';

export default function AboutMe({ firstname, lastname, role, about}) {
    const [myRole, setMyRole] = useState(role);
    const [editRole, setEditRole] = useState(false);
    const [saveRole, setSaveRole] = useState(false);


    const [myAbout, setMyAbout] = useState(about);
    const [editAbout, setEditAbout] = useState(false);
    const [saveAbout, setSaveAbout] = useState(false);

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
                <Icon name='check' onClick={() => {
                    setSaveRole(true);
                    setEditRole(false)
                }} />
                <Icon name='x' onClick={() => setEditRole(false)} />
              </>
            )
            : 
            (
              <>
                <h4>{myRole}</h4>
                <Icon name='edit' onClick={() => setEditRole(true)}/>
              </>
            )
          }
        </div>
        <div>
        {
          editAbout ?
          (
            <>
              <textarea id='myAbout' value={myAbout} onChange={(event) => (setMyAbout(event.target.value))}/>
              <Icon name='check' onClick={() => {
                  setSaveAbout(true);
                  setEditAbout(false)
              }} />
              <Icon name='x' onClick={() => setEditAbout(false)} />
            </>
          )
          : 
          (
            <>
              <p>{myAbout}</p>
              <Icon name='edit' onClick={() => setEditAbout(true)}/>
            </>
          )
        }
        
        </div>
      </div>
    );
}