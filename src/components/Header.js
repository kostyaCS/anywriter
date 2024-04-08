import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../AuthContext";
import SmallLogo from "../images/AnyWriterSmallLogo.svg";

const HeaderDef = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    const handleLogout = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            console.error("Logout error:", error);
        });
    };

    const handleLogoClick = () => {
        navigate("/main_page");
    }

    const handleMyPageClick = () => {
        navigate("/my_page");
    }

    return (
        <>
            <Header>
                {currentUser?.email === "admin@gmail.com" && (
                    <Link to="/create_work">Add Text</Link>
                )}
                <HeaderText onClick={handleMyPageClick}>
                    Моя сторінка
                </HeaderText>
                <StyledImage onClick={handleLogoClick} src={SmallLogo} />
                <HeaderText onClick={handleLogout}>
                    Вийти
                </HeaderText>
            </Header>
        </>
    );
};

export default HeaderDef;

const Header = styled.div`
    position: sticky;
    top: 0;
    z-index: 1;
    height: 5vh;
    gap: 75px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const StyledImage = styled.img`
    cursor: pointer;
`;

const HeaderText = styled.div`
    font-weight: 300;
    cursor: pointer;
    font-size: 16px;
    line-height: 18px;
`;
