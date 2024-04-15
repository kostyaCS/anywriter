import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { ref, onValue } from "firebase/database";
import { rtdb } from "../firebase";
import { useNavigate} from "react-router-dom";

const CheckWork = () => {
    const navigate = useNavigate();
    const { workId } = useParams();
    const [work, setWork] = useState(null);

    useEffect(() => {
        const workRef = ref(rtdb, `works/${workId}`);
        onValue(workRef, (snapshot) => {
            setWork(snapshot.val());
        });
    }, [workId]);

    const handleBackClick = () => {
        navigate("/main_page")
    }

    if (!work) {
        return <StyledDiv>Loading...</StyledDiv>;
    }

    return (
        <StyledContainer>
            <Title>{work.title}</Title>
            <StyledDiv dangerouslySetInnerHTML={{ __html: work.content }} />
            <StyledButton onClick={handleBackClick}>Back</StyledButton>
        </StyledContainer>
    );

}

export default CheckWork;


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    
`;

const StyledDiv = styled.div``;

const StyledButton = styled.button``;