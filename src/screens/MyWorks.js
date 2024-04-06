import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import BlueButton from "../components/BlueButton";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../firebase";
import { useNavigate } from "react-router-dom";
import HeaderDef from "../components/Header";

const MyWorks = () => {
    const { currentUser } = useAuth();
    const [userWorks, setUserWorks] = useState([]);
    const navigate = useNavigate();

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

        return () => {
        };
    }, [currentUser]);

    const handleRedirect = () => {
        navigate("/create_work");
    }

    return (
        <>
            <HeaderDef />
            <MainContainer>
                <WorkList>
                    {userWorks.map((work, index) => (
                        <WorkItem key={index}>
                            <div dangerouslySetInnerHTML={{ __html: work.content }} />
                        </WorkItem>
                    ))}
                </WorkList>
            </MainContainer>
            <BlueButton onClick={handleRedirect} text="Створити твір" />
        </>
    );
}

export default MyWorks;


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