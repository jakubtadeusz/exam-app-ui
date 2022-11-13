import axios from "axios";
import * as React from "react";

let authAPI = "http://localhost:5113"

const fakeAuthProvider = {
    isAuthenticated: false,
    signin(user, callback) {
      axios.post(authAPI + "/connect/token", user,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((response) => {
        let res = {
          access_token: response.data.access_token,
          username: user.username,
        };
        fakeAuthProvider.isAuthenticated = true;
        callback(res);
      });
    },
    signout(callback) {

      fakeAuthProvider.isAuthenticated = false;
      callback();
    },
  };

  let AuthContext = React.createContext();

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    console.log(newUser);
    return fakeAuthProvider.signin(newUser, (user) => {
      console.log("logged user", user);
      setUser(user);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}
  
  export { fakeAuthProvider, AuthProvider, useAuth };