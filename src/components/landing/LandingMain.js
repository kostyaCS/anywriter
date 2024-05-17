import styled from 'styled-components';
import React from "react";
import spiral_star from "../../images/landing/spiral_star.png";
import ContinueButton from "../ContinueButton";
import three_stars from "../../images/landing/three_stars.png";
import scribble_pink from "../../images/landing/scribble_pink.png";
import {useNavigate} from "react-router-dom";

const LandingMain = () => {
    const navigate = useNavigate();

    const handleLogInClick = () => {
        navigate("/auth");
    }

    return (
        <Main>
            <MainContainer>
                <LeftImgContainer>
                    <StyledSpiralStarImage src={spiral_star} alt="spiral star" />
                </LeftImgContainer>
                <MainTextContainer>
                    <StyledMainText>Your Daily</StyledMainText>
                    <StyledMainTextPink>Writings</StyledMainTextPink>
                    <SimpleText>Experience the magic of storytelling with our daily dose of captivating narratives.</SimpleText>
                    <ContinueButton onClick={handleLogInClick} text="Get Started"/>
                </MainTextContainer>
                <RightImgContainer>
                    <StyledStarsImage src={three_stars} alt="three stars" />
                </RightImgContainer>
            </MainContainer>
            <ScribbleImg src={scribble_pink} alt="scribble pink" />
        </Main>
    )
};

export default LandingMain;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FDF7F4;
    width: 100vw;
    height: 590px;

    @media (max-width: 863px){
        height: 570px;
    }

    @media (max-width: 740px){
        height: 650px;
    }

    @media (max-width: 550px){
        height: 635px;
    }

    @media (max-width: 430px){
        height: 595px;
    }

    @media (max-width: 345px){
        height: 635px;
    }
`;

// ------------- Main Container -------------
const MainContainer = styled.div`
    width: 100vw;
    display: flex;
    gap: 20px;
    flex-direction: row;
    justify-content: space-between;
`;

const MainTextContainer = styled.div`
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const StyledMainText = styled.h1`
    font-size: 70px;
    margin: 80px 0 0 0;
    text-align: center;
    z-index: 1;

    @media (max-width: 863px){
        font-size: 65px;
    }

    @media (max-width: 550px){
        font-size: 60px;
    }

    @media (max-width: 430px) {
        font-size: 50px;
    }
`;

const StyledMainTextPink = styled.h1`
    font-size: 70px;
    color: #C9A9A6;
    margin: 0 0 0 0;
    z-index: 1;

    @media (max-width: 863px){
        font-size: 65px;
    }
    
    @media (max-width: 550px){
        font-size: 60px;
    }

    @media (max-width: 430px) {
        font-size: 50px;
    }
`;

const SimpleText = styled.div`
    display: flex;
    text-align: center;
    margin: 40px 0 40px 0;
    width: 374px;

    @media (max-width: 430px){
        width: 344px;
        font-size: 14px;
    }

    @media (max-width: 345px){
        width: 200px;
    }
`;

// ------------- Images -------------
const LeftImgContainer = styled.div`
    height: 400px;
    width: 230px;
    overflow: hidden;
    direction: rtl;
    margin-top: 10px;

    @media (max-width: 863px) {
        margin-top: 5px;
    }
`;

const StyledSpiralStarImage = styled.img`
    height: 430px;
    width: auto;
`;

const RightImgContainer = styled.div`
    width: 230px;
    overflow: hidden;
    margin-top: 115px;

    @media (max-width: 863px) {
        margin-top: 105px;
    }
`;

const StyledStarsImage = styled.img`
    height: 170px;
    width: auto;
`;

const ScribbleImg = styled.img`
    height: 150px;
    margin-top: 70px;
    margin-left: 30px;
    z-index: 1;
`;
