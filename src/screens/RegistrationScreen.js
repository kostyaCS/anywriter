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
import InvalidInput from "../components/InvalidInput";
import ExtraRedirectContainer from "../components/ExtraRedirectContainer";
import InputTitle from "../components/InputTitle";

const RegistrationScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState(new Date()); // <-- Initialize startDate state and setStartDate function
    const [valid, setValid] = useState(false);
    const [invalidEmailMessage, setInvalidEmail] = useState("");
    const [invalidPasswordMessage, setInvalidPassword] = useState("");
    const [invalidDateMessage, setInvalidDate] = useState("");

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

    const checkPassword = (password) => {
        if (password.length < 8) {
            setInvalidPassword("Password is too short.");
            return false;
        } else if (!/[A-Z]/.test(password)) {
            setInvalidPassword("Password must contain at least one uppercase letter.");
            return false;
        }
        setInvalidPassword("");
        return true;
    };

    const subtractYears = (date, years) => {
        return new Date(date.getTime()).setFullYear(date.getFullYear() - years);
    }

    const checkDate = (date) => {
        let currDate = new Date();
        if (date < subtractYears(currDate, 120) || date > subtractYears(currDate, 4)) {
            setInvalidDate("Invalid date.");
            return false;
        }
        setInvalidDate("");
        return true;
    };

    const checkInputData = (email, password, date) => {
        return checkEmail(email) && checkPassword(password) && checkDate(date);
    };

    const handleRegister = async () => {
        if (!checkInputData(email, password, startDate)) {
            setValid(false);
            return;
        }
        setValid(true);
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
            navigate("/main_page");
        } catch (error) {
            console.error(error.message);
        }
    };

    const saveInfoAboutUser = async (selectedDate) => {
        if (!valid) {
            console.log('Entered data is invalid.');
            return;
        }
        console.log('Attempting to save info about user');
        try {
            const usersRef = ref(rtdb, 'users');
            const newUserRef = push(usersRef);
            await set(newUserRef, {
                email: email,
                date: selectedDate.toISOString(),
                type: type,
                writings: {poems: [""], novels: [""]}
            });
            console.log('Email saved with key: ', newUserRef.key);
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleRedirect = () => {
        navigate("/");
    }

    return (
        <>
            <Main>
                <Text>
                    Реєстрація акаунту
                </Text>
                <InputTitle text="Електронна пошта" />
                <InputField placeholder="Введіть свою електронну пошту" value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                {invalidEmailMessage && (<InvalidInput text={invalidEmailMessage}/>)}
                <InputTitle text="Пароль" />
                <InputField type="password" placeholder="Введіть пароль" value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                {invalidPasswordMessage && (<InvalidInput text={invalidPasswordMessage}/>)}
                <InputTitle text="Дата народження" />
                <StyledDatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                {invalidDateMessage && (<InvalidInput text={invalidDateMessage}/>)}
                <BlueButton onClick={async () => {
                    await handleRegister();
                    await saveInfoAboutUser(startDate);
                    }}
                    text="Зареєструвати акаунт"
                />
                <StyledImage src={OrImage}/>
                <GoogleButton onClick={handleGoogleSignIn}
                    text="Зареєструвати за допомогою Google"
                />
                <ExtraRedirectContainer onClick={handleRedirect}
                                        text="Вже маєте акаунт?"
                                        redirectButton="Увійти"
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

// Styled DatePicker
const StyledDatePicker = styled(DatePicker)`
    border: 1px solid #9B9B9B;
    border-radius: 5px;
    width: 420px;
    height: 50px;
    padding-left: 20px;
    box-sizing: border-box;
`;
