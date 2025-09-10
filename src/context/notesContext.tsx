import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { auth, db } from "../app/firebase";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";

type UserNotes = {
  id: string;
  noteTitle: string;
  noteContent: string;
};

const UserContext = createContext<
  | {
      user: User | null;
      userNotes: UserNotes | null;
      saveUserNotes: (settings: Partial<UserNotes>) => void;
    }
  | undefined
>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userNotes, setUserNotes] = useState<UserNotes | null>(null);

  const saveUserNotes = async (settings: Partial<UserNotes>) => {
    if (user) {
      const newNotes = { ...userNotes, ...settings, id: user.uid };
      setUserNotes(newNotes as UserNotes);
      await setDoc(doc(db, "userNotes", user.uid), newNotes);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, "userNotes", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserNotes(docSnap.data() as UserNotes);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, userNotes, saveUserNotes }}>
      {children}
    </UserContext.Provider>
  );
}

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

export const logOut = () => {
  signOut(auth);
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export function useSaveUserNotesContext() {
  const context = useContext(UserContext);
  return context?.saveUserNotes;
}