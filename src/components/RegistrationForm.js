import React, { useState } from "react";
import styled from 'styled-components';
import OrImage from "../images/or.svg"
import { useNavigate } from "react-router-dom";
import { auth, rtdb } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ref, push, set } from '@firebase/database';
import "react-datepicker/dist/react-datepicker.css";
import BlueButton from "../components/BlueButton";
import GoogleButton from "../components/GoogleButton";
import InvalidInput from "../components/InvalidInput";
import ExtraRedirectContainer from "../components/ExtraRedirectContainer";
import InputTitle from "../components/InputTitle";
import StyledDatePicker from "./StyledDatePicker";
import Options from "./Options";
import InputQuestion from "./InputQuestion";


const RegistrationForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const subtractYears = (date, years) => {
        return new Date(date.getTime()).setFullYear(date.getFullYear() - years);
    }
    const [startDate, setStartDate] = useState(); // <-- Initialize startDate state and setStartDate function

    const [invalidEmailMessage, setInvalidEmail] = useState("");
    const [invalidPasswordMessage, setInvalidPassword] = useState("");
    const [invalidDateMessage, setInvalidDate] = useState("");

    const [displayQuestions, setDisplayQuestions] = useState(false);

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

    const checkPassword = (password) => {
        if (password.length < 8) {
            setInvalidPassword("Пароль має містити мінімум 7 символів.");
            return false;
        } else if (!/[A-Z]/.test(password)) {
            setInvalidPassword("Пароль має містити принаймні одну велику літеру.");
            return false;
        }
        setInvalidPassword("");
        return true;
    };

    const checkDate = (date) => {
        if (date == null) {
            setInvalidDate("Введіть дату народження.");
            return false;
        }
        setInvalidDate("");
        return true;
    };

    const checkInputData = (email, password, date) => {
        return checkEmail(email) && checkPassword(password) && checkDate(date);
    };

    const handleRegister = async () => {
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
            navigate("/main_page");
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

    const getLabels = (options) => {
        return options ? options.map(item => item.label) : [];
    }

    const saveInfoAboutUser = async (selectedDate) => {
        console.log('Attempting to save info about user');
        try {
            const usersRef = ref(rtdb, 'users');
            const newUserRef = push(usersRef);
            await set(newUserRef, {
                email: email,
                date: selectedDate.toISOString(),
                writings: { poems: [""], novels: [""] },
                userPref: {
                    age: getLabels(selectedAgeOption),
                    emotion: getLabels(selectedEmotionOption),
                    format: getLabels(selectedFormatOption),
                    genre: getLabels(selectedGenreOption),
                    interests: getLabels(selectedInterestOption)
                }
            });
            console.log('Email saved with key: ', newUserRef.key);
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleRedirect = () => {
        navigate("/");
    }

    const handleNext = async () => {
        if (!checkInputData(email, password, startDate)) {
            return;
        }
        setDisplayQuestions(true);
    }

    const handlePrevious = async () => {
        setDisplayQuestions(false);
    }

    const [selectedAgeOption, setSelectedAgeOption] = useState();
    const [selectedEmotionOption, setSelectedEmotionOption] = useState();
    const [selectedFormatOption, setSelectedFormatOption] = useState();
    const [selectedGenreOption, setSelectedGenreOption] = useState();
    const [selectedInterestOption, setSelectedInterestOption] = useState();

    const ageData = [
        { label: "13-17", value: 1 },
        { label: "18-21", value: 2 },
        { label: "21-25", value: 3 },
        { label: "25-35", value: 4 },
        { label: "35+", value: 5 },
    ];

    const emotionData = [
        { label: "Радість", value: 1 },
        { label: "Сум", value: 2 },
        { label: "Спокій", value: 3 },
        { label: "Страх", value: 4 },
    ];

    const formatData = [
        { label: "Нарис", value: 1 },
        { label: "Лист", value: 2 },
        { label: "Новела", value: 3 },
        { label: "Оповідання", value: 4 },
        { label: "Спогад", value: 5 },
        { label: "Легенда", value: 6 }
    ];

    const genreData = [
        { label: "Хорор", value: 1 },
        { label: "Фентезі", value: 2 },
        { label: "Наукова фантастика", value: 3 },
        { label: "Містика", value: 4 },
        { label: "Трилер", value: 5 },
        { label: "Історичний роман", value: 6 },
        { label: "Романтичний роман", value: 7 },
        { label: "Детектив", value: 8 }
    ];

    const interestsData = [
        { label: "Подорожі", value: 1 },
        { label: "Живопис", value: 2 },
        { label: "Скульптура", value: 3 },
        { label: "Музика", value: 4 },
        { label: "Театр", value: 5 },
        { label: "Історія", value: 6 },
        { label: "Кіно", value: 7 },
        { label: "Спорт", value: 8 }
    ];

    return (
        <>
            <Main>
                <Text>
                    Реєстрація акаунту
                </Text>
                {!displayQuestions &&
                    (<>
                        <InputTitle text="Електронна пошта" />
                        <InputField type="email" placeholder="Введіть свою електронну пошту" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        {invalidEmailMessage && (<InvalidInput text={invalidEmailMessage} />)}
                        <InputTitle text="Пароль" />
                        <InputField type="password" placeholder="Введіть пароль" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        {invalidPasswordMessage && (<InvalidInput text={invalidPasswordMessage} />)}
                        <InputTitle text="Дата народження" />
                        <StyledDatePicker
                            startDate={startDate} setStartDate={setStartDate}
                            checkDate={checkDate} subtractYears={subtractYears}
                        />
                        {invalidDateMessage && (<InvalidInput text={invalidDateMessage} />)}
                        <BlueButton onClick={async () => {
                            await handleNext();
                        }}
                            text="Далі"
                        />
                        <StyledImage src={OrImage} />
                        <GoogleButton onClick={handleGoogleSignIn}
                            text="Зареєструвати за допомогою Google"
                        />
                        <ExtraRedirectContainer onClick={handleRedirect}
                            text="Вже маєте акаунт?"
                            redirectButton="Увійти"
                        />
                    </>)}
                {displayQuestions &&
                    (<>
                        <InputQuestion text="Оберіть Ваш віковий діапазон?" />
                        <Options placeholder={'Вибрати віковий діапазон'} data={ageData} value={selectedAgeOption}
                            onChange={(e) => setSelectedAgeOption(e)} />
                        <InputQuestion text="Яку емоцію(ї) Ви хочете пережити?" />
                        <Options placeholder={'Вибрати емоцію'} data={emotionData} value={selectedEmotionOption}
                            onChange={(e) => setSelectedEmotionOption(e)} />
                        <InputQuestion text="Яким формам надаєте перевагу?" />
                        <Options placeholder={'Вибрати форму'} data={formatData} value={selectedFormatOption}
                            onChange={(e) => setSelectedFormatOption(e)} />
                        <InputQuestion text="Яким жанрам надаєте перевагу?" />
                        <Options placeholder={'Вибрати жанр'} data={genreData} value={selectedGenreOption}
                            onChange={(e) => setSelectedGenreOption(e)} />
                        <InputQuestion text="Ваші зацікавлення?" />
                        <Options placeholder={'Вибрати зацікавлення'} data={interestsData} value={selectedInterestOption}
                            onChange={(e) => setSelectedInterestOption(e)} />
                        <BlueButton onClick={async () => {
                            await handlePrevious();
                        }} text="Назад" />
                        <BlueButton onClick={async () => {
                            await handleRegister();
                            await saveInfoAboutUser(startDate);
                        }}
                            text="Зареєструвати акаунт"
                        />
                    </>)}
            </Main>
        </>
    )
};


export default RegistrationForm;

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
