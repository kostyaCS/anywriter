import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import MyEditor from "../components/TextEditor";
import BlueButton from "../components/BlueButton";
import { push, ref, set } from "@firebase/database";
import { rtdb } from "../firebase";
import {useNavigate} from "react-router-dom";

const CreateWork = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [editorData, setEditorData] = useState('');

    const handleEditorChange = (data) => {
        setEditorData(data);
    };

    const saveWork = async () => {
        try {
            if (!currentUser) {
                console.error("No user is currently logged in.");
                return;
            }

            const userWorksRef = ref(rtdb, `users/${currentUser.uid}/works`);
            const mainDbRef = ref(rtdb, "works");
            const newMainRef = push(mainDbRef);
            const newWorkRef = push(userWorksRef);
            await set(newWorkRef, {
                content: editorData,
                createdAt: new Date().toISOString()
            });
            await set(newMainRef, {
                content: editorData,
            })
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
            <MainContainer>
                {currentUser?.email}
            </MainContainer>
            <MyEditor editorData={editorData} onEditorChange={handleEditorChange} />
            <BlueButton text="Зберегти" onClick={saveWork}/>
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
