import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputQuestion from "./InputQuestion";
import Options from "./Options";
import { onValue, ref } from "firebase/database";
import { rtdb } from "../firebase";
import { update } from "@firebase/database";

const MyPageContainer = (props) => {
    const currentUserRef = ref(rtdb, `users/${props.user.uid}/userPref`);

    const [selectedAgeOption, setSelectedAgeOption] = useState();
    const [selectedEmotionOption, setSelectedEmotionOption] = useState();
    const [selectedFormatOption, setSelectedFormatOption] = useState();
    const [selectedGenreOption, setSelectedGenreOption] = useState();
    const [selectedInterestOption, setSelectedInterestOption] = useState();

    useEffect(() => {
        onValue(currentUserRef, (snapshot) => {
            setMappedFirebaseDataToOptions(snapshot.val());
        });
    }, []);

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

    const setMappedFirebaseDataToOptions = (firebaseData) => {
        if (!firebaseData) {
            return;
        }

        if (firebaseData.age) {
            setSelectedAgeOption(firebaseData.age.map(item => ageData.find(option => option.label === item)));
        }

        if (firebaseData.emotion) {
            setSelectedEmotionOption(firebaseData.emotion.map(item => emotionData.find(option => option.label === item)));
        }

        if (firebaseData.format) {
            setSelectedFormatOption(firebaseData.format.map(item => formatData.find(option => option.label === item)));
        }

        if (firebaseData.genre) {
            setSelectedGenreOption(firebaseData.genre.map(item => genreData.find(option => option.label === item)));
        }

        if (firebaseData.interests) {
            setSelectedInterestOption(firebaseData.interests.map(item => interestsData.find(option => option.label === item)));
        }
    }

    const getLabels = (options) => {
        return options ? options.map(item => item.label) : [];
    }

    const handleChange = (value, obj, setFunc) => {
        setFunc(value);
        update(currentUserRef, obj);
    }

    return (
        <List>
            <InputQuestion text="Змінити віковий діапазон:" />
            <Options placeholder={'Вибрати віковий діапазон'} data={ageData} value={selectedAgeOption}
                onChange={(e) => handleChange(e, { age: getLabels(e) }, setSelectedAgeOption)} />
            <InputQuestion text="Змінити емоцію(ї), яку(і) Ви хочете пережити:" />
            <Options placeholder={'Вибрати емоцію'} data={emotionData} value={selectedEmotionOption}
                onChange={(e) => handleChange(e, { emotion: getLabels(e) }, setSelectedEmotionOption)} />
            <InputQuestion text="Змінити форми, яким Ви надаєте перевагу:" />
            <Options placeholder={'Вибрати форму'} data={formatData} value={selectedFormatOption}
                onChange={(e) => handleChange(e, { format: getLabels(e) }, setSelectedFormatOption)} />
            <InputQuestion text="Змінити жанри, яким Ви надаєте перевагу:" />
            <Options placeholder={'Вибрати жанр'} data={genreData} value={selectedGenreOption}
                onChange={(e) => handleChange(e, { genre: getLabels(e) }, setSelectedGenreOption)} />
            <InputQuestion text="Змінити зацікавлення:" />
            <Options placeholder={'Вибрати зацікавлення'} data={interestsData} value={selectedInterestOption}
                onChange={(e) => handleChange(e, { interests: getLabels(e) }, setSelectedInterestOption)} />
        </List>
    );
}

export default MyPageContainer;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px 0 0 30px;
    font-family: Helvetica;
`;
