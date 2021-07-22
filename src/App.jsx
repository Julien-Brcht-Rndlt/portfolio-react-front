import { useState } from 'react';
import AppRouter from './AppRouter';
import AdminContext from './contexts/AdminContext';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      <AppRouter />
    </AdminContext.Provider>
  );
}

export default App;
