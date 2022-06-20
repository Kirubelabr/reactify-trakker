import jwtDecode from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../lib/constants/global.constants';
import { AuthState } from '../lib/models/auth-state';
import { storage } from '../lib/services/storage.service';
import { PersonaAuthObservable } from '../lib/utilities/persona.auth.observable';

const AuthContext = createContext<AuthContextProps>({});

const { Provider } = AuthContext;
interface AuthContextProps {
  authState?: AuthState;
  setAuthState?: (authInfo: AuthState) => void;
  logout?: () => void;
  isAuthenticated?: () => boolean;
  isAdmin?: () => boolean;
  hasRoles?: (roles: string[]) => boolean;
}

// @ts-ignore: Object is possibly 'undefined'.
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem(constants.TOKEN);
  const user = localStorage.getItem(constants.USER);
  const expiresAt = localStorage.getItem(constants.EXPIRES_AT);

  const [authState, setAuthState] = useState<AuthState>({
    token: token || '',
    expiresAt: expiresAt || '',
    user: user ? JSON.parse(user) : {},
  });

  PersonaAuthObservable.getInstance().subscribe(async (authInfo: any) => {
    setAuthInfo(authInfo);
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      storage.getItem('accessToken').then((accessToken: any) => {
        let authItems = { token: '', expiresAt: '', user: {} };
        if (accessToken) {
          const loggedInUser: any = jwtDecode(accessToken);

          if (loggedInUser) {
            authItems = {
              token: accessToken,
              user: loggedInUser.user,
              expiresAt: (Date.now() + 1000 * 1000).toString(),
            };
          }
        }
        setAuthState(authItems);
      });
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const setAuthInfo = (authInfo: AuthState) => {
    if (authInfo?.token) {
      localStorage.setItem(constants.USER, JSON.stringify(authInfo.user));
      localStorage.setItem(constants.TOKEN, JSON.stringify(authInfo.token));
      localStorage.setItem(constants.EXPIRES_AT, authInfo.expiresAt || '');

      const authItems = {
        token: authInfo.token,
        user: authInfo.user,
        expiresAt: authInfo.expiresAt,
      };

      setAuthState(authItems);
      storage.setItem('accessToken', authInfo.token);
    }
    setAuthState(authInfo);
  };

  const logout = (redirect = true) => {

    localStorage.removeItem(constants.TOKEN);
    localStorage.removeItem(constants.USER);
    localStorage.removeItem(constants.EXPIRES_AT);
    storage.removeItem('accessToken');

    setAuthInfo({ token: '', expiresAt: '', user: {} });
    if (redirect) {
      navigate('/sign-in', { replace: true });
    }
  };

  const isAuthenticated = () => {

    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    return new Date().getTime() < parseInt(authState.expiresAt);
  };

  const isAdmin = (): boolean => {
    // @ts-ignore: Object is possibly 'undefined'.
    return authState?.user?.roles?.includes('admin');
  };

  const hasRoles = (roles: string[]) => {
    return authState?.user?.roles?.some((role: any) => roles?.indexOf(role) !== -1) || false;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo: AuthState) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        isAdmin,
        hasRoles,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

