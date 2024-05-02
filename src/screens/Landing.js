import React, { useState } from "react";
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
import circle_pink from "../images/landing/circle_pink.png";
import avatar_2 from "../images/landing/avatar_2.png";
import avatar_3 from "../images/landing/avatar_3.png";
import avatar_4 from "../images/landing/avatar_4.png";
import avatar_5 from "../images/landing/avatar_5.png";
import google_podcast from "../images/landing/google_podcast.png";
import apple_podcast from "../images/landing/apple_podcast.png";
import scribble_zig from "../images/landing/scribble_zig.png";
import scribble_blue from "../images/landing/scribble_blue.png";
import three_diamonds from "../images/three_diamonds.png";
import smile from "../images/landing/smile.png";
import faces from "../images/landing/faces.png";
import fire from "../images/landing/fire.png";
import asterisk from "../images/landing/asterisk.png";
import lines from "../images/landing/lines.png";
import cover from "../images/landing/cover.png";
import instagram from "../images/landing/instagram.png";
import twitter from "../images/landing/twitter.png";
import tiktok from "../images/landing/tiktok.png";
import discord from "../images/landing/discord.png";
import app_store from "../images/landing/app_store.png";
import google_play from "../images/landing/google_play.png";
import styled from 'styled-components';
import "../App.css"
import {Link, useNavigate} from "react-router-dom";
import SignUpButton from "../components/landing/SignUpButton";
import LogInButton from "../components/landing/LogInButton";
import ContinueButton from "../components/ContinueButton";
import LandingButton from "../components/landing/LandingButton";

