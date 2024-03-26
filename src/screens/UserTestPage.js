import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const UserTestPage = () => {
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/");
            console.log("Logged out")
        }).catch((error) => {
            console.error("Logout error:", error);
        });
    };

    return (
        <div>
            <h1>User's Email: {userEmail}</h1>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default UserTestPage;
