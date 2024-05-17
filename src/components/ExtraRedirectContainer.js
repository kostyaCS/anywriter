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
    flex-wrap: wrap;

    @media (max-width: 550px) {
        width: 90%;
        padding-left: 0;
    }
`;

const ExtraSingInText = styled.span`
    color: #4D4D4D;
    font-size: 19px;
    font-weight: 500;
`;

const ExtraSingInButton = styled.button`
    background: none;
    color: black;
    border: none;
    padding: 0;
    font: inherit;
    font-size: 19px;
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
    outline: inherit;
    transition: all 0.2s ease-in-out;
    &:hover {
        color: #915F6D;
    }
`;