const LandingScreen = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    }

    const handleLogInClick = () => {
        navigate("/auth");
    }

    const handleSignUpClick = () => {
        navigate("/registration");
    }

    const handlePricingClick = () => {
        navigate("/auth");
    }

    function getCurrentYear() {
        console.log(new Date().getFullYear());
        return new Date().getFullYear();
    }

    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <Logo src={logo} alt="Readly" onClick={handleLogoClick}/>
                    <HeaderText>
                        About
                    </HeaderText>
                    <HeaderText>
                        Features
                    </HeaderText>
                </HeaderLeft>
                <HeaderRight>
                    <LogInButton onClick={handleLogInClick} text="Log in"/>
                    <SignUpButton onClick={handleSignUpClick} text="Sign up"/>
                </HeaderRight>
            </Header>
            <Main>
                <MainContainer>
                    <LeftImgContainer>
                        <StyledSpiralStarImage src={spiral_star} alt="spiral star" />
                    </LeftImgContainer>
                    <MainTextContainer>
                        <StyledMainText>Your Daily</StyledMainText>
                        <StyledMainTextPink>Writings</StyledMainTextPink>
                        <SimpleText>We cover all kinds of categories and a weekly special guest.</SimpleText>
                        <ContinueButton onClick={handleLogInClick} text="Get Started"/>
                    </MainTextContainer>
                    <RightImgContainer>
                        <StyledStarsImage src={three_stars} alt="three stars" />
                    </RightImgContainer>
                </MainContainer>
                <ScribbleImg src={scribble_pink} alt="scribble pink" />
            </Main>

            <About>
                <StyledAboutText>Talk. Listen. Get inspired by every minute of it.</StyledAboutText>
                <AboutImgContainer>
                    <AboutImgCard>
                        <StyledManImage src={man_thinking} alt="man thinking" />
                        <AboutImgCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ultrices odio.</AboutImgCardText>
                    </AboutImgCard>
                    <AboutImgCard>
                        <StyledBulbImage src={bulb} alt="bulb" />
                        <AboutImgCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ultrices odio.</AboutImgCardText>
                    </AboutImgCard>
                </AboutImgContainer>
                <AboutReviewContainer>
                    <StyledSpiralImage src={spiral} alt="spiral" />
                    <AboutReviewMain>
                        <StyledAboutReviewTextPink>“</StyledAboutReviewTextPink>
                        <StyledAboutReviewText>One of the best daily writings that cover various topics.</StyledAboutReviewText>
                        <StyledAboutPersonTextContainer>
                            <StyledAboutPersonText>
                                <StyledAvatarImage src={avatar} alt="avatar" />
                                John Smith,
                            </StyledAboutPersonText>
                            <StyledAboutPersonText>
                                <StyledSpotifyImage src={spotify} alt="spotify" />
                                <b>Social Community Manager</b>
                            </StyledAboutPersonText>
                        </StyledAboutPersonTextContainer>
                    </AboutReviewMain>
                    <StyledBlackStarImage src={black_star} alt="black star" />
                </AboutReviewContainer>
                <ScribbleImg src={scribble_black} alt="scribble black" />
            </About>

            <Readers>
                <StyledReadersText>
                    <StyledCircleImage src={circle_pink} alt="circle pink" />
                    What our readers say
                </StyledReadersText>
                <StyledReadersTextSmall>Their experience throughout the platform</StyledReadersTextSmall>
                <ReadersCardContainer>
                    <ReadersCard>
                        <StyledAboutReviewTextPink>“</StyledAboutReviewTextPink>
                        <StyledReadersCardText>Lorem ipsum dolor sit amet consectet piscing elit, sed do eiusmod tempor incidi ut labore et dolore magna aliqua. </StyledReadersCardText>
                        <StyledReadersPersonTextContainer>
                            <StyledAboutPersonText>
                                <StyledAvatarImage src={avatar_2} alt="avatar" />
                                Luna lovegood,
                            </StyledAboutPersonText>
                            <StyledAboutPersonText>
                                <StyledSpotifyImage src={spotify} alt="spotify" />
                                <b>Spotify</b>
                            </StyledAboutPersonText>
                        </StyledReadersPersonTextContainer>
                    </ReadersCard>
                    <ReadersCard>
                        <StyledAboutReviewTextPink>“</StyledAboutReviewTextPink>
                        <StyledReadersCardText>Lorem ipsum dolor sit amet consectet piscing elit, sed do eiusmod tempor incidi ut labore et dolore magna aliqua. </StyledReadersCardText>
                        <StyledReadersPersonTextContainer>
                            <StyledAboutPersonText>
                                <StyledAvatarImage src={avatar_3} alt="avatar" />
                                Emily Blunt,
                            </StyledAboutPersonText>
                            <StyledAboutPersonText>
                                <StyledSpotifyImage src={google_podcast} alt="spotify" />
                                <b>Google Podcast</b>
                            </StyledAboutPersonText>
                        </StyledReadersPersonTextContainer>
                    </ReadersCard>
                    <ReadersCard>
                        <StyledAboutReviewTextPink>“</StyledAboutReviewTextPink>
                        <StyledReadersCardText>Lorem ipsum dolor sit amet consectet piscing elit, sed do eiusmod tempor incidi ut labore et dolore magna aliqua. </StyledReadersCardText>
                        <StyledReadersPersonTextContainer>
                            <StyledAboutPersonText>
                                <StyledAvatarImage src={avatar_4} alt="avatar" />
                                Mia Winters,
                            </StyledAboutPersonText>
                            <StyledAboutPersonText>
                                <StyledSpotifyImage src={apple_podcast} alt="spotify" />
                                <b>Apple Podcast</b>
                            </StyledAboutPersonText>
                        </StyledReadersPersonTextContainer>
                    </ReadersCard>
                </ReadersCardContainer>
                <ScribbleImg src={scribble_black} alt="scribble black" />
            </Readers>

            <Membership>
                <StyledMembershipText>
                    <StyledScribbleZigImage src={scribble_zig} alt="scribble zigzag" />
                    Membership benefits
                </StyledMembershipText>
                <StyledReadersTextSmall>Become our sponsor and get all benefits</StyledReadersTextSmall>
                <MembershipCardsContainer>
                    <MembershipCard>
                        <StyledScribbleBlueImg src={scribble_blue} alt="scribble blue" />
                        <MembershipCardMainText>Topic by Request</MembershipCardMainText>
                        Lorem ipsum dolor sit amet consectet piscing elit, sed do eiusmod tempor.
                    </MembershipCard>
                    <MembershipCard>
                        <StyledThreeDiamondsImg src={three_diamonds} alt="three diamonds" />
                        <MembershipCardMainText>Exclusive Content</MembershipCardMainText>
                        Lorem ipsum dolor sit amet consectet piscing elit, sed do eiusmod tempor.
                    </MembershipCard>
                    <MembershipCard>
                        <StyledSmileImg src={smile} alt="smile" />
                        <MembershipCardMainText>Join the Community</MembershipCardMainText>
                        Lorem ipsum dolor sit amet consectet piscing elit, sed do eiusmod tempor.
                    </MembershipCard>
                    <MembershipCard>
                        <StyledFacesImg src={faces} alt="faces" />
                        <MembershipCardMainText>Livestreaming Access</MembershipCardMainText>
                        Lorem ipsum dolor sit amet consectet piscing elit, sed do eiusmod tempor.
                    </MembershipCard>
                    <MembershipCard>
                        <StyledFireImg src={fire} alt="fire" />
                        <MembershipCardMainText>Exclusive Episodes & Merch</MembershipCardMainText>
                        Lorem ipsum dolor sit amet consectet piscing elit, sed do eiusmod tempor.
                    </MembershipCard>
                    <MembershipCard>
                        <StyledAsteriskImg src={asterisk} alt="asterisk" />
                        <MembershipCardMainText>And much more!</MembershipCardMainText>
                        Lorem ipsum dolor sit amet consectet piscing elit, sed do eiusmod tempor.
                    </MembershipCard>
                </MembershipCardsContainer>
                <LandingButton onClick={handlePricingClick} text="SEE PRICING"/>
                <ScribbleImg src={scribble_black} alt="scribble black" />
            </Membership>

            <RecentWriting>
                <StyledReadersText>Recent Writings</StyledReadersText>
                <StyledReadersTextSmall>Available on your favorite platform</StyledReadersTextSmall>
                <RecentWritingContainer>
                    <StyledLinesImg src={lines} alt="lines" />
                    <RecentWritingCard>
                        <RecentWritingMain>
                            <FrameImgContainer>
                                <StyledRecentWritingImage src={cover} alt="cover" />
                            </FrameImgContainer>
                            <RecentWritingMainTextContainer>
                                <RecentWritingMainDate>13.04.2024</RecentWritingMainDate>
                                <RecentWritingMainTitle>Pandemic Becoming Endemic</RecentWritingMainTitle>
                                <HorizontalLine />
                                <RecentWritingMainText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ultrices odio.</RecentWritingMainText>
                            </RecentWritingMainTextContainer>
                        </RecentWritingMain>
                        <RecentWritingAdditional>
                            <RecentWritingAdditionalTags>
                                <RecentWritingAdditionalTag>covid-19</RecentWritingAdditionalTag>
                                <RecentWritingAdditionalTag>health</RecentWritingAdditionalTag>
                            </RecentWritingAdditionalTags>
                            <RecentWritingAdditionalCreator>
                                Created by:
                                <StyledAvatarImage src={avatar_5} alt="avatar" />
                            </RecentWritingAdditionalCreator>
                        </RecentWritingAdditional>
                    </RecentWritingCard>
                </RecentWritingContainer>
                <LandingButton onClick={handlePricingClick} text="BROWSE ALL WRITINGS"/>
                <ScribbleImg src={scribble_black} alt="scribble black" />
            </RecentWriting>

            <Footer>
                <FooterTop>
                    <FooterLeft>
                        <FooterLeftImage>
                            <StyledLogoImage src={logo} alt="logo" />
                            ©{getCurrentYear()}.
                        </FooterLeftImage>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
                            <FooterColText>About</FooterColText>
                            <FooterColText>Features</FooterColText>
                        </FooterCol>
                        <FooterCol>
                            <FooterColTitle>Contact</FooterColTitle>
                            <FooterColText>55 East Birchwood Ave. Brooklyn, New York 11201</FooterColText>
                            <FooterColText>contact@readly.com</FooterColText>
                            <FooterColText>(123) 456 - 7890</FooterColText>
                        </FooterCol>
                        <FooterCol>
                            <FooterColText>App available on:</FooterColText>
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
                        <ReadlyLink>Readly</ReadlyLink>
                    </FooterBottomText>
                    <FooterBottomText>Terms & Privacy</FooterBottomText>
                </FooterBottom>
            </Footer>
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
    z-index: 1;
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

