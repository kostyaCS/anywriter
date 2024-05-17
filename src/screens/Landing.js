import React from "react";
import styled from 'styled-components';
import "../App.css"
import Footer from "../components/Footer";
import RecentWriting from "../components/landing/RecentWriting";
import Membership from "../components/landing/Membership";
import ReadersOpinion from "../components/landing/ReadersOpinion";
import AboutComponent from "../components/landing/AboutComponent";
import LandingMain from "../components/landing/LandingMain";
import LandingHeader from "../components/landing/LandingHeader";

const LandingScreen = () => {
    return (
        <Container>
            <LandingHeader/>
            <LandingMain/>
            <AboutComponent/>
            <ReadersOpinion/>
            <Membership/>
            <RecentWriting/>
            <Footer/>
        </Container>
    )
};

export default LandingScreen;

const Container = styled.div`
    font-family: 'Montserrat Alternates', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
