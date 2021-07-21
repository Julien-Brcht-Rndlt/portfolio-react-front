import { useState, useEffect } from 'react';
import axios from 'axios';
import AddProjectModal from './AddProjectModal';

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
        <div>
            {
                myProjects.map((project) => <div>{project.title}</div>)
            }
        </div>
         <div>
         <AddProjectModal setProjectList={setMyProjects}/>
         </div>
      </div>
    );
}