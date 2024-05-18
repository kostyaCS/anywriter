import React from "react";
import styled from "styled-components";
import "../App.css";
import "react-international-phone/style.css";
import Footer from "../components/Footer";
import LandingHeader from "../components/landing/LandingHeader";
import AboutMain from "../components/about/AboutMain";
import AboutComponent from "../components/about/AboutComponent";
import Sponsors from "../components/about/Sponsors";
import GetInTouch from "../components/about/GetInTouch";

const AboutScreen = () => {
    return (
        <Container>
            <LandingHeader aboutButtonColor={"#915F6D"} />
            <AboutMain />
            <AboutComponent />
            <Sponsors />
            <GetInTouch />
            <Footer backgroundColor={"#FDF7F4"} />
        </Container>
    );
};

export default AboutScreen;

const Container = styled.div`
  font-family: "Montserrat Alternates", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;