// ------------------------------------
// --------------- Main ---------------
// ------------------------------------
const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FDF7F4;
    width: 100vw;
    height: 590px;

    @media (max-width: 836px) {
        height: 750px;
    }
`;

// ------------- Main Container -------------
const MainContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const MainTextContainer = styled.div`
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const StyledMainText = styled.h1`
    font-size: 70px;
    margin: 80px 0 0 0;
    text-align: center;
`;

const StyledMainTextPink = styled.h1`
    font-size: 70px;
    color: #C9A9A6;
    margin: 0 0 0 0;
`;

const SimpleText = styled.div`
    display: flex;
    text-align: center;
    margin: 40px 0 40px 0;
    width: 374px;
`;

// ------------- Images -------------
const LeftImgContainer = styled.div`
    height: 400px;
    width: 230px;
    overflow: hidden;
    direction: rtl;
    margin: 10px 0 0 0;
`;

const StyledSpiralStarImage = styled.img`
    height: 430px;
    width: auto;
`;

const RightImgContainer = styled.div`
    width: 230px;
    overflow: hidden;
    margin: 130px 0 0 0;
`;

const StyledStarsImage = styled.img`
    height: 170px;
    width: auto;
`;

const ScribbleImg = styled.img`
    height: 150px;
    margin-top: 70px;
    margin-left: 30px;
    z-index: 1;
`;


