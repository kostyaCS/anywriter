import styled from 'styled-components';
import GoogleButtonImage from "../images/google_button.svg"

const GoogleButton = (props) => {
    return (
        <>
            <StyledButton onClick={props.onClick}>
                <GoogleImage src={GoogleButtonImage} />
                {props.text}
            </StyledButton>
        </>
    )
};

export default GoogleButton;

const StyledButton = styled.button`
    border: 1px solid #333333;
    border-radius: 40px;
    display: flex;
    justify-content: center; 
    align-items: center;
    gap: 10px;
    width: 360px;
    height: 55px;
    font-size: 16px;
    font-family: 'Montserrat Alternates', sans-serif;
    line-height: 18px;
    color: black;
    cursor: pointer;
    background-color: white;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: translateY(-0.1mm);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 550px) {
        width: 90%;
    }
`;

const GoogleImage = styled.img`
    width: auto;
    height: auto;
    max-height: 100%;
`;