import React, { useState } from "react";
import styled from 'styled-components';
import GoogleButtonImage from "../images/google_button.svg"
import OrImage from "../images/or.svg"
import { useNavigate } from "react-router-dom";
import { auth, rtdb } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ref, push, set } from '@firebase/database';

const RegistrationScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");

    const handleRegister = async () => {
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
            setType("");
            setDate("");
            navigate("/user");
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            navigate("/user");
        } catch (error) {
            console.error(error.message);
        }
    };

    const saveInfoAboutUser = async () => {
        console.log('Attempting to save info about user');
        try {
            const usersRef = ref(rtdb, 'users');
            const newUserRef = push(usersRef);
            await set(newUserRef, {
                email: email,
                date: date,
                type: type
            });
            console.log('Email saved with key: ', newUserRef.key);
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <>
            <Main>
                <Text>
                    Реєстрація акаунту
                </Text>
                <InputField placeholder="Email" value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                <InputField type="password" placeholder="Пароль" value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                <InputsContainer>
                    <SmallInputField placeholder="Дата народження" value={date}
                                     onChange={(e) => setDate(e.target.value)}/>
                    <SmallInputField placeholder="Ваша роль" value={type}
                                     onChange={(e) => setType(e.target.value)}/>
                </InputsContainer>
                <BlueButton onClick={async () => {
                    await saveInfoAboutUser();
                    await handleRegister();
                    }
                }>
                    Зареєструвати акаунт
                </BlueButton>
                <StyledImage src={OrImage}/>
                <GoogleButton onClick={handleGoogleSignIn}>
                    <StyledImage src={GoogleButtonImage}/>
                    Зареєструвати за допомогою Google
                </GoogleButton>
            </Main>
        </>
    )
};

export default RegistrationScreen;

const Main = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
`;

const Text = styled.div`
    font-weight: 700;
    font-size: 32px;
    line-height: 36.8px;
    color: black;
    margin-bottom: 10px;
`;

const InputField = styled.input`
    border: 1px solid #9B9B9B;
    border-radius: 5px;
    width: 420px;
    padding-left: 20px;
    height: 50px;
    box-sizing: border-box;
`;

const StyledImage = styled.img`
    width: auto;
    height: auto;
    max-height: 100%;
`;

const GoogleButton = styled.button`
    border: 1px solid #2100A3;
    border-radius: 5px;
    display: flex;
    justify-content: center; 
    align-items: center;
    gap: 10px;
    width: 420px;
    height: 50px;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: #2100A3;
    cursor: pointer;
    background-color: white;
`;

const BlueButton = styled.button`
    background-color: #160070;
    border-radius: 5px;
    width: 420px;
    height: 50px;
    border: none;
    color: white;
    font-size: 16px;
    font-weight: 700;
    line-height: 18px;
    cursor: pointer;
`;

const SmallInputField = styled.input`
    width: 205px;
    height: 50px;
    border: 1px solid #9B9B9B;
    border-radius: 5px;
    padding-left: 20px;
    box-sizing: border-box;
`;

const InputsContainer = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: row;
`;