import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import BlueButton from "../components/BlueButton";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../firebase";
import { useNavigate } from "react-router-dom";

const MyWorks = () => {
    const { currentUser } = useAuth();
    const [userWorks, setUserWorks] = useState([]);
    const navigate = useNavigate(); // useNavigate should be called inside the component

    useEffect(() => {
        if (!currentUser) return;

        const worksRef = ref(rtdb, `users/${currentUser.uid}/works`);
        onValue(worksRef, (snapshot) => {
            const works = [];
            snapshot.forEach((childSnapshot) => {
                const work = childSnapshot.val();
                works.push(work);
            });
            setUserWorks(works);
        });

        // Cleanup function
        return () => {
            // Unsubscribe from database listener when component unmounts
            // This prevents potential memory leaks
            // For real-time updates, consider using real-time listeners instead of get()
        };
    }, [currentUser]);

    const handleRedirect = () => {
        navigate("/create_work");
    }

    return (
        <>
            <Header>
                <HeaderText>
                    Мої твори
                </HeaderText>
            </Header>
            <MainContainer>
                {currentUser?.email}
                <WorkList>
                    {userWorks.map((work, index) => (
                        <WorkItem key={index}>
                            <div dangerouslySetInnerHTML={{ __html: work.content }} />
                            {/* Additional work details can be displayed here */}
                        </WorkItem>
                    ))}
                </WorkList>
            </MainContainer>
            <BlueButton onClick={handleRedirect} text="Створити твір"/>
        </>
    );
}

export default MyWorks;


const Header = styled.div`
    padding-top: 20px;
    gap: 80px;
    padding-bottom: 20px;
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const HeaderText = styled.div`
    font-weight: 300;
    cursor: pointer;
    font-size: 16px;
    line-height: 18px;
`;

const MainContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const WorkList = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const WorkItem = styled.div`
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
`;

const WorkContent = styled.div`
    font-size: 16px;
    line-height: 20px;
`;