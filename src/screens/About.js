import React, {useState} from "react";
import logo from "../images/logo.png";
import spiral_star from "../images/landing/spiral_star.png";
import three_stars from "../images/landing/three_stars.png";
import spotify from "../images/landing/spotify.png";
import scribble_black from "../images/landing/scribble_black.png";
import circle_pink from "../images/landing/circle_pink.png";
import google_podcast from "../images/landing/google_podcast.png";
import apple_podcast from "../images/landing/apple_podcast.png";
import scribble_zig from "../images/landing/scribble_zig.png";
import lines from "../images/landing/lines_left.png";
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
import InvalidInput from "../components/AboutInvalidInput";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { parsePhoneNumber } from 'libphonenumber-js'
import swal from 'sweetalert';


const LandingScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [invalidEmailMessage, setInvalidEmail] = useState("");
    const [invalidPhoneNumberMessage, setInvalidPhoneNumber] = useState("");
    const [invalidFullNameMessage, setInvalidFullName] = useState("");
    const [invalidSubjectMessage, setInvalidSubject] = useState("");
    const [invalidMessMessage, setInvalidMessage] = useState("");

    const checkEmail = (email) => {
        if (String(email).match(
            /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,}$/
        )) {
            setInvalidEmail("");
            return true;
        }
        setInvalidEmail("Invalid email format.");
        return false;
    };

    const checkPhoneNumber = (phoneNumber) => {
        try {
            const phone = parsePhoneNumber(phoneNumber);
            if (phone.isValid()) {
                setInvalidPhoneNumber("");
                return true;
            } else {
                setInvalidPhoneNumber("Invalid format of phone number.");
                return false;
            }
        } catch (error) {
            setInvalidPhoneNumber("Phone number is too short.");
            return false;
        }
    };

    const checkFullName = (fullName) => {
        if (fullName) {
            setInvalidFullName("");
            return true;
        }
        setInvalidFullName("This field is required.");
        return false;
    };

    const checkSubject = (subject) => {
        if (subject) {
            setInvalidSubject("");
            return true;
        }
        setInvalidSubject("This field is required.");
        return false;
    };

    const checkMessage = (message) => {
        if (message) {
            setInvalidMessage("");
            return true;
        }
        setInvalidMessage("This field is required.");
        return false;
    };

    const checkInputData = () => {
        return checkFullName(fullName) && checkEmail(email) && checkPhoneNumber(phoneNumber) &&
            checkSubject(subject) && checkMessage(message);
    };

    const sendMessage = async () => {
        if (!checkInputData()) { return; }

        console.log('Attempting to send message.');

        // TODO : implement sending email.

        const willSend = await swal({
            title: "Are you sure you want to send this message?",
            text: "",
            icon: "info",
            buttons: {
                no: {
                    text: "No",
                    className: "swal-button--cancel",
                    value: false
                },
                yes: {
                    text: "Yes",
                    className: "swal-button--confirm",
                    value: true
                }
            },
            dangerMode: true,
            closeOnClickOutside: true,
            closeOnEsc: true,
        });

        if (willSend) {
            setFullName("");
            setEmail("");
            setPhoneNumber("");
            setSubject("");
            setMessage("");
            swal("Success!", "Your message has been sent.", "success");
            // swal({
            //     title: "Sending...",
            //     text: "Your message is being sent.",
            //     icon: "info",
            //     buttons: false,
            //     closeOnClickOutside: true,
            //     closeOnEsc: true,
            //     timer: 1000,
            // }).then(() => {
            //     swal("Success!", "Your message has been sent.", "success");
            // });
        } else {
            swal("Cancelled", "Your message was not sent.", "error");
        }
    };

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
            <Main>
                <MainContainer>
                    <LeftImgContainer>
                        <StyledSpiralStarImage src={spiral_star} alt="spiral star" />
                    </LeftImgContainer>
                    <MainTextContainer>
                        <StyledMainText>About</StyledMainText>
                        <StyledMainTextPink>Readly</StyledMainTextPink>
                        <SimpleText>We believe in the power of words to inspire, connect, and transform. Dive into a vibrant community where writers and readers come together to explore diverse perspectives, share their stories, and ignite their creativity.</SimpleText>
                        <ContinueButton onClick={handleLogInClick} text="Get Started"/>
                    </MainTextContainer>
                    <RightImgContainer>
                        <StyledStarsImage src={three_stars} alt="three stars" />
                    </RightImgContainer>
                </MainContainer>
                <MainNumbers>
                    <MainNumbersCard>
                        <MainNumbersCardTitle>76K</MainNumbersCardTitle>
                        <MainNumbersCardText>Community Members</MainNumbersCardText>
                    </MainNumbersCard>
                    <MainNumbersCard>
                        <MainNumbersCardTitle>128K</MainNumbersCardTitle>
                        <MainNumbersCardText>Writings</MainNumbersCardText>
                    </MainNumbersCard>
                    <MainNumbersCard>
                        <MainNumbersCardTitle>59K</MainNumbersCardTitle>
                        <MainNumbersCardText>Daily Readers</MainNumbersCardText>
                    </MainNumbersCard>
                </MainNumbers>
            </Main>

            <About>
                <StyledAboutText>
                    <StyledLinesImg src={lines} alt="lines" />
                    About and History
                </StyledAboutText>
                <AboutImgContainer>
                    <AboutImgCardText>Founded with a vision to inspire, Readly has been a beacon of creativity and knowledge since its inception. Our journey is fueled by the passion to create a platform where stories are shared, ideas flourish, and imaginations soar.</AboutImgCardText>
                    <AboutImgCardText>At the heart of Readly lies a commitment to diversity, inclusivity, and the celebration of voices from all walks of life. We believe in the transformative power of storytelling to unite communities, spark conversations, and ignite change.</AboutImgCardText>
                </AboutImgContainer>
                <ScribbleImg src={scribble_black} alt="scribble black" />
            </About>

            <Sponsors>
                <StyledSponsorsText>
                    <StyledCircleImage src={circle_pink} alt="circle pink" />
                    Our Sponsors
                </StyledSponsorsText>
                <SponsorsCardContainer>
                    <SponsorsCard>
                        <StyledSponsorsCardTitle>
                            <StyledSpotifyImage src={spotify} alt="spotify" />
                            Spotify
                        </StyledSponsorsCardTitle>
                        <HorizontalLine />
                        <StyledSponsorsCardText>As one of the leading platforms for streaming music and podcasts, Spotify's support underscores their commitment to promoting diverse voices and engaging storytelling. Together, we aim to amplify the reach of captivating narratives and foster a vibrant community of listeners and creators.</StyledSponsorsCardText>
                    </SponsorsCard>
                    <SponsorsCard>
                        <StyledSponsorsCardTitle>
                            <StyledSpotifyImage src={google_podcast} alt="spotify" />
                            Google Podcast
                        </StyledSponsorsCardTitle>
                        <HorizontalLine />
                        <StyledSponsorsCardText>With Google Podcast's backing, we are empowered to bring compelling stories to audiences worldwide. Their dedication to innovation and accessibility aligns perfectly with our mission to make quality content accessible to everyone.</StyledSponsorsCardText>
                    </SponsorsCard>
                    <SponsorsCard>
                        <StyledSponsorsCardTitle>
                            <StyledSpotifyImage src={apple_podcast} alt="spotify" />
                            Apple Podcast
                        </StyledSponsorsCardTitle>
                        <HorizontalLine />
                        <StyledSponsorsCardText>Apple Podcast, a platform known for its innovative approach to audio entertainment, is partnering with us to amplify diverse voices and foster a global community of writers and readers.</StyledSponsorsCardText>
                    </SponsorsCard>
                </SponsorsCardContainer>
                <ScribbleImg src={scribble_black} alt="scribble black" />
            </Sponsors>

            <GetInTouch>
                <StyledGetInTouchText>
                    <StyledScribbleZigImage src={scribble_zig} alt="scribble zigzag"/>
                    Get In Touch
                </StyledGetInTouchText>
                <StyledGetInTouchTextSmall>Send your message to us</StyledGetInTouchTextSmall>

                <HorizontalLine/>
                <Subtitle>Full Name</Subtitle>
                <InputField type="text" placeholder="Enter your full name" value={fullName}
                            onChange={(e) => setFullName(e.target.value)}/>
                {invalidFullNameMessage && (<InvalidInput text={invalidFullNameMessage}/>)}
                <Subtitle>Email</Subtitle>
                <InputField type="email" placeholder="Enter your email" value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                {invalidEmailMessage && (<InvalidInput text={invalidEmailMessage}/>)}
                <PhoneAndSubject>
                    <PhoneCont>
                        <Subtitle>Phone Number</Subtitle>
                        <StyledPhoneInput
                            defaultCountry={"ua"}
                            value={phoneNumber}
                            onChange={setPhoneNumber}/>
                        {invalidPhoneNumberMessage && (<InvalidInput text={invalidPhoneNumberMessage}/>)}
                    </PhoneCont>
                    <SubjectCont>
                        <Subtitle>Subject</Subtitle>
                        <SubjectInputField type="text" placeholder="Enter a subject" value={subject}
                                    onChange={(e) => setSubject(e.target.value)}/>
                        {invalidSubjectMessage && (<InvalidInput text={invalidSubjectMessage}/>)}
                    </SubjectCont>
                </PhoneAndSubject>
                <Subtitle>Message</Subtitle>
                <MessageInputField type="text" placeholder="Enter your message" value={message}
                            onChange={(e) => setMessage(e.target.value)}/>
                {invalidMessMessage && (<InvalidInput text={invalidMessMessage}/>)}
                <ContinueButton onClick={async () => {
                    await sendMessage();
                }} text="SEND MESSAGE"/>
                <ScribbleImg src={scribble_black} alt="scribble black"/>
            </GetInTouch>

            <Footer>
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
    z-index: 3;
    width: 90vw;
    padding: 5px 5vw;
