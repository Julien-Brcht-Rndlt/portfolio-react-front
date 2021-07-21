import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProjectList() {
    const [myProjects, setMyProjects] = useState([]);

    useEffect(() => {
        const getProjectList = async () => {
            const response = await axios.get('http://localhost:8080/projects');
            if (response.status === 200) {
                setMyProjects(response.data);
            }
        };
        getProjectList();
    }, []);

    return (
        <div>
            {
                myProjects.map((project) => <div>{project.title}</div>)
            }
            
        </div>
    );
}