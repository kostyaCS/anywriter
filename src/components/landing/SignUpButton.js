import styled from "styled-components";

const SignUpButton = (props) => {
    return (
        <>
            <StyledButton onClick={props.onClick}>{props.text}</StyledButton>
        </>
    );
};

export default SignUpButton;

const StyledButton = styled.button`
  height: 42px;
  padding: 0 15px;
  background-color: black;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 14px;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-1px);
  }
`;
