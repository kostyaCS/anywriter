import React, {useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import HeaderDef from "../components/Header";
import {rtdb} from "../firebase";
import { ref, onValue } from "firebase/database";

const MainPage = () => {
    const { currentUser } = useAuth();
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        const worksRef = ref(rtdb, `works`);

        onValue(worksRef, (snapshot) => {
            const works = snapshot.val();
            const allContents = [];

            for (let id in works) {
                allContents.push(works[id].content);
            }

            setAllData(allContents);
        });
        return () => {
        };
    }, []);


    return (
        <>
            <HeaderDef/>
            <MainContainer>
                {allData.map((work, index) => (
                    <WorkItem key={index}>
                        <div dangerouslySetInnerHTML={{ __html: work }} />
                    </WorkItem>
                ))}
            </MainContainer>
        </>
    );
};

export default MainPage;


const MainContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
`;

const WorkItem = styled.div`
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
`;