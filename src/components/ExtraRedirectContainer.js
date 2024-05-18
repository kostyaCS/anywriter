import styled from "styled-components";

const ExtraRedirectContainer = (props) => {
    return (
        <>
            <ExtraSingInContainer>
                <ExtraSingInText>{props.text}</ExtraSingInText>
                <ExtraSingInButton onClick={props.onClick}>
                    {props.redirectButton}
                </ExtraSingInButton>
            </ExtraSingInContainer>
        </>
    );
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
  font-size: 19px;

  @media (max-width: 550px) {
    width: 90%;
    padding-left: 0;
    font-size: 17px;
  }
`;

const ExtraSingInText = styled.span`
  color: #4d4d4d;
  font-weight: 500;
`;

const ExtraSingInButton = styled.button`
  background: none;
  color: black;
  border: none;
  padding: 0;
  font: inherit;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  outline: inherit;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #915f6d;
  }
`;
