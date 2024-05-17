import React from "react";
import styled from 'styled-components';
import logo from "../../images/logo.png";
import CreateButton from "../CreateButton";
import ProfileButton from "./ProfileButton";
import {useNavigate} from "react-router-dom";

const ProfileHeader = (props) => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/main");
    }

    const handleProfileClick = () => {
        navigate("/profile");
    }

    const handleCreateClick = () => {
        navigate("/create_work");
    }

    return (
        <Header>
            <HeaderLeft>
                <Logo src={logo} alt="Readly" onClick={handleLogoClick}/>
            </HeaderLeft>
            <HeaderRight>
                <CreateButton onClick={handleCreateClick} text="Create writing"/>
                <ProfileButton shadowColor={'rgb(145, 95, 109, 25)'}
                               onClick={handleProfileClick} text="Profile"/>
            </HeaderRight>
        </Header>
    )
};

export default ProfileHeader;

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

    @media (max-width: 460px) {
        gap: 10px;
    }
`;
