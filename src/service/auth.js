import { createContext, useContext, useState } from "react";
import { authenticateUser } from "./apiService";
import jwtDecode from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (user) => {
    return new Promise((resolve, reject) => {
      authenticateUser(user)
        .then((res) => {
          //get token from response header 'Authorization'
          const jwtToken = res.headers["authorization"];

          //save token to local storage
          localStorage.setItem("access_token", jwtToken);
          //it seems token is encoded. and we want to get payload
          const decodedToken = jwtDecode(jwtToken);

          setUser({
            username: user.username,
            password: user.password,
            userId: decodedToken.userId,
            nickname: decodedToken.nickname,
          });

          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
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
