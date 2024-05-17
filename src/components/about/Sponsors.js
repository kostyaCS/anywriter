import styled from 'styled-components';
import React from "react";
import circle_pink from "../../images/landing/circle_pink.png";
import spotify from "../../images/landing/spotify.png";
import google_podcast from "../../images/landing/google_podcast.png";
import apple_podcast from "../../images/landing/apple_podcast.png";
import scribble_black from "../../images/landing/scribble_black.png";

const Sponsors = () => {
    return (
        <Main>
            <StyledSponsorsText>
                <StyledCircleImage src={circle_pink} alt="circle pink" />
                Our Sponsors
            </StyledSponsorsText>
            <SponsorsCardContainer>
                <SponsorsCard>
                    <StyledSponsorsCardTitle>
                        <StyledSpotifyImage src={spotify} alt="spotify" />
                        Spotify
                    </StyledSponsorsCardTitle>
                    <HorizontalLine />
                    <StyledSponsorsCardText>As one of the leading platforms for streaming music and podcasts, Spotify's support underscores their commitment to promoting diverse voices and engaging storytelling. Together, we aim to amplify the reach of captivating narratives and foster a vibrant community of listeners and creators.</StyledSponsorsCardText>
                </SponsorsCard>
                <SponsorsCard>
                    <StyledSponsorsCardTitle>
                        <StyledSpotifyImage src={google_podcast} alt="spotify" />
                        Google Podcast
                    </StyledSponsorsCardTitle>
                    <HorizontalLine />
                    <StyledSponsorsCardText>With Google Podcast's backing, we are empowered to bring compelling stories to audiences worldwide. Their dedication to innovation and accessibility aligns perfectly with our mission to make quality content accessible to everyone.</StyledSponsorsCardText>
                </SponsorsCard>
                <SponsorsCard>
                    <StyledSponsorsCardTitle>
                        <StyledSpotifyImage src={apple_podcast} alt="spotify" />
                        Apple Podcast
                    </StyledSponsorsCardTitle>
                    <HorizontalLine />
                    <StyledSponsorsCardText>Apple Podcast, a platform known for its innovative approach to audio entertainment, is partnering with us to amplify diverse voices and foster a global community of writers and readers.</StyledSponsorsCardText>
                </SponsorsCard>
            </SponsorsCardContainer>
            <ScribbleImg src={scribble_black} alt="scribble black" />
        </Main>
    )
};

export default Sponsors;

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

const StyledSponsorsText = styled.div`
    display: flex;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    justify-content: center;
    align-items: center;

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

const StyledCircleImage = styled.img`
    height: 65px;
    margin-top: -80px;

    @media (max-width: 550px){
        height: 55px;
        margin-top: -60px;
    }

    @media (max-width: 430px){
        height: 45px;
        margin-top: -50px;
    }
`;

const SponsorsCardContainer = styled.div`
    width: 90vw;
    display: flex;
    gap: 30px;
    overflow-x: scroll;
    margin: 70px 0 0 10vw;
`;

const SponsorsCard = styled.div`
    min-width: 500px;
    display: flex;
    gap: 25px;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 35px;
    border: 2px solid #000000;
    border-radius: 8px;
    text-align: center;

    @media (max-width: 836px) {
        min-width: 400px;
    }

    @media (max-width: 550px) {
        min-width: 300px;
    }

    @media (max-width: 430px) {
        min-width: 250px;
    }

    @media (max-width: 320px) {
        min-width: 200px;
    }
`;

const StyledSponsorsCardText = styled.h6`
    font-size: 17px;
    font-weight: 400;
    margin: 0;

    @media (max-width: 550px) {
        font-size: 15px;
    }

    @media (max-width: 430px) {
        font-size: 14px;
    }
`;

const StyledSponsorsCardTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 30px;
    font-weight: 600;

    @media (max-width: 550px) {
        font-size: 25px;
    }

    @media (max-width: 430px) {
        font-size: 20px;
    }
`;

const StyledSpotifyImage = styled.img`
    height: 55px;

    @media (max-width: 550px) {
        height: 45px;
    }

    @media (max-width: 430px) {
        height: 35px;
    }
`;

const HorizontalLine = styled.div`
    background-color: #4D4D4D;
    height: 0.2mm;
    width: 90%;
    margin-bottom: 15px;
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
