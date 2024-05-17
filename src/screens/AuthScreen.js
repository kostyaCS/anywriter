import React from "react";
import spiral from "../images/spiral.png";
import three_diamonds from "../images/three_diamonds.png";
import styled from 'styled-components';
import "../App.css"
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import AuthMain from "../components/auth/AuthMain";

const AuthScreen = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <>
            <Logo src={logo} alt="Readly" onClick={handleLogoClick}/>
            <Auth>
                <StyledSpiralImage src={spiral} alt="spiral" />
                <AuthMain/>
                <StyledStarsImage src={three_diamonds} alt="three diamonds" />
            </Auth>
        </>
    )
};

export default AuthScreen;

const Auth = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
    font-family: 'Montserrat Alternates', sans-serif;
    overflow-x: hidden;

    @media (max-width: 800px) {
        align-items: center;
        justify-content: center;
        gap: 90px;
    }
`;

const Logo = styled.img`
    width: 80px;
    height: auto;
    cursor: pointer;
    padding: 9px 5vw;
`;

const StyledSpiralImage = styled.img`
    width: 75px;
    height: auto;
    margin-bottom: 20vh;
`;

const StyledStarsImage = styled.img`
    width: 65px;
    height: auto;
    margin-bottom: 55vh;
`;
