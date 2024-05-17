import styled from 'styled-components';
import React from "react";
import lines from "../../images/landing/lines_left.png";
import scribble_black from "../../images/landing/scribble_black.png";

const AboutComponent = () => {
    return (
        <About>
            <StyledAboutText>
                <StyledLinesImg src={lines} alt="lines" />
                About and History
            </StyledAboutText>
            <AboutImgContainer>
                <AboutImgCardText>Founded with a vision to inspire, Readly has been a beacon of creativity and knowledge since its inception. Our journey is fueled by the passion to create a platform where stories are shared, ideas flourish, and imaginations soar.</AboutImgCardText>
                <AboutImgCardText>At the heart of Readly lies a commitment to diversity, inclusivity, and the celebration of voices from all walks of life. We believe in the transformative power of storytelling to unite communities, spark conversations, and ignite change.</AboutImgCardText>
            </AboutImgContainer>
            <ScribbleImg src={scribble_black} alt="scribble black" />
        </About>
    )
};

export default AboutComponent;

const About = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 100vw;
    height: max-content;
`;

const StyledAboutText = styled.h2`
    width: 90%;
    margin-top: 140px;
    font-size: 50px;
    text-align: center;

    @media (max-width: 863px){
        font-size: 45px;
    }

    @media (max-width: 550px){
        font-size: 40px;
    }

    @media (max-width: 430px) {
        width: 85%;
        font-size: 30px;
    }
`;

const AboutImgContainer = styled.div`
    width: 85vw;
    display: flex;
    gap: 50px;
    justify-content: space-around;
    align-items: flex-start;
    text-align: center;

    @media (max-width: 836px) {
        flex-direction: column;
        align-items: center;
        width: 100vw;
    }
`;

const AboutImgCardText = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 550px) {
        width: 80%;
    }
`;

const ScribbleImg = styled.img`
    height: 150px;
    margin-top: 50px;
    margin-left: 30px;
    z-index: 1;

    @media (max-width: 890px) {
        margin-top: 65px;
    }
`;

const StyledLinesImg = styled.img`
    height: 65px;
    margin: 0 -10px 20px 0;

    @media (max-width: 430px) {
        margin: 0 -15px 0 0;
    }
`;
