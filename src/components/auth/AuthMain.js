import styled from 'styled-components';
import React, {useState} from "react";
import ContinueButton from "../ContinueButton";
import {useNavigate} from "react-router-dom";
import doodle from "../../images/doodle.png";
import ExtraRedirectContainer from "../ExtraRedirectContainer";
import InvalidInput from "../InvalidInput";
import OrLineSeparator from "../OrLineSeparator";
import GoogleButton from "../GoogleButton";
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {auth} from "../../firebase";


const AuthMain = () => {
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
            navigate("/main");
        } catch (error) {
            alert("No such user!");
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            console.log("User signed in with Google");
            navigate("/main");
        } catch (error) {
            console.error("Error signing in with Google:", error.message);
        }
    };

    const handleRedirect = () => {
        navigate("/registration");
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
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
    )
};

export default AuthMain;

const Main = styled.div`
    height: 70vh;
    min-height: 550px;
    width: 50vw;
    max-width: 100vw;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 550px) {
        width: 100vw;
    }
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
    text-align: center;
    transition: all 0.3s ease-in;

    @media (max-width: 550px) {
        font-size: 40px;
    }
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

    @media (max-width: 550px) {
        width: 90%;
    }
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

    @media (max-width: 550px) {
        width: 90%;
    }
`;
