import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../AuthContext";
import SmallLogo from "../images/AnyWriterSmallLogo.svg";
import { Link } from "react-router-dom";

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

    return (
        <>
            <Header>
                <HeaderText>
                    Моя сторінка
                </HeaderText>
                <HeaderText>
                    <Link to="/my_works">
                        Мої твори
                    </Link>
                </HeaderText>
                <StyledImage onClick={handleLogoClick} src={SmallLogo}/>
                <HeaderText>
                    Налаштування
                </HeaderText>
                <HeaderText onClick={handleLogout}>
                    Вийти
                </HeaderText>
            </Header>
        </>
    );
};

export default HeaderDef;

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

const StyledImage = styled.img`
    cursor: pointer;
`;

const HeaderText = styled.div`
    font-weight: 300;
    cursor: pointer;
    font-size: 16px;
    line-height: 18px;
`;
