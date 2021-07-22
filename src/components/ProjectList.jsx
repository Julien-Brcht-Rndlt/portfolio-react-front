import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProjectDisplay from './ProjectDisplay';
import AddProjectModal from './AddProjectModal';
import AdminContext from '../contexts/AdminContext';

export default function ProjectList() {
    const [myProjects, setMyProjects] = useState([]);

    const { isAdmin } = useContext(AdminContext);

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
              myProjects.map((project) => <ProjectDisplay key={project.id} {...project} setProjects={setMyProjects} />)
            }
        </div>
        <div>
        {
        isAdmin && (
          <AddProjectModal setProjectList={setMyProjects}/>
        )
        }
        </div>
      </div>
    );
}