import { useState, useEffect } from 'react';
import axios from 'axios';
import HobbyDisplay from './HobbyDisplay';

export default function ProjectList() {
    const [myHobbies, setMyHobbies] = useState([]);

    useEffect(() => {
        const getHobbiesList = async () => {
            const response = await axios.get('http://localhost:8080/hobbies');
            if (response.status === 200) {
                setMyHobbies(response.data);
            }
        };
        getHobbiesList();
    }, []);

    return (
      <div>
        <div>
            {
              myHobbies.map((hobby) => <HobbyDisplay key={hobby.id} {...hobby} />)
            }
        </div>
      </div>
    );
}