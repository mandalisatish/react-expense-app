import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedId: false,
    login: (token) => {},
    logout: () => {}
});


export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const userIsLoggedIn = !!token;  //Here !! converts "truthy" value into Boolean "TRUE" and "falsy" value into Boolen "FALSE"
    const loginHandler = () => {
        setToken(token);
    };
    const logoutHandler = () =>  {
        setToken(null);
    };

    const contextValue = {
        token : token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>);
};

export default AuthContext;
