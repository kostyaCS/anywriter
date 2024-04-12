import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import HeaderDef from "../components/Header";
import styled from "styled-components";
import Avatar from "../images/avatar.png";
import {ref as firebaseRef, get } from "firebase/database"
import { rtdb } from "../firebase";


const MyPage = () => {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState("saved");
    const [likedWorks, setLikedWorks] = useState([]);
    const [savedWorks, setSavedWorks] = useState([]);

    useEffect(() => {
        const fetchWorks = async () => {
            if (!currentUser) return;

            const worksRef = firebaseRef(rtdb, `users/${currentUser.uid}/${activeTab}`);
            const snapshot = await get(worksRef);
            if (!snapshot.exists()) {
                activeTab === "liked" ? setLikedWorks([]) : setSavedWorks([]);
                return;
            }

            const ids = snapshot.val() || [];
            const worksPromises = ids.map(id => {
                const workRef = firebaseRef(rtdb, `works/${id}`);
                return get(workRef);
            });

            const worksSnapshots = await Promise.all(worksPromises);
            const fetchedWorks = worksSnapshots.map(snap => {
                if (snap.exists()) {
                    return { id: snap.key, ...snap.val() };
                } else {
                    return null;
                }
            }).filter(Boolean);

            activeTab === "liked" ? setLikedWorks(fetchedWorks) : setSavedWorks(fetchedWorks);
        };
        fetchWorks();
    }, [activeTab, currentUser]);


    return (
        <>
            <HeaderDef />
            <ContentWrapper>
                <Left>
                    <StyledAvatar src={Avatar} alt="User Avatar" />
                    <Email>{currentUser?.email}</Email>
                </Left>
                <Right>
                    <Tabs>
                        <Tab
                            isActive={activeTab === "saved"}
                            onClick={() => setActiveTab("saved")}
                        >
                            Saved
                        </Tab>
                        <Tab
                            isActive={activeTab === "liked"}
                            onClick={() => setActiveTab("liked")}
                        >
                            Liked
                        </Tab>
                    </Tabs>
                    <TabContent>
                        {activeTab === "saved" ? (
                            <>
                                {savedWorks.length > 0 ? (
                                    <List>
                                        {savedWorks.map(work => (
                                            <ListItem key={work.id}>
                                                <Text>{work.title}</Text>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <p>You have no saved writings.</p>
                                )}
                            </>
                        ) : (
                            <>
                                {likedWorks.length > 0 ? (
                                    <List>
                                        {likedWorks.map(work => (
                                            <ListItem key={work.id}>
                                                <Text>{work.title}</Text>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <p>You have no liked writings.</p>
                                )}
                            </>
                        )}
                    </TabContent>
                </Right>
            </ContentWrapper>
        </>
    );
};

export default MyPage;

const ContentWrapper = styled.div`
    display: flex;
`;

const Left = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`;

const Email = styled.p`
    color: gray;
`;

const Right = styled.div`
    width: 50%;
`;

const StyledAvatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const Tab = styled.button`
    padding: 10px;
    cursor: pointer;
    border: none;
    background-color: ${props => props.isActive ? '#ccc' : 'transparent'};
    border-bottom: ${props => props.isActive ? '2px solid blue' : 'none'};
`;

const TabContent = styled.div`
`;

const List = styled.ul`
`;

const ListItem = styled.li`
`;

const Text = styled.div`
`;
