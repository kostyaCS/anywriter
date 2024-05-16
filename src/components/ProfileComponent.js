import React from 'react';
import {useAuth} from "../AuthContext";
import styled from "styled-components";
import Avatar from "../images/avatar.png";


const ProfileComponent = ({ user }) => {
    const { currentUser } = useAuth();

    return (
        <>
            <FrameImgContainer>
                <StyledRecentWritingImage src={Avatar} alt="Avatar" />
            </FrameImgContainer>
            <StyledAvatar src={Avatar} alt="User Avatar" />
            <Email>{currentUser?.email}</Email>
        </>
    );
};

export default ProfileComponent;

const FrameImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140px;
    height: 140px;
    overflow: hidden;
    border-radius: 50%;
`;

const StyledRecentWritingImage = styled.img`
    height: 150px;
`;

const StyledAvatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`;

const Email = styled.p`
    color: gray;
`;
