import styled from 'styled-components';
import logo from "../../images/logo.png";
import SignUpButton from "./SignUpButton";
import React from "react";
import {useNavigate} from "react-router-dom";
import LogInButton from "./LogInButton";


const LandingHeader = ({ aboutButtonColor = "black" }) => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
        window.scroll({
            top: 0
        });
    }

    const handleLogInClick = () => {
        navigate("/auth");
        window.scroll({
            top: 0
        });
    }

    const handleSignUpClick = () => {
        navigate("/registration");
        window.scroll({
            top: 0
        });
    }

    const handleAboutClick = () => {
        navigate("/about");
        window.scroll({
            top: 0
        });
    }

    return (
        <Header>
            <HeaderLeft>
                <Logo src={logo} alt="Readly" onClick={handleLogoClick}/>
                <HeaderText aboutButtonColor={aboutButtonColor} onClick={handleAboutClick}>About</HeaderText>
            </HeaderLeft>
            <HeaderRight>
                <LogInButton onClick={handleLogInClick} text="Log in"/>
                <SignUpButton onClick={handleSignUpClick} text="Sign up"/>
            </HeaderRight>
        </Header>
    )
};

export default LandingHeader;

const Header = styled.div`
    height: 74px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    background-color: #FDF7F4;
    position: sticky;
    top: 0;
    z-index: 3;
    width: 90vw;
    padding: 5px 5vw;
`;

const HeaderText = styled.div`
    cursor: pointer;
    color: ${props => props.aboutButtonColor};
    font-size: 16px;
    font-weight: 600;
    transition: all 0.1s ease-in-out;

    &:hover {
        color: #915F6D;
    }

    @media (max-width: 550px){
        display: none;
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

    @media (max-width: 550px) {
        gap: 20px;
    }

    @media (max-width: 430px) {
        gap: 8px;
    }
`;