`;

const HeaderText = styled.div`
    cursor: pointer;
    color: #915F6D;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.1s ease-in-out;

    &:hover {
        text-shadow: 0 0 20px rgba(145, 95, 109, 0.85);
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
    height: max-content;
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
    width: 674px;

    @media (max-width: 890px) {
        width: 460px;
    }
`;

// ----------- Main Numbers -----------
const MainNumbers = styled.div`
    display: flex;
    gap: 60px;
    justify-content: center;
    align-items: center;
    margin: 60px 15px -65px 15px;
    z-index: 2;
    text-align: center;
    flex-wrap: wrap;
`;

const MainNumbersCard = styled.div`
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 60px;
    background-color: white;
    border: 2px solid black;
    border-radius: 5px;
    font-family: 'Montserrat Alternates', sans-serif;
    -webkit-box-shadow: 5px 5px 0 0 rgba(145,95,109,1);
    -moz-box-shadow: 5px 5px 0 0 rgba(145,95,109,1);
    box-shadow: 5px 5px 0 0 rgba(145,95,109,1);
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 6px 6px 0 0 rgba(145,95,109,1);
    }
`;

const MainNumbersCardTitle = styled.h3`
    font-size: 55px;
    margin: 20px 0 5px 0;
`;

const MainNumbersCardText = styled.p`
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
    margin: 110px 0 0 0;
