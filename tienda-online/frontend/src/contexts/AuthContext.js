import React, { useContext, useState, useEffect, createContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // Asegura limpiar la suscripción cuando el componente se desmonte
  }, []);

  // Función para registrar un nuevo usuario
  function signup(email, password) {
    return createUserWithEmailAndPassword(getAuth(), email, password);
  }

  // Función para iniciar sesión
  function login(email, password) {
    return signInWithEmailAndPassword(getAuth(), email, password);
  }

  // Función para cerrar sesión
  function logout() {
    return signOut(getAuth());
  }

  const value = { currentUser, signup, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
