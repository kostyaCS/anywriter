import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderDef from "../components/Header";
import { rtdb } from "../firebase";
import { ref, onValue } from "firebase/database";
import ScrollContainer from "../components/ScrollContainer";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

const MainPage = () => {
    const [allData, setAllData] = useState([]);
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


    return (
        <>
            <HeaderDef />
            <MainContainer>
                <Left>
                    <LeftOpt>
                        Liked
                    </LeftOpt>
                    <LeftOpt>
                        All
                    </LeftOpt>
                    <LeftOpt>
                        Saved
                    </LeftOpt>
                </Left>
                <Right>

                    <ScrollContainer text={allData} />
                </Right>
            </MainContainer>
        </>
    );
};

export default MainPage;


const MainContainer = styled.div`
    overflow: hidden;
`;

const Left = styled.div`
    width: 20%;
    height: 100vh;
    background-color: #f5f5f5;
    float: left;
`;

const LeftOpt = styled.div`
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
`;

const Right = styled.div`
    width: 80%;
    height: 100vh;
    background-color: #f0f0f0;
    float: left;
`;

