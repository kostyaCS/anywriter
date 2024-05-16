import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { rtdb } from "../firebase";
import { ref, onValue, get } from "firebase/database";
import ScrollContainer from "../components/ScrollContainer";
import {useAuth} from "../AuthContext";
import logo from "../images/logo.png";
import CreateButton from "../components/CreateButton";
import {useNavigate} from "react-router-dom";
import ProfileButton from "../components/profile/ProfileButton";


const MainPage = () => {
    const [allData, setAllData] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/main_page");
    }

    const handleProfileClick = () => {
        navigate("/profile");
    }

    const handleCreateClick = () => {
        navigate("/create_work");
    }


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
            <Header>
                <HeaderLeft>
                    <Logo src={logo} alt="Readly" onClick={handleLogoClick}/>
                </HeaderLeft>
                <HeaderRight>
                    <CreateButton onClick={handleCreateClick} text="Create writing"/>
                    <ProfileButton onClick={handleProfileClick} text="Profile"/>
                </HeaderRight>
            </Header>
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

// ------------- Header -------------
const Header = styled.div`
    height: 74px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    background-color: #FDF7F4;
    width: 90vw;
    padding: 5px 5vw;
`;

const HeaderText = styled.div`
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.1s ease-in-out;

    &:hover {
        color: #915F6D;
    }
`;

const HeaderLeft = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    width: 80px;
    height: auto;
    cursor: pointer;
`;

const HeaderRight = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
    justify-content: center;
    align-items: center;
`;

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
    font-size: 20px;
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
