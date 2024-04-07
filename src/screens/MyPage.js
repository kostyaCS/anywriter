import React from "react";
import { useAuth } from "../AuthContext";
import MyPageContainer from "../components/MyPageContainer";
import HeaderDef from "../components/Header";


const MyPage = () => {
    const { currentUser } = useAuth();

    return (
        <>
            <HeaderDef />
            <MyPageContainer user={currentUser}/>
        </>
    );
};

export default MyPage;
