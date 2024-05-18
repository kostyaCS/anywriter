import styled from "styled-components";
import lines from "../../images/landing/lines.png";
import cover from "../../images/landing/cover.png";
import avatar_5 from "../../images/landing/avatar_5.png";
import LandingButton from "./LandingButton";
import scribble_black from "../../images/landing/scribble_black.png";
import React from "react";
import { useNavigate } from "react-router-dom";

const RecentWriting = () => {
    const navigate = useNavigate();

    const handleLogInClick = () => {
        navigate("/auth");
    };

    return (
        <Main>
            <StyledReadersText>Recent Writings</StyledReadersText>
            <RecentWritingContainer>
                <StyledLinesImg src={lines} alt="lines" />
                <RecentWritingCard>
                    <RecentWritingMain>
                        <FrameImgContainer>
                            <StyledRecentWritingImage src={cover} alt="cover" />
                        </FrameImgContainer>
                        <RecentWritingMainTextContainer>
                            <RecentWritingMainDate>13.04.2024</RecentWritingMainDate>
                            <RecentWritingMainTitle>
                                The Wanderer's Tale
                            </RecentWritingMainTitle>
                            <HorizontalLine />
                            <RecentWritingMainText>
                                In the quiet of the morning, when the world is still shrouded in
                                the gentle embrace of dawn, I find solace in the rhythmic
                                cadence of my footsteps against the earth. Each step is a
                                whisper, a testament to the journey that lies ahead.
                            </RecentWritingMainText>
                        </RecentWritingMainTextContainer>
                    </RecentWritingMain>
                    <RecentWritingAdditional>
                        <RecentWritingAdditionalTags>
                            <RecentWritingAdditionalTag>adventure</RecentWritingAdditionalTag>
                            <RecentWritingAdditionalTag>traveler</RecentWritingAdditionalTag>
                            <RecentWritingAdditionalTag>nature</RecentWritingAdditionalTag>
                        </RecentWritingAdditionalTags>
                        <RecentWritingAdditionalCreator>
                            Created by:
                            <StyledAvatarImage src={avatar_5} alt="avatar" />
                        </RecentWritingAdditionalCreator>
                    </RecentWritingAdditional>
                </RecentWritingCard>
            </RecentWritingContainer>
            <LandingButton onClick={handleLogInClick} text="BROWSE ALL WRITINGS" />
            <ScribbleImg src={scribble_black} alt="scribble black" />
        </Main>
    );
};

export default RecentWriting;

const Main = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fdf7f4;
  margin-top: -75px;
  padding-top: 150px;
`;

const StyledReadersText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 863px) {
    font-size: 45px;
    width: 370px;
  }

  @media (max-width: 550px) {
    font-size: 40px;
  }

  @media (max-width: 430px) {
    font-size: 30px;
  }
`;

const RecentWritingContainer = styled.div`
  margin: 0 0 80px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const RecentWritingCard = styled.div`
  width: 65vw;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 2px solid #000000;
  border-radius: 12px;
  -webkit-box-shadow: 10px 10px 0 0 rgba(129, 173, 200, 0.75);
  -moz-box-shadow: 10px 10px 0 0 rgba(129, 173, 200, 0.75);
  box-shadow: 10px 10px 0 0 rgba(129, 173, 200, 0.75);
`;

const StyledLinesImg = styled.img`
  height: 80px;
  margin-right: -70px;

  @media (max-width: 430px) {
    height: 50px;
    margin-right: -30px;
  }
`;

const RecentWritingMain = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;

const FrameImgContainer = styled.div`
  width: 250px;
  height: 290px;
  overflow: hidden;
  border-radius: 8px;

  @media (max-width: 430px) {
    display: none;
  }
`;

const StyledRecentWritingImage = styled.img`
  height: 300px;
`;

const RecentWritingMainTextContainer = styled.div`
  width: 100%;
`;

const RecentWritingMainDate = styled.h4``;

const RecentWritingMainTitle = styled.h3`
  color: #915f6d;
`;

const HorizontalLine = styled.div`
  background-color: #4d4d4d;
  height: 0.1mm;
  width: 90%;
  margin-bottom: 15px;
`;

const RecentWritingMainText = styled.div``;

const RecentWritingAdditional = styled.div`
  width: 100%;
  display: flex;
  gap: 18px;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 0 0;
`;

const RecentWritingAdditionalTags = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 430px) {
    font-size: 12px;
  }
`;

const RecentWritingAdditionalTag = styled.div`
  background-color: white;
  border: 1px solid #4d4d4d;
  border-radius: 4px;
  padding: 6px 10px;
`;

const RecentWritingAdditionalCreator = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
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
