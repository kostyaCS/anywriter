import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import BlueButton from "../components/BlueButton";





const MyWorks = () => {
    const {currentUser} = useAuth();
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/create_work");
    }

    return(
        <>
            <Header>
                <HeaderText>
                    Мої твори
                </HeaderText>
            </Header>
            <MainContainer>
                {currentUser?.email}
            </MainContainer>
            <BlueButton onClick={handleRedirect} text="Створити твір"/>
        </>
    );
}

export default MyWorks;

const Header = styled.div`
    padding-top: 20px;
    gap: 80px;
    padding-bottom: 20px;
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const StyledImage = styled.img``;

const HeaderText = styled.div`
    font-weight: 300;
    cursor: pointer;
    font-size: 16px;
    line-height: 18px;
`;

const MainContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
`;
