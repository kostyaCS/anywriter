import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderDef from "../components/Header";
import { rtdb } from "../firebase";
import { ref, onValue } from "firebase/database";
import ScrollContainer from "../components/ScrollContainer";

const MainPage = () => {
    const [allData, setAllData] = useState([]);

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


    return (
        <>
            <HeaderDef />
            <MainContainer>
                <ScrollContainer text={allData} />
            </MainContainer>
        </>
    );
};

export default MainPage;


const MainContainer = styled.div`
    overflow: hidden;
`;

const WorkItem = styled.div`
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
`;