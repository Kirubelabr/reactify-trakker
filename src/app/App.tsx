import React from 'react';
import { AuthProvider } from './contexts/auth.context';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <>
      <AuthProvider children={<AppRoutes />} />
    </>
  );
}

export default App;