// -------------------------------------
// --------------- About ---------------
// -------------------------------------
const About = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 100vw;
    height: max-content;
`;

const StyledAboutText = styled.h2`
    width: 70vw;
    margin-top: 140px;
    font-size: 50px;
    text-align: center;
`;

// ------------- Images -------------
const AboutImgContainer = styled.div`
    width: 85vw;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    text-align: center;

    @media (max-width: 836px) {
        flex-direction: column;
        align-items: center;
    }
`;

const AboutImgCard = styled.div`
    width: 420px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledManImage = styled.img`
    width: 275px;
    margin: 40px;
`;

const StyledBulbImage = styled.img`
    width: 255px;
    margin: 50px;
`;

const AboutImgCardText = styled.div`
`;

// ------------- Review -------------
const AboutReviewContainer = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 90px 0 0 0;
`;

const StyledSpiralImage = styled.img`
    height: 100px;
    z-index: 1;
    margin: 170px -40px 0 0;

    @media (max-width: 915px) {
        margin: 230px -40px 0 0;
    }
`;

const StyledBlackStarImage = styled.img`
    height: 110px;
    z-index: 1;
    margin: -38px 0 0 -60px;
`;

// ------------- Review Main -------------
const AboutReviewMain = styled.div`
    width: 60vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F7EDE8;
    border-radius: 8px;
    padding: 40px;
`;

const StyledAboutReviewText = styled.h4`
    font-size: 35px;
    margin: 0 0 0 0;
`;

const StyledAboutReviewTextPink = styled.h4`
    font-size: 80px;
    color: #C9A9A6;
    margin: 0 0 -20px 0;
`;

const StyledAboutPersonTextContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin-top: 30px;

    @media (max-width: 915px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
`;

const StyledAboutPersonText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const StyledAvatarImage = styled.img`
    height: 40px;
`;

const StyledSpotifyImage = styled.img`
    height: 20px;
`;


// ---------------------------------------
// --------------- Readers ---------------
// ---------------------------------------
const Readers = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EDF3F7;
    margin-top: -75px;
    padding-top: 150px;
`;

const StyledReadersText = styled.div`
    display: flex;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
`;

const StyledCircleImage = styled.img`
    height: 65px;
    margin-top: -50px;
