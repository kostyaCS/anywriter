import styled from 'styled-components';
import scribble_black from "../../images/landing/scribble_black.png";
import React from "react";
import spotify from "../../images/landing/spotify.png";
import man_thinking from "../../images/landing/man_thinking.png";
import bulb from "../../images/landing/bulb.png";
import spiral from "../../images/spiral.png";
import avatar from "../../images/landing/avatar.png";
import black_star from "../../images/landing/black_star.png";
import ContinueButton from "../ContinueButton";
import {useNavigate} from "react-router-dom";


const AboutComponent = () => {
    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate("/about");
        window.scroll({
            top: 0
        });
    }

    return (
        <Main>
            <StyledAboutText>Read. Discuss. Get inspired by every minute of it.</StyledAboutText>
            <AboutImgContainer>
                <AboutImgCard>
                    <StyledManImage src={man_thinking} alt="man thinking" />
                    <AboutImgCardText>Participate in thought-provoking discussions, absorb inspiring perspectives, and unlock boundless potential for your writing journey.</AboutImgCardText>
                </AboutImgCard>
                <AboutImgCard>
                    <StyledBulbImage src={bulb} alt="bulb" />
                    <AboutImgCardText>Dive into a vibrant community where people come together to explore diverse perspectives, share their stories, and ignite their creativity.</AboutImgCardText>
                </AboutImgCard>
            </AboutImgContainer>
            <AboutReviewContainer>
                <StyledSpiralImage src={spiral} alt="spiral" />
                <AboutReviewMain>
                    <StyledAboutReviewTextPink>“</StyledAboutReviewTextPink>
                    <StyledAboutReviewText>Readly revolutionized my reading. Diverse topics and a supportive community make it essential.</StyledAboutReviewText>
                    <StyledAboutPersonTextContainer>
                        <StyledAboutPersonText>
                            <StyledAvatarImage src={avatar} alt="avatar" />
                            John Smith,
                        </StyledAboutPersonText>
                        <StyledAboutPersonText>
                            <StyledSpotifyImage src={spotify} alt="spotify" />
                            <b>Social Community Manager</b>
                        </StyledAboutPersonText>
                    </StyledAboutPersonTextContainer>
                </AboutReviewMain>
                <StyledBlackStarImage src={black_star} alt="black star" />
            </AboutReviewContainer>
            <ContinueButton onClick={handleReadMore} text="Read more"/>
            <ScribbleImg src={scribble_black} alt="scribble black" />
        </Main>
    )
};

export default AboutComponent;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 100vw;
    height: max-content;
`;

const StyledAboutText = styled.h2`
    width: 70vw;
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
        font-size: 30px;
    }
`;

const AboutImgContainer = styled.div`
    width: 85vw;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    text-align: center;

    @media (max-width: 836px) {
        flex-direction: column;
        align-items: center;
    }
`;

const AboutImgCard = styled.div`
    width: 420px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledManImage = styled.img`
    width: 275px;
    margin: 40px;

    @media (max-width: 430px) {
        width: 200px;
    }
`;

const StyledBulbImage = styled.img`
    width: 255px;
    margin: 50px;

    @media (max-width: 430px) {
        width: 180px;
    }
`;

const AboutImgCardText = styled.div`
    @media (max-width: 430px) {
        width: 75%;
        font-size: 14px;
    }
`;

const AboutReviewContainer = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 90px 0 0 0;
`;

const StyledSpiralImage = styled.img`
    height: 100px;
    z-index: 1;
    margin: 170px -40px 0 0;

    @media (max-width: 915px) {
        margin: 230px -40px 0 0;
    }

    @media (max-width: 430px) {
        height: 80px;
        margin: 230px -35px 0 0;
    }
`;

const StyledBlackStarImage = styled.img`
    height: 110px;
    z-index: 1;
    margin: -38px 0 0 -60px;

    @media (max-width: 430px) {
        height: 90px;
    }
`;

const AboutReviewMain = styled.div`
    width: 60vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F7EDE8;
    border-radius: 8px;
    padding: 40px;
    margin-bottom: 30px;
`;

const StyledAboutReviewText = styled.h4`
    font-size: 35px;
    margin: 0;

    @media (max-width: 430px) {
        font-size: 21px;
    }
`;

const StyledAboutPersonTextContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin-top: 30px;

    @media (max-width: 915px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
`;

const StyledAboutReviewTextPink = styled.h4`
    font-size: 80px;
    color: #C9A9A6;
    margin: 0 0 -20px 0;
`;

const StyledAboutPersonText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const StyledSpotifyImage = styled.img`
    height: 20px;
`;

const StyledAvatarImage = styled.img`
    height: 40px;
`;

const ScribbleImg = styled.img`
    height: 150px;
    margin-top: 70px;
    margin-left: 30px;
    z-index: 1;

    @media (max-width: 836px) {
        margin-top: 100px;
    }
`;
