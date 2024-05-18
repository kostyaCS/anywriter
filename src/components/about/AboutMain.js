import styled from "styled-components";
import React from "react";
import spiral_star from "../../images/landing/spiral_star.png";
import ContinueButton from "../ContinueButton";
import three_stars from "../../images/landing/three_stars.png";
import { useNavigate } from "react-router-dom";

const AboutMain = () => {
    const navigate = useNavigate();

    const handleLogInClick = () => {
        navigate("/auth");
    };

    return (
        <Main>
            <MainContainer>
                <LeftImgContainer>
                    <StyledSpiralStarImage src={spiral_star} alt="spiral star" />
                </LeftImgContainer>
                <MainTextContainer>
                    <StyledMainText>About</StyledMainText>
                    <StyledMainTextPink>Readly</StyledMainTextPink>
                    <SimpleText>
                        We believe in the power of words to inspire, connect, and transform.
                        Dive into a vibrant community where writers and readers come
                        together to explore diverse perspectives, share their stories, and
                        ignite their creativity.
                    </SimpleText>
                    <ContinueButton onClick={handleLogInClick} text="Get Started" />
                </MainTextContainer>
                <RightImgContainer>
                    <StyledStarsImage src={three_stars} alt="three stars" />
                </RightImgContainer>
            </MainContainer>
            <MainNumbers>
                <MainNumbersCard>
                    <MainNumbersCardTitle>76K</MainNumbersCardTitle>
                    <MainNumbersCardText>Community Members</MainNumbersCardText>
                </MainNumbersCard>
                <MainNumbersCard>
                    <MainNumbersCardTitle>128K</MainNumbersCardTitle>
                    <MainNumbersCardText>Writings</MainNumbersCardText>
                </MainNumbersCard>
                <MainNumbersCard>
                    <MainNumbersCardTitle>59K</MainNumbersCardTitle>
                    <MainNumbersCardText>Daily Readers</MainNumbersCardText>
                </MainNumbersCard>
            </MainNumbers>
        </Main>
    );
};

export default AboutMain;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fdf7f4;
  width: 100vw;
  height: max-content;
`;

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

  @media (max-width: 863px) {
    font-size: 65px;
  }

  @media (max-width: 550px) {
    font-size: 60px;
  }

  @media (max-width: 430px) {
    font-size: 50px;
  }
`;

const StyledMainTextPink = styled.h1`
  font-size: 70px;
  color: #c9a9a6;
  margin: 0;
  z-index: 1;

  @media (max-width: 863px) {
    font-size: 65px;
  }

  @media (max-width: 550px) {
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

  @media (max-width: 430px) {
    width: 344px;
    font-size: 14px;
  }

  @media (max-width: 345px) {
    width: 200px;
  }
`;

const MainNumbers = styled.div`
  display: flex;
  gap: 60px;
  justify-content: center;
  align-items: center;
  margin: 60px 15px -65px 15px;
  z-index: 2;
  text-align: center;
  flex-wrap: wrap;
`;

const MainNumbersCard = styled.div`
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 60px;
  background-color: white;
  border: 2px solid black;
  border-radius: 5px;
  font-family: "Montserrat Alternates", sans-serif;
  -webkit-box-shadow: 5px 5px 0 0 rgba(145, 95, 109, 1);
  -moz-box-shadow: 5px 5px 0 0 rgba(145, 95, 109, 1);
  box-shadow: 5px 5px 0 0 rgba(145, 95, 109, 1);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 6px 6px 0 0 rgba(145, 95, 109, 1);
  }

  @media (max-width: 430px) {
    height: 140px;
    padding: 0 30px;
  }
`;

const MainNumbersCardTitle = styled.h3`
  font-size: 55px;
  margin: 20px 0 5px 0;

  @media (max-width: 863px) {
    font-size: 50px;
  }

  @media (max-width: 550px) {
    font-size: 45px;
  }

  @media (max-width: 430px) {
    font-size: 40px;
  }
`;

const MainNumbersCardText = styled.p``;

const LeftImgContainer = styled.div`
  height: 400px;
  width: 230px;
  overflow: hidden;
  direction: rtl;
  margin-top: 10px;

  @media (max-width: 863px) {
    margin-top: -10px;
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
    margin-top: 95px;
  }

  @media (max-width: 430px) {
    margin-top: 70px;
  }
`;

const StyledStarsImage = styled.img`
  height: 170px;
  width: auto;
`;
