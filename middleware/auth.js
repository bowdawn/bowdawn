
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import app from "@lib/base.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const { pathname, events } = useRouter();
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    useEffect(() => {
        // Check that a new route is OK
        const handleRouteChange = url => {
            if (url === '/plants' && !currentUser) {
                window.location.href = '/login'
            }
        }

        // Check that initial route is OK
        if (pathname === '/plants' && currentUser === null) {
            window.location.href = '/login'
        }

        // Monitor routes
        events.on('routeChangeStart', handleRouteChange)
        return () => {
            events.off('routeChangeStart', handleRouteChange)
        }
    }, [currentUser]);

    if (pending) {
        return <>Loading...</>
    }


    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};