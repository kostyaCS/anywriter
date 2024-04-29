import React, { useState } from "react";
import doodle from "../images/doodle.png";
import spiral from "../images/spiral.png";
import three_stars from "../images/three_stars.png";
import styled from 'styled-components';
import OrLineSeparator from "../components/OrLineSeparator";
import "../App.css"
import { auth } from "../firebase";
import {
    signInWithEmailAndPassword, signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../components/GoogleButton";
import InvalidInput from "../components/InvalidInput";
import ExtraRedirectContainer from "../components/ExtraRedirectContainer";
import ContinueButton from "../components/ContinueButton";

const AuthorizationScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [invalidEmailMessage, setInvalidEmail] = useState("");

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

    const handleSignIn = async () => {
        if (!checkEmail(email)) {
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in");
            navigate("/main_page");
        } catch (error) {
            alert("No such user!");
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            console.log("User signed in with Google");
            navigate("/main_page");
        } catch (error) {
            console.error("Error signing in with Google:", error.message);
        }
    };

    const handleRedirect = () => {
        navigate("/registration");
    }

    return (
        <Container>
            <StyledSpiralImage src={spiral} alt="spiral" />
            <Main>
                <Title>
                    <StyledImage src={doodle} alt="doodle" />
                    <TitleText>Log in</TitleText>
                </Title>
                <ExtraRedirectContainer onClick={handleRedirect}
                                        text="Not a member?"
                                        redirectButton="Sign up"
                />
                <HorizontalLineSeparator/>
                <Subtitle>Email</Subtitle>
                <InputField placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                {invalidEmailMessage && (<InvalidInput text={invalidEmailMessage} />)}
                <Subtitle>Password</Subtitle>
                <InputField type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <ContinueButton onClick={handleSignIn} text="LOG IN"/>
                <OrLineSeparator text="OR" />
                <GoogleButton onClick={handleGoogleSignIn}
                    text="Continue with Google"
                />
            </Main>
            <StyledStarsImage src={three_stars} alt="three_stars" />
        </Container>
    )
};

export default AuthorizationScreen;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
    font-family: 'Montserrat Alternates';
`;

const Main = styled.div`
    height: 100vh;
    width: 50vw;
    max-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat Alternates';
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const StyledImage = styled.img`
    width: 67px;
    height: auto;
    max-height: 100%;
    margin-right: -50px;
`;

const TitleText = styled.h1`
    font-size: 50px;
    margin: 0 0 20px 0;
`;

const HorizontalLineSeparator = styled.div`
    width: 450px;
    height: 0.15mm;
    background-color: #4D4D4D;
    margin: 30px 0 20px 0;
`;

const Subtitle = styled.h4`
    width: 450px;
    font-size: 15px;
    margin: 12px 0;
`;

const InputField = styled.input`
    font-size: 14px;
    font-family: 'Montserrat Alternates', sans-serif;
    width: 450px;
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
