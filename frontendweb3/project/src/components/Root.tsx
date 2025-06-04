import React, { useContext } from 'react';
import { AuthContext } from '../contexts';
import { LoginForm } from './LoginForm';
import { InstitutionPortal } from './InstitutionPortal';
import { StudentPortal } from './StudentPortal';
import { VerifierPortal } from './VerifierPortal';

export const Root: React.FC = () => {
  const { isAuthenticated, userType } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  switch (userType) {
    case 'institution':
      return <InstitutionPortal />;
    case 'student':
      return <StudentPortal />;
    case 'verifier':
      return <VerifierPortal />;
    default:
      return <LoginForm />;
  }
};