import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { auth, firebase } from "../services/firebase";
import { errorMessage } from "../components/Messages";

type User = {
  id: string;
  name: string;
};

type AuthContextType = {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isSigned: boolean;
  setIsSigned: Dispatch<SetStateAction<boolean>>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
  });
  const [isSigned, setIsSigned] = useState<boolean>(false);

  function loadStorageData() {
    const storageIsSigned = localStorage.getItem("@SIGNED");

    if (storageIsSigned) {
      setIsSigned(JSON.parse(storageIsSigned));
    }
  }

  useEffect(() => {
    loadStorageData();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, uid } = user;

        if (!displayName) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
        });
        setIsSigned(true);
        localStorage.setItem("@SIGNED", JSON.stringify(true));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      if (result.user) {
        const { displayName, uid } = result.user;
        if (!displayName) {
          throw new Error("Missing information from Google Account.");
        }
        setUser({
          id: uid,
          name: displayName,
        });
      }
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível realizar Login!");
    }
  }

  async function signOut() {
    await auth.signOut();
    setUser({} as User);
    localStorage.clear();
    setIsSigned(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signOut,
        isSigned,
        setIsSigned,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
