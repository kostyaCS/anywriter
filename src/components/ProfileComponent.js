import React from 'react';
import {useAuth} from "../AuthContext";
import styled from "styled-components";
import Avatar from "../images/avatar.png";


const ProfileComponent = ({ user }) => {
    const { currentUser } = useAuth();

    return (
        <>
            <StyledAvatar src={Avatar} alt="User Avatar" />
            <Email>{currentUser?.email}</Email>
        </>
    );
};

const StyledAvatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`;

const Email = styled.p`
    color: gray;
`;

export default ProfileComponent;