import React from "react";
import styled from 'styled-components';
import logo from "../images/logo.png";
import scribble_pink from "../images/landing/scribble_pink.png";
import spiral_star from "../images/landing/spiral_star.png";
import three_stars from "../images/landing/three_stars.png";
import man_thinking from "../images/landing/man_thinking.png";
import bulb from "../images/landing/bulb.png";
import spiral from "../images/spiral.png";
import black_star from "../images/landing/black_star.png";
import avatar from "../images/landing/avatar.png";
import spotify from "../images/landing/spotify.png";
import scribble_black from "../images/landing/scribble_black.png";
import "../App.css"
import {useNavigate} from "react-router-dom";
import SignUpButton from "../components/landing/SignUpButton";
import LogInButton from "../components/landing/LogInButton";
import ContinueButton from "../components/ContinueButton";
import Footer from "../components/Footer";
import RecentWriting from "../components/landing/RecentWriting";
import Membership from "../components/landing/Membership";
import ReadersOpinion from "../components/landing/ReadersOpinion";
import AboutComponent from "../components/landing/AboutComponent";
import LandingMain from "../components/landing/LandingMain";

const LandingScreen = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
    }

    const handleLogInClick = () => {
        navigate("/auth");
    }

    const handleSignUpClick = () => {
        navigate("/registration");
    }

    const handleAboutClick = () => {
        navigate("/about");
        window.scroll({
            top: 0
        });
    }

    const handleAddressClick = () => {
        window.open("https://maps.app.goo.gl/LDoje5M2UQB9YL5m8");
    }

    const handleEmailClick = () => {
        window.location = 'mailto:contact@readly.com?subject=Get in Touch with Readly!';
    }

    function getCurrentYear() {
        return new Date().getFullYear();
    }

    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <Logo src={logo} alt="Readly" onClick={handleLogoClick}/>
                    <HeaderText onClick={handleAboutClick}>About</HeaderText>
                </HeaderLeft>
                <HeaderRight>
                    <LogInButton onClick={handleLogInClick} text="Log in"/>
                    <SignUpButton onClick={handleSignUpClick} text="Sign up"/>
                </HeaderRight>
            </Header>

            <LandingMain/>

            <AboutComponent/>

            <ReadersOpinion/>

            <Membership/>

            <RecentWriting/>

            <Footer/>
        </Container>
    )
};

export default LandingScreen;

const Container = styled.div`
    font-family: 'Montserrat Alternates', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

// ------------- Header -------------
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
    z-index: 2;
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
`;
