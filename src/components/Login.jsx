import { useContext } from 'react';
import LoginModal from './LoginModal';
import Logout from './Logout';
import AdminContext from '../contexts/AdminContext';

export default function Login() {
    const { isAdmin } = useContext(AdminContext);
    return(
        <>

        {
            !isAdmin ? (
                <LoginModal />
            )
            :
            (
                <Logout />
            )
        }
        </>
    );
}