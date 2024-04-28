import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderDef from "../components/Header";
import { rtdb } from "../firebase";
import { ref, onValue } from "firebase/database";
import ScrollContainer from "../components/ScrollContainer";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

const MainPage = () => {
    const [allData, setAllData] = useState([]);
    const [activeTab, setActiveTab] = useState("all"); // Додано стан для відстеження активності кнопок
    const auth = getAuth();

    setPersistence(auth, browserSessionPersistence)
        .then(() => {
        })
        .catch((error) => {
            console.error("Persistence setup failed:", error);
        });

    useEffect(() => {
        const worksRef = ref(rtdb, `works`);

        onValue(worksRef, (snapshot) => {
            const works = snapshot.val();
            const allContents = [];
            for (let id in works) {
                allContents.push({
                    id: id,
                    liked: false,
                    ...works[id]
                });
            }

            setAllData(allContents);
        });
        return () => {
        };
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <HeaderDef />
            <MainContainer>
                <Left>
                    <LeftOpt
                        onClick={() => handleTabClick("all")}
                        active={activeTab === "all"} // Змінено стиль кнопки в залежності від активності
                    >
                        All
                    </LeftOpt>
                    <LeftOpt
                        onClick={() => handleTabClick("liked")}
                        active={activeTab === "liked"} // Змінено стиль кнопки в залежності від активності
                    >
                        Liked
                    </LeftOpt>
                    <LeftOpt
                        onClick={() => handleTabClick("saved")}
                        active={activeTab === "saved"} // Змінено стиль кнопки в залежності від активності
                    >
                        Saved
                    </LeftOpt>
                </Left>
                <DivLine />
                <Right>
                    <ScrollContainer text={allData.filter(item => activeTab === "all" || (activeTab === "liked" && item.liked) || (activeTab === "saved" && item.saved))} />
                </Right>
            </MainContainer>
        </>
    );
};

export default MainPage;

const MainContainer = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: row;
`;

const Left = styled.div`
    margin-top: 40px;
    width: 15%;
    height: 100vh;
    background-color: white;
    float: left;
    display: flex;
    flex-direction: column;
    margin-left: 50px;
`;

const LeftOpt = styled.div`
    padding: 10px;
    cursor: pointer;
    line-height: 18px;
    font-size: 20px;
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 500;
    background-color: ${props => props.active ? '#ccc' : 'transparent'}; // Додано стиль кнопки в залежності від активності
`;

const Right = styled.div`
    padding-left: 3%;
    margin-top: 40px;
    width: 79%;
    height: 100vh;
    background-color: white;
    float: left;
`;

const DivLine = styled.div`
    margin-top: 40px;
    height: 400px;
    width: 2px;
    background-color: #d6d6d6;
`;
