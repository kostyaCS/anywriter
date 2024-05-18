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
  padding: 18px 22px;
  background-color: black;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 14px;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 700;
  cursor: pointer;
  -webkit-box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.25);
  box-shadow: 5px 5px 0 0 rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 7px 7px 0 0 rgba(0, 0, 0, 0.25);
  }
`;
