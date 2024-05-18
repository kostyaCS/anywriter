import styled from "styled-components";

const LogInButton = (props) => {
    return (
        <>
            <StyledButton onClick={props.onClick}>{props.text}</StyledButton>
        </>
    );
};

export default LogInButton;

const StyledButton = styled.button`
  height: 42px;
  padding: 0 15px;
  background-color: transparent;
  border-radius: 5px;
  border: 2px solid black;
  color: black;
  font-size: 14px;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 550px) {
    gap: 20px;
  }

  @media (max-width: 430px) {
    gap: 8px;
    font-size: 12px;
  }
`;
