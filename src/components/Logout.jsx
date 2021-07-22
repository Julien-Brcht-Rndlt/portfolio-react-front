import { useContext } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import AdminContext from '../contexts/AdminContext';

export default function Logout() {
    const { setIsAdmin } = useContext(AdminContext);

    const handleLogout = () => {
        setIsAdmin(false);
    }

    return(
        <>
          <Button icon onClick={() => handleLogout()} >
            <Icon name='power' />
          </Button>
        </>
    );
}