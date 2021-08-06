import React, { useEffect, useState, createContext } from "react";

export const UserSessionContext = createContext();

export const UserSessionProvider = (props) => {

    const [currentUsername, setCurrentUsername] = useState(null);

    // Retrieves site session data from session storage
    // Data will be cleared on browser close / clear
    useEffect( () => {
        // sessionStorage.setItem('JomUsername', JSON.stringify({"username":"johnSmith"}));
        const storedSessionData = sessionStorage.getItem('JomUsername');
        console.log('stored session username:')
        console.log(storedSessionData);
        if (storedSessionData){
            const storedSessionUsername = JSON.parse(storedSessionData)["username"];
            console.log(storedSessionUsername);
            if(storedSessionUsername)
                setCurrentUsername(storedSessionUsername);
        }
    }, []);

    const updateUsername = newUsername => {
        setCurrentUsername(newUsername);
        sessionStorage.setItem('JomUsername', JSON.stringify({ "username": newUsername }));
    }

    return (
        <UserSessionContext.Provider
            value={{ currentUsername, updateUsername }}>
            {props.children}
        </UserSessionContext.Provider>
    );

};

export default UserSessionProvider;