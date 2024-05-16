import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import MyEditor from "../components/TextEditor";
import { push, ref, set } from "@firebase/database";
import { rtdb } from "../firebase";
import { useNavigate } from "react-router-dom";
import Options from "../components/Options";
import Header from "../components/Header";

const CreateWork = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [editorData, setEditorData] = useState('');
    const [title, setTitle] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedInterest, setSelectedInterest] = useState(null);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [selectedFormat, setSelectedFormat] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);

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

    const ageData = [
        { label: "13-17", value: 1 },
        { label: "18-21", value: 2 },
        { label: "21-25", value: 3 },
        { label: "25-35", value: 4 },
        { label: "35+", value: 5 },
    ];

    const handleEditorChange = (data) => {
        setEditorData(data);
    };

    const getLabels = (options) => {
        return options ? options.map(item => item.label) : [];
    }

    const saveWork = async () => {
        const date = new Date();
        try {
            if (!currentUser) {
                console.error("No user is currently logged in.");
                return;
            }
            const mainDbRef = ref(rtdb, "works");
            const newMainRef = push(mainDbRef);
            await set(newMainRef, {
                title: title,
                content: editorData,
                age: getLabels(selectedAge),
                emotion: getLabels(selectedEmotion),
                format: getLabels(selectedFormat),
                genre: getLabels(selectedGenre),
                interests: getLabels(selectedInterest),
                date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
                reviews: [],
            });
            console.log('Work saved successfully!');
        } catch (error) {
            console.error('Error saving work: ', error);
        } finally {
            navigate("/main_page");
        }
    };

    return (
        <>
            <Header />
            <MainContainer>
                <InputTitile value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Введіть назву"/>
                <MyEditor editorData={editorData} onEditorChange={handleEditorChange} />
                <Options placeholder={'Select Genre'} data={genreData} value={selectedGenre}
                         onChange={(e) => setSelectedGenre(e)} />
                <Options placeholder={'Select sphere of interest of the text'} data={interestsData} value={selectedInterest}
                         onChange={(e) => setSelectedInterest(e)} />
                <Options placeholder={'Select emotion, which your text represent'} data={emotionData} value={selectedEmotion}
                         onChange={(e) => setSelectedEmotion(e)} />
                <Options placeholder={'Select format of the text'} data={formatData} value={selectedFormat}
                         onChange={(e) => setSelectedFormat(e)} />
                <Options placeholder={'Select age category of your text'} data={ageData} value={selectedAge}
                         onChange={(e) => setSelectedAge(e)} />
                <StyledButton onClick={saveWork}> Save </StyledButton>
            </MainContainer>
        </>
    );
}

export default CreateWork;

const StyledButton = styled.button`
    background-color: #ffffff;
    border: 2px solid #000000;
    color: black;
    border-radius: 15px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 500;
    font-family: "Montserrat Alternates", sans-serif;
    cursor: pointer;
    box-shadow: 5px 5px 0px 0px #81ADC8;
    max-width: fit-content;
    margin-top: 10px;

    transition: 0.3s ease;
    &:hover {
        scale: 1.03;
        box-shadow: 6px 6px 0px 0px #81ADC8;
    }
`;

const InputTitile = styled.input`
    font-size: 24px;
    font-weight: 600;
    padding: 10px;
    border-radius: 15px;
    border: 2px solid #000000;
    max-width: 40%;
    font-family: "Montserrat Alternates", sans-serif;
    box-shadow: 5px 5px 0px 0px #81ADC8;
    transition: 0.3s ease;
    margin-bottom: 10px;
    &:hover {
        scale: 1.03;
        box-shadow: 6px 6px 0px 0px #81ADC8;
    }
    
    @media (max-width: 800px) {
        font-size: 18px;
        max-width: 70%;
    }
`;

const MainContainer = styled.div`
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 30px;
`;
