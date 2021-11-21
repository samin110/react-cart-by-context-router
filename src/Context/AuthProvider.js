import {
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";

const AuthProvder = createContext();
const AuthActionsProvider = createContext();

const LOCAL_STORAGE_AUTH_KEY = "auth";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const userDate =
      JSON.parse(
        localStorage.getItem(
          LOCAL_STORAGE_AUTH_KEY
        )
      ) || false;
    setAuth(userDate);
  }, []);

  useEffect(() => {
    const userData = JSON.stringify(auth);
    localStorage.setItem(
      LOCAL_STORAGE_AUTH_KEY,
      userData
    );
  }, [auth]);

  return (
    <AuthProvder.Provider value={auth}>
      <AuthActionsProvider.Provider
        value={setAuth}>
        {children}
      </AuthActionsProvider.Provider>
    </AuthProvder.Provider>
  );
};

export default AuthProvider;

export const useAuth = () =>
  useContext(AuthProvder);
export const useAuthAction = () =>
  useContext(AuthActionsProvider);
