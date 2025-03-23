import { useContext, createContext } from 'react';

export const AuthInfo = createContext();
export const useAuthInfo = () => useContext(AuthInfo);

function UserInfo(props) {

    
    return (
        <AuthInfo.Provider value={ user }>
            
        </AuthInfo.Provider>
    );
}

export default UserInfo;