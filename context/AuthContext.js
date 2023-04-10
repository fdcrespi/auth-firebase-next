/* Todos los metodos para iniciar sesión y cerrarla */

import { createContext, useState, useEffect, useContext } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { auth, app } from '../config/firebase';
import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  
  
  const firestore = getFirestore(app);

  auth.languageCode = 'es';

  const getRol = async (uid) => {
    const docRef = doc(firestore, `userType/${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().rol;
    } else {
      return 'user';
    }
  }

  const getRolWithUser = (userFirebase) => {
    getRol(userFirebase.uid).then((rol) => {
      const userData = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        rol: rol
      };
      setUser(userData);
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase && !user) {
        getRolWithUser(userFirebase);
      } else {
        setUser(null);
      }
    });
    setLoading(false);
    return () => unsubscribe();
    
  }, []);

  const signup = async(email, password) => {
    const dataUser = await createUserWithEmailAndPassword(auth, email, password).then((userFirebase) => {
      return userFirebase;
    });
    const docRef = doc(firestore, `userType/${dataUser.user.uid}`);
    setDoc(docRef, {email: email, rol: 'user'});
  }

  const login = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const forgotPassword = (email) => {

    var actionCodeSettings = {
      url: process.env.URL_CONTINUE_RESET_PASSWORD,
      handleCodeInApp: true,
    };

    return sendPasswordResetEmail(auth, email, actionCodeSettings);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, forgotPassword }}>
      {loading ? <h1>Cargando...</h1> : children}
    </AuthContext.Provider>
  );
}


