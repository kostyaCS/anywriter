import styled from 'styled-components';

const BlueButton = (props) => {
    return (
        <>
            <StyledButton onClick={props.onClick}>
                {props.text}
            </StyledButton>
        </>
    )
};

export default BlueButton;

const StyledButton = styled.button`
    background-color: #160070;
    border-radius: 5px;
    width: 420px;
    height: 50px;
    border: none;
    color: white;
    font-size: 16px;
    font-weight: 700;
    line-height: 18px;
    cursor: pointer;
`;