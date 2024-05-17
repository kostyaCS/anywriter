import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../AuthContext";
import logo from "../images/logo.png";
import CreateButton from "./CreateButton";
import ProfileButton from "./profile/ProfileButton";

const HeaderDef = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    const handleLogoClick = () => {
        navigate("/main_page");
    }

    const handleProfileClick = () => {
        navigate("/profile");
    }

    const handleCreateClick = () => {
        navigate("/create_work");
    }

    return (
        <>
            <Header>
                <HeaderLeft>
                    <Logo src={logo} alt="Readly" onClick={handleLogoClick}/>
                </HeaderLeft>
                <HeaderRight>
                    <CreateButton onClick={handleCreateClick} text="Create writing"/>
                    <ProfileButton onClick={handleProfileClick} text="Profile"/>
                </HeaderRight>
            </Header>
        </>
    );
};

export default HeaderDef;


// ------------- Header -------------
const Header = styled.div`
    height: 74px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    background-color: #FDF7F4;
    width: 90vw;
    padding: 5px 5vw;
`;

const HeaderText = styled.div`
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.1s ease-in-out;

    &:hover {
        color: #915F6D;
    }
`;

const HeaderLeft = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    width: 80px;
    height: auto;
    cursor: pointer;
`;

const HeaderRight = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in;

    @media (max-width: 550px) {
        gap: 20px;
    }
    
    @media (max-width: 430px) {
        gap: 8px;
    }
`;
