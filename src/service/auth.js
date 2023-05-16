import { createContext, useContext, useState } from "react";
import { authenticateUser } from "./apiService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (user) => {
    return new Promise((resolve, reject) => {
      authenticateUser(user)
        .then((res) => {
          setUser({
            username: user.username,
            password: user.password,
            userId: res.data.userId,
            nickname: res.data.nickname,
          });

          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};