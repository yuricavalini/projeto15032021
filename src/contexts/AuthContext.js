import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';

import { projectAuth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  console.log(currentUser);

  function signup(email, password) {
    return projectAuth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return projectAuth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return projectAuth.signOut();
  }

  function resetPassword(email) {
    return projectAuth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired };
