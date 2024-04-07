import React, { useState } from "react";
import AnyWriterImage from "../images/AnyWriter.svg"
import styled from 'styled-components';
import OrLineSeparator from "../components/OrLineSeparator";
import "../App.css"
import { auth } from "../firebase";
import {
    signInWithEmailAndPassword, signInWithPopup,
    GoogleAuthProvider, onAuthStateChanged
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import BlueButton from "../components/BlueButton";
import GoogleButton from "../components/GoogleButton";
import InvalidInput from "../components/InvalidInput";

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
        setInvalidEmail("Неправильний формат адреси електронної пошти.");
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
        <>
            <Main>
                <LeftWindow>
                    <StyledImage src={AnyWriterImage} />
                </LeftWindow>
                <VerticalLineSeparator />
                <RightWindow>
                    <InputField placeholder="Електронна пошта" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    {invalidEmailMessage && (<InvalidInput text={invalidEmailMessage} />)}
                    <InputField type="password" placeholder="Пароль" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <BlueButton onClick={handleSignIn} text="Продовжити" />
                    <OrLineSeparator text="або" />
                    <GoogleButton onClick={handleGoogleSignIn}
                        text="Зареєструвати за допомогою Google"
                    />
                    <BlueButton onClick={handleRedirect} text="Зареєструвати акаунт" />
                </RightWindow>
            </Main>
        </>
    )
};

export default AuthorizationScreen;

const Main = styled.div`
    display: flex;
    max-height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const VerticalLineSeparator = styled.div`
    height: 100vh;
    width: 1px;
    background-color: #282c34;
`;

const StyledImage = styled.img`
    width: auto;
    height: auto;
    max-height: 100%;
`;

const LeftWindow = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const RightWindow = styled.div`
    width: 50%;
    display: flex;
    justify-content: center; 
    gap: 10px;
    align-items: center;
    flex-direction: column;
`;

const InputField = styled.input`
    border: 1px solid #9B9B9B;
    border-radius: 5px;
    width: 420px;
    padding-left: 20px;
    height: 50px;
    box-sizing: border-box;
`;