`;

const StyledStarsImage = styled.img`
    height: 170px;
    width: auto;
`;

const ScribbleImg = styled.img`
    height: 150px;
    margin-top: 50px;
    margin-left: 30px;
    z-index: 1;

    @media (max-width: 890px) {
        margin-top: 65px;
    }
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
    display: flex;
    justify-content: center;
    width: 70vw;
    margin-top: 170px;
    font-size: 50px;
    font-weight: 700;
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

const AboutImgCardText = styled.div`
    width: 420px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

// ------------- Sponsors Card -------------
const StyledSponsorsCardTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 30px;
    font-weight: 600;
`;

const StyledSpotifyImage = styled.img`
    height: 55px;
`;


// ---------------------------------------
// --------------- Sponsors ---------------
// ---------------------------------------
const Sponsors = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EDF3F7;
    margin-top: -75px;
    padding-top: 150px;
`;

const StyledSponsorsText = styled.div`
    display: flex;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
`;

const StyledCircleImage = styled.img`
    height: 65px;
    margin-top: -50px;
`;

const StyledLinesImg = styled.img`
    height: 65px;
    margin-top: -40px;
`;

const StyledGetInTouchTextSmall = styled.div`
    font-size: 20px;
    width: 70vw;
    text-align: center;
`;

// ---- Subtitle ----
const Subtitle = styled.h4`
    width: 500px;
    font-size: 15px;
    margin: 4px 0;
