import styled from 'styled-components';
import LandingButton from "./LandingButton";
import scribble_black from "../../images/landing/scribble_black.png";
import React from "react";
import scribble_zig from "../../images/landing/scribble_zig.png";
import scribble_blue from "../../images/landing/scribble_blue.png";
import three_diamonds from "../../images/three_diamonds.png";
import smile from "../../images/landing/smile.png";
import faces from "../../images/landing/faces.png";
import fire from "../../images/landing/fire.png";
import asterisk from "../../images/landing/asterisk.png";
import {useNavigate} from "react-router-dom";

const Membership = () => {
    const navigate = useNavigate();

    const handleLogInClick = () => {
        navigate("/auth");
    }

    return (
        <Main>
            <StyledMembershipText>
                <StyledScribbleZigImage src={scribble_zig} alt="scribble zigzag" />
                Membership benefits
            </StyledMembershipText>
            <StyledReadersTextSmall>Gain access to personalized content and be part of a supportive community that embraces creativity in all its forms.</StyledReadersTextSmall>
            <MembershipCardsContainer>
                <MembershipCard>
                    <StyledScribbleBlueImg src={scribble_blue} alt="scribble blue" />
                    <MembershipCardMainText>Topic by Request</MembershipCardMainText>
                    Tailor your reading experience by requesting topics that resonate with you.
                </MembershipCard>
                <MembershipCard>
                    <StyledThreeDiamondsImg src={three_diamonds} alt="three diamonds" />
                    <MembershipCardMainText>Exclusive Content</MembershipCardMainText>
                    Unlock a world of exclusive content curated just for members.
                </MembershipCard>
                <MembershipCard>
                    <StyledSmileImg src={smile} alt="smile" />
                    <MembershipCardMainText>Join the Community</MembershipCardMainText>
                    Connect with fellow members, share your ideas, and collaborate on exciting projects.
                </MembershipCard>
                <MembershipCard>
                    <StyledFacesImg src={faces} alt="faces" />
                    <MembershipCardMainText>Livestreaming Access</MembershipCardMainText>
                    Enjoy exclusive access to live events and broadcasts, including author interviews, workshops, and discussions.
                </MembershipCard>
                <MembershipCard>
                    <StyledFireImg src={fire} alt="fire" />
                    <MembershipCardMainText>Exclusive Writings & Merch</MembershipCardMainText>
                    Enjoy access to special writings, bonus content, and exclusive merchandise.
                </MembershipCard>
                <MembershipCard>
                    <StyledAsteriskImg src={asterisk} alt="asterisk" />
                    <MembershipCardMainText>And much more!</MembershipCardMainText>
                    Unlock additional perks, surprises, and opportunities to further enrich your Readly experience.
                </MembershipCard>
            </MembershipCardsContainer>
            <LandingButton onClick={handleLogInClick} text="JOIN NOW"/>
            <ScribbleImg src={scribble_black} alt="scribble black" />
        </Main>
    )
};

export default Membership;

const Main = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    margin-top: -75px;
    padding-top: 150px;
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

const StyledReadersTextSmall = styled.div`
    font-size: 20px;
    width: 70vw;
    text-align: center;

    @media (max-width: 550px){
        font-size: 18px;
    }

    @media (max-width: 430px) {
        font-size: 15px;
    }
`;

const StyledMembershipText = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
    word-break:keep-all;
    
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

const StyledScribbleZigImage = styled.img`
    width: 120px;
    align-self: flex-end;
    margin: 0 -60px -20px 0;

    @media (max-width: 430px) {
        width: 100px;
    }
`;

// ------------ Membership Cards Container ------------
const MembershipCardsContainer = styled.div`
    width: 90vw;
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
    margin: 60px 0;
    text-align: center;
`;

const MembershipCard = styled.div`
    width: 310px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 550px){
        font-size: 17px;
    }

    @media (max-width: 430px) {
        font-size: 13px;
    }
`;

const StyledScribbleBlueImg = styled.img`
    height: 35px;
`;

const StyledThreeDiamondsImg = styled.img`
    height: 70px;
`;

const StyledSmileImg = styled.img`
    height: 90px;
`;

const StyledFacesImg = styled.img`
    height: 60px;
`;

const StyledFireImg = styled.img`
    height: 60px;
`;

const StyledAsteriskImg = styled.img`
    height: 60px;
`;

const MembershipCardMainText = styled.h4`
`;
