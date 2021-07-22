import { useEffect, useState, useContext } from "react";
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import styled from 'styled-components';
import AdminContext from '../contexts/AdminContext';

export default function ProfilePic({ profile_photo }) {
    const [photo, setPhoto] = useState(profile_photo);
    const [editPhoto, setEditPhoto] = useState(false);
    const [savePhoto, setSavePhoto] = useState(false);

    const { isAdmin } = useContext(AdminContext);

    useEffect(() => {
        if (savePhoto) {
            axios.patch(`http://localhost:8080/myself/`, {
                profile_photo: photo,
            }).then((response) => {
                if (response.status === 200) {
                    console.log('profile photo modify successfully');
                } 
            })
              .catch((err) => console.error(err));
            setSavePhoto(false);
        }
    }, [savePhoto]);

    const handlePhotoChange = (event) => {
        event.preventDefault();
        setPhoto(event.target.value)
    }

    const savePhotoEdit = () => {
        setSavePhoto(true);
        setEditPhoto(false)
    };

    return(
        <div>
            {
              !editPhoto ? (
                  <>
                    <div>
                        <image src={photo} alt='profile-pic' />
                    </div>
                    <div>
                    {
                        isAdmin && (
                            <Icon name='camera' onClick={(event) => setEditPhoto(true)}/>
                        )
                    }
                    </div>
                  </>
                )
                :
                (
                    <>
                    <div>
                        <input value={photo} onChange={(event) => handlePhotoChange(event)} />
                    </div>
                    <div>
                        <Icon name='check' onClick={() => savePhotoEdit()} />
                        <Icon name='x' onClick={() => setEditPhoto(false)} />
                    </div>
                  </> 
                )
            }
            
        </div>
        
    );

};