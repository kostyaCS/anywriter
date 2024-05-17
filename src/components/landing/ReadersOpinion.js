import styled from 'styled-components';
import scribble_black from "../../images/landing/scribble_black.png";
import React from "react";
import circle_pink from "../../images/landing/circle_pink.png";
import avatar_2 from "../../images/landing/avatar_2.png";
import spotify from "../../images/landing/spotify.png";
import avatar_3 from "../../images/landing/avatar_3.png";
import google_podcast from "../../images/landing/google_podcast.png";
import avatar_4 from "../../images/landing/avatar_4.png";
import apple_podcast from "../../images/landing/apple_podcast.png";

const ReadersOpinion = () => {

    return (
        <Main>
            <StyledReadersText>
                <StyledCircleImage src={circle_pink} alt="circle pink" />
                What our readers say
            </StyledReadersText>
            <StyledReadersTextSmall>Their experience throughout the platform</StyledReadersTextSmall>
            <ReadersCardContainer>
                <ReadersCard>
                    <StyledAboutReviewTextPink>“</StyledAboutReviewTextPink>
                    <StyledReadersCardText>I found amazing content on various topics. The community here is incredibly supportive!</StyledReadersCardText>
                    <StyledReadersPersonTextContainer>
                        <StyledAboutPersonText>
                            <StyledAvatarImage src={avatar_2} alt="avatar" />
                            Luna lovegood,
                        </StyledAboutPersonText>
                        <StyledAboutPersonText>
                            <StyledSpotifyImage src={spotify} alt="spotify" />
                            <b>Spotify</b>
                        </StyledAboutPersonText>
                    </StyledReadersPersonTextContainer>
                </ReadersCard>
                <ReadersCard>
                    <StyledAboutReviewTextPink>“</StyledAboutReviewTextPink>
                    <StyledReadersCardText>Readly has become my go-to platform for discovering insightful articles. The sense of community here is truly inspiring.</StyledReadersCardText>
                    <StyledReadersPersonTextContainer>
                        <StyledAboutPersonText>
                            <StyledAvatarImage src={avatar_3} alt="avatar" />
                            Emily Blunt,
                        </StyledAboutPersonText>
                        <StyledAboutPersonText>
                            <StyledSpotifyImage src={google_podcast} alt="spotify" />
                            <b>Google Podcast</b>
                        </StyledAboutPersonText>
                    </StyledReadersPersonTextContainer>
                </ReadersCard>
                <ReadersCard>
                    <StyledAboutReviewTextPink>“</StyledAboutReviewTextPink>
                    <StyledReadersCardText>I've found a treasure trove of engaging content on Readly. It's like having a literary oasis at my fingertips.</StyledReadersCardText>
                    <StyledReadersPersonTextContainer>
                        <StyledAboutPersonText>
                            <StyledAvatarImage src={avatar_4} alt="avatar" />
                            Mia Winters,
                        </StyledAboutPersonText>
                        <StyledAboutPersonText>
                            <StyledSpotifyImage src={apple_podcast} alt="spotify" />
                            <b>Apple Podcast</b>
                        </StyledAboutPersonText>
                    </StyledReadersPersonTextContainer>
                </ReadersCard>
            </ReadersCardContainer>
            <ScribbleImg src={scribble_black} alt="scribble black" />
        </Main>
    )
};

export default ReadersOpinion;

const Main = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EDF3F7;
    margin-top: -75px;
    padding-top: 150px;
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

const StyledCircleImage = styled.img`
    height: 65px;
    margin-top: -50px;

    @media (max-width: 863px){
        height: 60px;
    }

    @media (max-width: 550px){
        height: 55px;
    }

    @media (max-width: 430px) {
        height: 50px;
        margin: -50px -50px 0 0;
    }
`;

const StyledReadersTextSmall = styled.div`
    font-size: 20px;
    width: 70vw;
    text-align: center;

    @media (max-width: 550px){
        font-size: 18px;
    }

    @media (max-width: 430px) {
        font-size: 14px;
    }
`;

const ReadersCardContainer = styled.div`
    width: 90vw;
    display: flex;
    gap: 30px;
    overflow-x: scroll;
    margin: 70px 0 0 10vw;
`;

const ReadersCard = styled.div`
    min-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    padding: 35px;
    border-radius: 8px;

    @media (max-width: 863px) {
        min-width: 380px;
    }
`;

const StyledReadersPersonTextContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 15px;
    margin-top: 30px;
    flex-wrap: wrap;
`;

const StyledReadersCardText = styled.h6`
    font-size: 23px;
    font-weight: 500;
    margin: 0;

    @media (max-width: 863px){
        font-size: 21px;
    }

    @media (max-width: 550px){
        font-size: 18px;
    }

    @media (max-width: 430px) {
        font-size: 16px;
    }
`;

const StyledReadersText = styled.div`
    display: flex;
    justify-content: center;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
    width: 80%;

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
