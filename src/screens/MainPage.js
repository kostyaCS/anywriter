import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { rtdb } from "../firebase";
import { ref, onValue, get } from "firebase/database";
import ScrollContainer from "../components/ScrollContainer";
import {useAuth} from "../AuthContext";
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";

const MainPage = () => {
    const [allData, setAllData] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const { currentUser } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (!currentUser) return;

        const fetchWorks = async () => {
            if (activeTab === "all" || activeTab === "your-writings") {
                const worksRef = ref(rtdb, "works");
                const snapshot = await get(worksRef);
                if (!snapshot.exists()) {
                    setAllData([]);
                    return;
                }

                const worksData = snapshot.val();
                let allWorks = [];
                if (activeTab === "all") {
                    allWorks = Object.keys(worksData).map(key => ({
                        id: key,
                        ...worksData[key]
                    }));
                } else {
                    allWorks = Object.keys(worksData).map(key => {
                        if (worksData[key].userId === currentUser.uid) {
                            return {
                                id: key,
                                ...worksData[key]
                            };
                        }
                    }).filter(work => work !== undefined);
                }
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
        if (!currentUser || activeTab === "all" || activeTab === "your-writings") return;

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
        });
        return () => {
        };
    }, []);


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Main>
            <Header />
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
                        onClick={() => handleTabClick("your-writings")}
                        active={activeTab === "your-writings"}
                    >
                        Your writings
                    </LeftOpt>
                </Left>
                <DivLine />
                <Right>
                    <ScrollContainer text={allData} />
                </Right>
            </MainContainer>
        </Main>
    );
};

export default MainPage;

const Main = styled.div`
    font-family: 'Montserrat Alternates', sans-serif;
    overflow: hidden;
    height: 100vh;
`;


const MainContainer = styled.div`
    overflow: hidden;
    display: flex;
    gap: 5px;
    flex-direction: row;
    margin-top: 30px;
    width: 100%;
    
    @media (max-width: 800px) {
        flex-direction: column;
        margin-top: 10px;
    }
`;

const Left = styled.div`
    min-width: 140px;
    height: max-content;
    background-color: white;
    float: left;
    display: flex;
    flex-direction: column;
    margin-left: 60px;
    margin-right: 10px;
    flex-wrap: wrap;
    
    @media (max-width: 800px) {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
        margin-top: 10px;
        height: 10%;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        gap: 5px;
    }
`;

const LeftOpt = styled.div`
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 500;
    background-color: ${props => props.active ? '#e3e3e3' : 'transparent'};
    
    @media (max-width: 800px){
        font-size: 18px;
    }
`;

const Right = styled.div`
    margin-left: 10px;
    //width: 80%;
    //width: 79%;
    //height: 100vh;
    background-color: white;
    float: left;
    
    @media (max-width: 800px) {
        width: 100%;
        margin-top: 10px;
        height: 90%;
        padding-left: 0;
    }
`;

const DivLine = styled.div`
    height: 400px;
    width: 2px;
    background-color: #d6d6d6;
    
    @media (max-width: 800px) {
        display: none;
    }
`;
