import { UserInfo } from "os";
import { ReactNode, createContext, useState, Dispatch, SetStateAction, useContext, useEffect } from "react";

type Userinfo = { username: string; id: string; } | null;
interface exportedValue {
  userinfo: Userinfo;
  loading: boolean;
  setUserinfo: Dispatch<SetStateAction<Userinfo>>;
  profileFetcher: () => Promise<void>
}

const initialState: exportedValue = {
  userinfo: null,
  loading: true,
  setUserinfo: () => {},
  profileFetcher: async () => {}
};
export const UserContext = createContext(initialState);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userinfo, setUserinfo] = useState<Userinfo>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const profileFetcher = async () => {
  const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const apiCall = await fetch(`${apiUrl}/profile`, {
        credentials: "include",
      });
      if(apiCall.ok){
        const res = await apiCall.json();
        setUserinfo(res);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Something went wrong");
    }
  };
  useEffect(() => {
    (async () => {
      await profileFetcher()
    })();
  }, []);
  const value: exportedValue = {
    loading,
    userinfo,
    setUserinfo,
    profileFetcher,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
