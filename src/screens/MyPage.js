import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import HeaderDef from "../components/Header";
import styled from "styled-components";
import Avatar from "../images/avatar.png";

const MyPage = () => {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState("saved");

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
                            // Implement or import your Saved writings component here
                        ) : (
                            <p>Liked Writings...</p>
                            // Implement or import your Liked writings component here
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
    width: 100px; // Adjust based on your design
    height: 100px; // Adjust to keep the aspect ratio
    border-radius: 50%; // Circular avatar
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
    // Styles for your tab content
`;

