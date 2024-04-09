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

    useEffect(() => {
        const fetchLikedWorks = async () => {
            if (activeTab === "liked" && currentUser) {
                const likesRef = firebaseRef(rtdb, `users/${currentUser.uid}/liked`);
                const snapshot = await get(likesRef);
                if (snapshot.exists()) {
                    const likedIds = snapshot.val() || [];

                    // Fetch the details of the liked works from the works node
                    const worksPromises = likedIds.map(id => {
                        const workRef = firebaseRef(rtdb, `works/${id}`);
                        return get(workRef);
                    });

                    const worksSnapshots = await Promise.all(worksPromises);
                    const fetchedLikedWorks = worksSnapshots.map(snap => {
                        if (snap.exists()) {
                            return { id: snap.key, ...snap.val() };
                        } else {
                            return null;
                        }
                    }).filter(Boolean);

                    setLikedWorks(fetchedLikedWorks);
                } else {
                    setLikedWorks([]);
                }
            }
        };

        fetchLikedWorks();
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
                            <p>Saved Writings...</p>

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
