import React from 'react';
import styled from 'styled-components';
import logo from "../images/logo.png";
import instagram from "../images/landing/instagram.png";
import twitter from "../images/landing/twitter.png";
import tiktok from "../images/landing/tiktok.png";
import discord from "../images/landing/discord.png";
import app_store from "../images/landing/app_store.png";
import google_play from "../images/landing/google_play.png";
import {Link, useNavigate} from "react-router-dom";
import "../App.css"
import 'react-international-phone/style.css';

const Footer = ({ backgroundColor = "white" }) => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
        window.scroll({
            top: 0
        });
    }

    const handleLogInClick = () => {
        navigate("/auth");
    }

    const handleSignUpClick = () => {
        navigate("/registration");
    }

    const handleAboutClick = () => {
        window.scroll({
            top: 0,
            behavior: "smooth"
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
        <FooterContainer backgroundColor={backgroundColor}>
            <FooterTop>
                <FooterLeft>
                    <FooterLeftImage>
                        <StyledLogoImage onClick={handleLogoClick} src={logo} alt="logo" />
                        ©{getCurrentYear()}.
                    </FooterLeftImage>
                    Stay connected with us for the latest updates, exclusive offers, and behind-the-scenes peeks into our world of creativity and inspiration.
                    <FooterSocialMedia>
                        <StyledSocialMediaImage src={instagram} alt="instagram" />
                        <StyledSocialMediaImage src={twitter} alt="twitter" />
                        <StyledSocialMediaImage src={tiktok} alt="tiktok" />
                        <StyledSocialMediaImage src={discord} alt="discord" />
                    </FooterSocialMedia>
                </FooterLeft>
                <FooterRight>
                    <FooterCol>
                        <FooterColTitle>Pages</FooterColTitle>
                        <FooterColText onClick={handleAboutClick}>About</FooterColText>
                        <FooterColText onClick={handleLogInClick}>Log In</FooterColText>
                        <FooterColText onClick={handleSignUpClick}>Sign up</FooterColText>
                    </FooterCol>
                    <FooterCol>
                        <FooterColTitle>Contact</FooterColTitle>
                        <FooterColText onClick={handleAddressClick}>Lviv, Ukraine</FooterColText>
                        <StyledLink to={'#'} onClick={handleEmailClick}>contact@readly.com</StyledLink>
                        <StyledLink to="tel:123456789">(123) 456 - 7890</StyledLink>
                    </FooterCol>
                    <FooterCol>
                        <FooterColTitle>App available on:</FooterColTitle>
                        <FooterColAppImg>
                            <StyledMarketImage src={app_store} alt="app store" />
                            <StyledMarketImage src={google_play} alt="google play" />
                        </FooterColAppImg>
                    </FooterCol>
                </FooterRight>
            </FooterTop>
            <HorizontalLine />
            <FooterBottom>
                <FooterBottomText>
                    ©{getCurrentYear()}. All Rights Reserved.
                    <ReadlyLink  onClick={handleLogoClick}> Readly</ReadlyLink>
                </FooterBottomText>
                <FooterBottomText>Terms & Privacy</FooterBottomText>
            </FooterBottom>
        </FooterContainer>
    );
};

export default Footer;

const HorizontalLine = styled.div`
    background-color: #4D4D4D;
    height: 0.1mm;
    width: 90%;
    margin-bottom: 15px;
`;

const FooterContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.backgroundColor};
    margin-top: -75px;
    padding-top: 150px;
`;

const FooterTop = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;

    @media (max-width: 900px) {
        flex-direction: column;
    }
`;

const FooterLeft = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 22px;

    @media (max-width: 430px) {
        width: 100%;
    }
`;

const FooterRight = styled.div`
    width: 50%;
    display: flex;
    align-items: flex-start;
    gap: 45px;

    @media (max-width: 460px) {
        flex-direction: column;
        align-items: center;
    }
`;

const FooterLeftImage = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 15px;
`;

const StyledLogoImage = styled.img`
    height: 60px;
    cursor: pointer;
`;

const FooterSocialMedia = styled.div`
    display: flex;
    gap: 18px;
`;

const StyledSocialMediaImage = styled.img`
    height: 25px;
    cursor: pointer;
`;

const FooterCol = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
`;

const FooterColAppImg = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 18px;
`;

const FooterColTitle = styled.h4`
    font-size: 17px;
    margin: 0;
`;

const FooterColText = styled.div`
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    &:hover {
        color: #915F6D;
    }
`;

const StyledLink  = styled(Link)`
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    &:hover {
        color: #915F6D;
    }
`;

const StyledMarketImage = styled.img`
    height: 40px;
    cursor: pointer;
`;

// ----- FooterBottom -----
const FooterBottom = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 40px 0;
`;

const FooterBottomText = styled.div`
    cursor: pointer;
`;

const ReadlyLink = styled.a`
    font-weight: 600;
    cursor: pointer;
    color: #915F6D;
    transition: all 0.1s ease-in-out;

    &:hover {
        color: #000000;
    }
`;
