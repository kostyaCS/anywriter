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
    border: 1px solid #2100A3;
    border-radius: 5px;
    display: flex;
    justify-content: center; 
    align-items: center;
    gap: 10px;
    width: 420px;
    height: 50px;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: #2100A3;
    cursor: pointer;
    background-color: white;
`;

const GoogleImage = styled.img`
    width: auto;
    height: auto;
    max-height: 100%;
`;