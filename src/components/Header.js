import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../AuthContext";
import SmallLogo from "../images/logo.svg";

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
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            </style>
            <Header>
                {currentUser?.email === "admin@gmail.com" && (
                    <Link to="/create_work">Add Text</Link>
                )}
                <Logo onClick={handleLogoClick}>
                    <img src={SmallLogo} alt="AnyWriter" />
                </Logo>
                <HeaderCenter>
                    <HeaderText onClick={handleLogoClick}>
                        Anywriter
                    </HeaderText>
                </HeaderCenter>
                <HeaderRight>
                    <HeaderText onClick={handleMyPageClick}>
                        Profile
                    </HeaderText>
                    <HeaderText>
                        Settings
                    </HeaderText>
                    <HeaderText onClick={handleLogout}>
                        Log out
                    </HeaderText>
                </HeaderRight>
            </Header>
        </>
    );
};

export default HeaderDef;

const Header = styled.div`
    background-color: #FDF7F4;
    position: sticky;
    top: 0;
    z-index: 1;
    height: 5vh;
    gap: 75px;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 5%;
`;

const HeaderText = styled.div`
    cursor: pointer;
    font-size: 16px;
    line-height: 18px;
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 600;
    font-style: normal;
`;

const HeaderCenter = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    
`;

const Logo = styled.div`
    width: 50px;
    cursor: pointer;
`;

const HeaderRight = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;
    margin-left: auto;
    margin-right: 5%;
`;