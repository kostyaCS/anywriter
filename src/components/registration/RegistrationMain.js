import styled from 'styled-components';
import React, {useState} from "react";
import ContinueButton from "../ContinueButton";
import {useNavigate} from "react-router-dom";
import doodle from "../../images/doodle.png";
import ExtraRedirectContainer from "../ExtraRedirectContainer";
import InvalidInput from "../InvalidInput";
import OrLineSeparator from "../OrLineSeparator";
import GoogleButton from "../GoogleButton";
import {
    createUserWithEmailAndPassword, getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import {auth, rtdb} from "../../firebase";
import StyledDatePicker from "../StyledDatePicker";
import {ref, set} from "@firebase/database";


const RegistrationMain = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const subtractYears = (date, years) => {
        return new Date(date.getTime()).setFullYear(date.getFullYear() - years);
    }
    const [startDate, setStartDate] = useState();

    const [invalidEmailMessage, setInvalidEmail] = useState("");
    const [invalidPasswordMessage, setInvalidPassword] = useState("");
    const [invalidDateMessage, setInvalidDate] = useState("");
    const [invalidNicknameMessage, setInvalidNickname] = useState("");

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
            setInvalidPassword("Password must contain at least 7 characters.");
            return false;
        } else if (!/[A-Z]/.test(password)) {
            setInvalidPassword("Password must contain at least one capital letter.");
            return false;
        }
        setInvalidPassword("");
        return true;
    };

    const checkDate = (date) => {
        if (date == null) {
            setInvalidDate("Enter birthdate.");
            return false;
        }
        setInvalidDate("");
        return true;
    };

    const checkNickname = (nickname) => {
        // TODO: save in db and check if nickname exists
        // if (nickname exists) {
        //     setInvalidDate("Nickname already exists.");
        //     return false;
        // }
        setInvalidNickname("");
        return true;
    };

    const checkInputData = () => {
        return checkEmail(email) && checkPassword(password) && checkDate(startDate) && checkNickname(nickname);
    };

    const handleRegister = async () => {
        if (!checkInputData()) { return; }

        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
            setNickname("");
            navigate("/main");
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleGoogleSignIn = async () => {
        const googleProvider = new GoogleAuthProvider();
        googleProvider.addScope('https://www.googleapis.com/auth/calendar');
        googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
        googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        googleProvider.addScope('openid');

        googleProvider.setCustomParameters({
            prompt: 'select_account consent',
        });
        try {

            const result = await signInWithPopup(auth, googleProvider);
            navigate("/main");
        } catch (error) {
            console.error(error.message);
        }
    };

    const saveInfoAboutUser = async () => {
        if (!checkInputData(email, password, startDate)) { return; }

        console.log('Attempting to save info about user');
        try {
            const auth = getAuth();
            const currentUserRef = ref(rtdb, `users/${auth.currentUser.uid}`);
            await set(currentUserRef, {
                nickname: nickname,
                birthdate: startDate
            });
            console.log('User saved successfully!');
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleRedirect = () => {
        navigate("/auth");
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <Main>
            <Title>
                <StyledImage src={doodle} alt="doodle" />
                <TitleText>Create an account</TitleText>
            </Title>
            <ExtraRedirectContainer onClick={handleRedirect}
                                    text="Already have an account?"
                                    redirectButton="Log in"
            />
            <HorizontalLineSeparator/>
            <Subtitle>Nickname</Subtitle>
            <InputField type="text" placeholder="Enter your nickname" value={nickname}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, '');
                            setNickname(value);
                            checkNickname(value);
                        }} />
            {invalidNicknameMessage && (<InvalidInput text={invalidNicknameMessage} />)}
            <Subtitle>Email</Subtitle>
            <InputField type="email" placeholder="Enter your email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
            {invalidEmailMessage && (<InvalidInput text={invalidEmailMessage} />)}
            <Subtitle>Password</Subtitle>
            <InputField type="password" placeholder="Enter your password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
            {invalidPasswordMessage && (<InvalidInput text={invalidPasswordMessage} />)}
            <Subtitle>Birthdate</Subtitle>
            <StyledDatePicker
                startDate={startDate} setStartDate={setStartDate}
                checkDate={checkDate} subtractYears={subtractYears}
            />
            {invalidDateMessage && (<InvalidInput text={invalidDateMessage} />)}
            <ContinueButton onClick={async () => {
                await handleRegister();
                await saveInfoAboutUser();
            }} text="SIGN UP"/>
            <OrLineSeparator text="OR" />
            <GoogleButton onClick={handleGoogleSignIn}
                          text="Sign up with Google"
            />
        </Main>
    )
};

export default RegistrationMain;

const Main = styled.div`
    display: flex;
    gap: 6px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 80vh;
    min-height: 700px;
    margin-bottom: 60px;

    @media (max-width: 627px) {
        min-height: 790px;
    }

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
    margin: 0 0 5px 0;
    text-align: center;
    transition: all 0.3s ease-in;

    @media (max-width: 550px) {
        font-size: 40px;
    }

    @media (max-width: 420px) {
        width: 90%;
    }
`;

const HorizontalLineSeparator = styled.div`
    width: 450px;
    height: 0.15mm;
    background-color: #4D4D4D;
    margin: 10px 0 5px 0;
`;

const Subtitle = styled.h4`
    width: 450px;
    font-size: 15px;
    margin: 4px 0;

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
