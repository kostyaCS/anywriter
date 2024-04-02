import styled from 'styled-components';

const ExtraRedirectContainer = (props) => {
    return (
        <>
            <ExtraSingInContainer>
                <ExtraSingInText>
                    {props.text}
                </ExtraSingInText>
                <ExtraSingInButton onClick={props.onClick}>
                    {props.redirectButton}
                </ExtraSingInButton>
            </ExtraSingInContainer>
        </>
    )
};

export default ExtraRedirectContainer;

const ExtraSingInContainer = styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    width: 420px;
    padding-left: 20px;
    height: 25px;
`;

const ExtraSingInText = styled.span`
    color: black;
    font-size: 14px;
`;

const ExtraSingInButton = styled.button`
    background: none;
    color: #160070;
    border: none;
    padding: 0;
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    outline: inherit;
    transition: all 0.25s ease-in-out;
    &:hover {
        color: #6a56f1;
    }
`;