`;

const StyledReadersTextSmall = styled.div`
    font-size: 20px;
`;

const ReadersCardContainer = styled.div`
    width: 90vw;
    display: flex;
    gap: 30px;
    overflow-x: scroll;
    margin: 70px 0 0 10vw;
`;

const ReadersCard = styled.div`
    min-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    padding: 35px;
    border-radius: 8px;

    @media (max-width: 836px) {
        min-width: 380px;
    }
`;

const StyledReadersPersonTextContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 15px;
    margin-top: 30px;
    flex-wrap: wrap;
`;

const StyledReadersCardText = styled.h6`
    font-size: 23px;
    font-weight: 500;
    margin: 0 0 0 0;
`;

// ------------------------------------------
// --------------- Membership ---------------
// ------------------------------------------
const Membership = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    margin-top: -75px;
    padding-top: 150px;
`;

const StyledMembershipText = styled.div`
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
`;

const StyledScribbleZigImage = styled.img`
    width: 120px;
    align-self: flex-end;
    margin: 0 -60px -20px 0;
`;

// ------------ Membership Cards Container ------------
const MembershipCardsContainer = styled.div`
    width: 90vw;
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
    margin: 60px 0;
    text-align: center;
`;

const MembershipCard = styled.div`
    width: 310px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledScribbleBlueImg = styled.img`
    height: 35px;
`;

const StyledThreeDiamondsImg = styled.img`
    height: 70px;
`;

const StyledSmileImg = styled.img`
    height: 90px;
`;

const StyledFacesImg = styled.img`
    height: 60px;
`;

const StyledFireImg = styled.img`
    height: 60px;
`;

const StyledAsteriskImg = styled.img`
    height: 60px;
`;

const MembershipCardMainText = styled.h4`
`;

// ----------------------------------------------
// --------------- Recent writing ---------------
// ----------------------------------------------
const RecentWriting = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FDF7F4;
    margin-top: -75px;
    padding-top: 150px;
`;

const RecentWritingContainer = styled.div`
    margin: 0 0 80px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
`;

const RecentWritingCard = styled.div`
    width: 65vw;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 2px solid #000000;
    border-radius: 12px;
    -webkit-box-shadow: 10px 10px 0 0 rgba(129,173,200,.75);
    -moz-box-shadow: 10px 10px 0 0 rgba(129,173,200,.75);
    box-shadow: 10px 10px 0 0 rgba(129,173,200,.75);
`;

const StyledLinesImg = styled.img`
    height: 80px;
    margin-right: -70px;
`;

const RecentWritingMain = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
`;

const FrameImgContainer = styled.div`
    width: 250px;
    height: 290px;
    overflow: hidden;
    border-radius: 8px;
`;

const StyledRecentWritingImage = styled.img`
    height: 300px;
`;

const RecentWritingMainTextContainer = styled.div`
    width: 100%;
`;

const RecentWritingMainDate = styled.h4`
`;

const RecentWritingMainTitle = styled.h3`
    color: #915F6D;
`;

const HorizontalLine = styled.div`
    background-color: #4D4D4D;
    height: 0.1mm;
    width: 90%;
    margin-bottom: 15px;
`;

const RecentWritingMainText = styled.div`
`;

// ------------ RecentWritingAdditional ------------
const RecentWritingAdditional = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0 0 0;
`;

const RecentWritingAdditionalTags = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
`;

const RecentWritingAdditionalTag = styled.div`
    background-color: white;
    border: 1px solid #4D4D4D;
    border-radius: 4px;
    padding: 6px 10px;
`;

const RecentWritingAdditionalCreator = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
`;

// --------------------------------------
// --------------- Footer ---------------
// --------------------------------------
const Footer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    margin-top: -75px;
    padding-top: 150px;
`;

const FooterTop = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;
`;

const FooterLeft = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 22px;
`;

const FooterRight = styled.div`
    width: 50%;
    display: flex;
    align-items: flex-start;
    gap: 45px;
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
`;

const ReadlyLink = styled.a`
`;
