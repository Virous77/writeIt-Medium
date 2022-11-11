import { createContext, useState, useContext } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    isLoggedIn: false,
  };

  const localTempData = () => {
    const localData = localStorage.getItem("writeit");
    const result = localData ? JSON.parse(localData) : initialState;

    return result;
  };

  const [user, setUser] = useState(localTempData());
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { name, email, password } = user;
  const navigate = useNavigate();

  const signInForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password) {
      setIsLoading(false);
      toast.error("Please fill all fields..");
      return;
    }

    try {
      const signup = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = signup.user;

      const userData = {
        name: name,
        email: email,
        uid: user.uid,
        createdAt: serverTimestamp(),
        photoURL: user.photoURL ? user.photoURL : null,
      };

      const tempdata = {
        name: name,
        email: email,
        isLoggedIn: true,
        uid: user.uid,
        photoURL: user.photoURL ? user.photoURL : null,
      };

      await setDoc(doc(db, "users", user.uid), userData);
      localStorage.setItem("writeit", JSON.stringify(tempdata));
      setUser(tempdata);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const loginForm = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!email || !password) {
      setIsLoading(false);
      toast.error("Please fill all fields..");
      return;
    }

    try {
      const login = await signInWithEmailAndPassword(auth, email, password);
      const user = login.user;

      const tempdata = {
        name: user.displayName,
        email: email,
        isLoggedIn: true,
        uid: user.uid,
        photoURL: user.photoURL ? user.photoURL : null,
      };

      localStorage.setItem("writeit", JSON.stringify(tempdata));
      setUser(tempdata);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const loginGoogle = async () => {
    setGoogleLoading(true);

    const provider = new GoogleAuthProvider();

    try {
      const google = await signInWithPopup(auth, provider);

      const user = google.user;

      console.log(user.displayName);

      const userData = {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        createdAt: serverTimestamp(),
        photoURL: user.photoURL ? user.photoURL : null,
      };

      const tempdata = {
        name: user.displayName,
        email: user.email,
        isLoggedIn: true,
        uid: user.uid,
        photoURL: user.photoURL ? user.photoURL : null,
      };

      await setDoc(doc(db, "users", user.uid), userData);
      localStorage.setItem("writeit", JSON.stringify(tempdata));
      setUser(tempdata);
      setGoogleLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const forgetForm = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!email) {
      setIsLoading(false);
      toast.error("Please fill field...");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setIsLoading(false);
      toast.success("Password reset email sent!");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      await signOut(auth);
      setIsLoading(false);
      setUser(initialState);
      localStorage.removeItem("writeit");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        loginForm,
        loginGoogle,
        googleLoading,
        signInForm,
        forgetForm,
        logout,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuthContext = () => useContext(UserAuthContext);
