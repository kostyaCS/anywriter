import React, {useEffect} from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth, rtdb} from "../firebase";
import { useAuth } from "../AuthContext";
import logo from "../images/logo.png";
import CreateButton from "./CreateButton";
import ProfileButton from "./profile/ProfileButton";
import {onValue, ref} from "firebase/database";


const MainLeft = () => {

    const [activeTab, setActiveTab] = React.useState("all");
    const { currentUser } = useAuth();
    const [allData, setAllData] = React.useState([]);


    useEffect(() => {
        if (!currentUser || activeTab === "all" || activeTab === "your-writings") return;

        const userWorksRef = ref(rtdb, `users/${currentUser.uid}/${activeTab}`);
        const unsubscribe = onValue(userWorksRef, (snapshot) => {
            const ids = snapshot.val() || [];
            const updatedData = allData.filter(work => ids.includes(work.id));
            setAllData(updatedData);
        });

        return () => {
            unsubscribe();
        };
    }, [activeTab, currentUser, allData]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (

        <Left>
            <LeftOpt
                onClick={() => handleTabClick("all")}
                active={activeTab === "all"}
            >
                All
            </LeftOpt>
            <LeftOpt
                onClick={() => handleTabClick("liked")}
                active={activeTab === "liked"}
            >
                Liked
            </LeftOpt>
            <LeftOpt
                onClick={() => handleTabClick("saved")}
                active={activeTab === "saved"}
            >
                Saved
            </LeftOpt>
            <LeftOpt
                onClick={() => handleTabClick("your-writings")}
                active={activeTab === "your-writings"}
            >
                Your writings
            </LeftOpt>
        </Left>
    );
}

export default MainLeft;

const Left = styled.div`
    min-width: fit-content;
    height: max-content;
    background-color: white;
    float: left;
    display: flex;
    flex-direction: column;
    margin-left: 60px;
    margin-right: 10px;
    flex-wrap: wrap;
    
    @media (max-width: 800px) {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
        margin-top: 10px;
        height: 10%;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        gap: 5px;
    }
`;

const LeftOpt = styled.div`
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 500;
    background-color: ${props => props.active ? '#e3e3e3' : 'transparent'};
    
    @media (max-width: 800px){
        font-size: 18px;
    }
`;