import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import MyEditor from "../components/TextEditor";
import BlueButton from "../components/BlueButton";
import { push, ref, set } from "@firebase/database";
import { rtdb } from "../firebase";
import { useNavigate } from "react-router-dom";
import Options from "../components/Options";

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
            <Header>
                <HeaderText>
                    Мої твори
                </HeaderText>
            </Header>
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
            <BlueButton text="Зберегти" onClick={saveWork} />
        </>
    );
}

export default CreateWork;

const Header = styled.div`
    padding-top: 20px;
    gap: 80px;
    padding-bottom: 20px;
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const StyledImage = styled.img``;

const InputTitile = styled.input``;

const HeaderText = styled.div`
    font-weight: 300;
    cursor: pointer;
    font-size: 16px;
    line-height: 18px;
`;

const MainContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
`;
