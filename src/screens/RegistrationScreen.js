import React, { useState } from "react";
import styled from 'styled-components';
import OrImage from "../images/or.svg"
import { useNavigate } from "react-router-dom";
import { auth, rtdb } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ref, push, set } from '@firebase/database';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BlueButton from "../components/BlueButton";
import GoogleButton from "../components/GoogleButton";

const RegistrationScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState(new Date()); // <-- Initialize startDate state and setStartDate function

    const checkPassword = (password) => {
        if (password.length < 8) {
            alert("Password is too short.");
            return false;
        } else if (!/[A-Z]/.test(password)) {
            alert("Password must contain at least one uppercase letter.");
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (!checkPassword(password)) {
            return;
        }
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
            setType("");
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

    const saveInfoAboutUser = async (selectedDate) => {
        console.log('Attempting to save info about user');
        try {
            const usersRef = ref(rtdb, 'users');
            const newUserRef = push(usersRef);
            await set(newUserRef, {
                email: email,
                date: selectedDate.toISOString(),
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
                    <StyledDatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <SmallInputField placeholder="Ваша роль" value={type}
                                     onChange={(e) => setType(e.target.value)}/>
                </InputsContainer>
                <BlueButton onClick={async () => {
                    await saveInfoAboutUser(startDate);
                    await handleRegister();
                    }}
                    text="Зареєструвати акаунт"
                />
                <StyledImage src={OrImage}/>
                <GoogleButton onClick={handleGoogleSignIn}
                    text="Зареєструвати за допомогою Google"
                />
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

// Styled DatePicker
const StyledDatePicker = styled(DatePicker)`
    border: 1px solid #9B9B9B;
    border-radius: 5px;
    width: 205px;
    height: 50px;
    padding-left: 20px;
    box-sizing: border-box;
`;
