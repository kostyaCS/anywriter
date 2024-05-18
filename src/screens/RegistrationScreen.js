import "react-datepicker/dist/react-datepicker.css";
import logo from "../images/logo.png";
import spiral from "../images/spiral.png";
import three_diamonds from "../images/three_diamonds.png";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RegistrationMain from "../components/registration/RegistrationMain";

const RegistrationScreen = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate("/");
        window.scroll({
            top: 0,
        });
    };

    return (
        <>
            <Logo src={logo} alt="Readly" onClick={handleLogoClick} />
            <Main>
                <StyledSpiralImage src={spiral} alt="spiral" />
                <RegistrationMain />
                <StyledStarsImage src={three_diamonds} alt="three diamonds" />
            </Main>
        </>
    );
};

export default RegistrationScreen;

const Logo = styled.img`
  width: 80px;
  height: auto;
  cursor: pointer;
  padding: 9px 5vw;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  font-family: "Montserrat Alternates", sans-serif;
  overflow-x: hidden;

  @media (max-width: 800px) {
    align-items: center;
    justify-content: center;
    gap: 90px;
  }
`;

const StyledSpiralImage = styled.img`
  width: 75px;
  height: auto;
  margin-bottom: 20vh;
`;

const StyledStarsImage = styled.img`
  width: 65px;
  height: auto;
  margin-bottom: 55vh;
`;
