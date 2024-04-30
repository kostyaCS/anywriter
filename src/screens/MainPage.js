import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderDef from "../components/Header";
import { rtdb } from "../firebase";
import { ref, onValue, get } from "firebase/database";
import ScrollContainer from "../components/ScrollContainer";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import ProfileComponent from "../components/ProfileComponent";
import {useAuth} from "../AuthContext";

const MainPage = () => {
    const [allData, setAllData] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const { currentUser } = useAuth();


    useEffect(() => {
        if (!currentUser) return;

        const fetchWorks = async () => {
            if (activeTab === "all") {
                const worksRef = ref(rtdb, "works");
                const snapshot = await get(worksRef);
                if (!snapshot.exists()) {
                    setAllData([]);
                    return;
                }

                const worksData = snapshot.val();
                const allWorks = Object.keys(worksData).map(key => ({
                    id: key,
                    ...worksData[key]
                }));
                setAllData(allWorks);
            } else {
                const userWorksRef = ref(rtdb, `users/${currentUser.uid}/${activeTab}`);
                const userSnapshot = await get(userWorksRef);
                if (!userSnapshot.exists()) {
                    setAllData([]);
                    return;
                }

                const ids = userSnapshot.val() || [];
                const worksPromises = ids.map(id => {
                    const workRef = ref(rtdb, `works/${id}`);
                    return new Promise((resolve) => {
                        onValue(workRef, (snapshot) => {
                            resolve(snapshot.exists() ? { id: snapshot.key, ...snapshot.val() } : null);
                        });
                    });
                });

                const fetchedWorks = await Promise.all(worksPromises);
                setAllData(fetchedWorks.filter(Boolean));
            }
        };
        fetchWorks();
    }, [activeTab, currentUser]);

    useEffect(() => {
        if (!currentUser || activeTab === "all") return;

        const userWorksRef = ref(rtdb, `users/${currentUser.uid}/${activeTab}`);
        const unsubscribe = onValue(userWorksRef, (snapshot) => {
            const ids = snapshot.val() || [];
            const updatedData = allData.filter(work => ids.includes(work.id));
            setAllData(updatedData);
        });

        return () => {
            unsubscribe();
        };
    }, [activeTab, currentUser, allData]);


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
            console.log(allContents)
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
                        active={activeTab === "all"}
                    >
                        All
                    </LeftOpt>
                    <LeftOpt
                        onClick={() => handleTabClick("liked")}
                        active={activeTab === "liked"}
                    >
                        Liked
                    </LeftOpt>
                    <LeftOpt
                        onClick={() => handleTabClick("saved")}
                        active={activeTab === "saved"}
                    >
                        Saved
                    </LeftOpt>
                    <LeftOpt
                        onClick={() => handleTabClick("profile")}
                        active={activeTab === "profile"}
                    >
                        Profile
                    </LeftOpt>
                </Left>
                <DivLine />
                <Right>
                    {activeTab === "profile" ? (
                        <ProfileComponent/>
                    ) : (
                        <ScrollContainer text={allData} />
                    )}
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
    margin-left: 60px;
    margin-right: 10px;
`;

const LeftOpt = styled.div`
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    line-height: 18px;
    font-size: 20px;
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 500;
    background-color: ${props => props.active ? '#e3e3e3' : 'transparent'}; // Додано стиль кнопки в залежності від активності
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