`;

const InputField = styled.input`
    font-size: 14px;
    font-family: 'Montserrat Alternates', sans-serif;
    width: 500px;
    border-radius: 8px;
    border: 1px solid black;
    padding: 0 10px 0 20px;
    height: 50px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    }
`;

const MessageInputField = styled.input`
    font-size: 14px;
    font-family: 'Montserrat Alternates', sans-serif;
    width: 500px;
    border-radius: 8px;
    border: 1px solid black;
    padding: 0 10px 0 20px;
    height: 70px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    }
`;

const SubjectInputField = styled.input`
    font-size: 14px;
    font-family: 'Montserrat Alternates', sans-serif;
    width: 230px;
    border-radius: 8px;
    border: 1px solid black;
    padding: 0 10px 0 20px;
    height: 50px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    }
`;

const StyledPhoneInput = styled(PhoneInput)`
    font-size: 14px;
    font-family: 'Montserrat Alternates', sans-serif;
    width: 500px;
    --react-international-phone-height : 50px;
    --react-international-phone-border-radius : 8px;
    --react-international-phone-border-color : black;

    &:focus {
        outline: none;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    }
`;

const PhoneAndSubject = styled.div`
    display: flex;
    justify-content: space-between;
    width: 500px;
`;

const PhoneCont = styled.div`
    width: 250px;
`;

const SubjectCont = styled.div`
    width: 230px;
`;


const SponsorsCardContainer = styled.div`
    width: 90vw;
    display: flex;
    gap: 30px;
    overflow-x: scroll;
    margin: 70px 0 0 10vw;
`;

const SponsorsCard = styled.div`
    min-width: 500px;
    display: flex;
    gap: 25px;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 35px;
    border: 2px solid #000000;
    border-radius: 8px;
    text-align: center;

    @media (max-width: 836px) {
        min-width: 380px;
    }
`;

const StyledSponsorsCardText = styled.h6`
    font-size: 17px;
    font-weight: 400;
    margin: 0;
`;

// ------------------------------------------
// -------------- Get In Touch --------------
// ------------------------------------------
const GetInTouch = styled.div`
    width: 100vw;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    margin-top: -75px;
    padding-top: 150px;
`;

const StyledGetInTouchText = styled.div`
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    word-break:keep-all;

    @media (max-width: 836px) {
        width: 370px;
    }
`;

const StyledScribbleZigImage = styled.img`
    width: 120px;
    align-self: flex-end;
    margin: 0 -60px -20px 0;
`;

const HorizontalLine = styled.div`
    background-color: #4D4D4D;
    height: 0.1mm;
    width: 90%;
    margin-bottom: 15px;
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
    background-color: #FDF7F4;
    margin-top: -75px;
    padding-top: 150px;
`;

const FooterTop = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;

    @media (max-width: 836px) {
        flex-direction: column;
        gap: 60px;
    }
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
