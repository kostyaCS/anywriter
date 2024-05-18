import styled from "styled-components";

const ProfileButton = (props) => {
    return (
        <>
            <StyledButton shadowColor={props.shadowColor} onClick={props.onClick}>
                {props.text}
            </StyledButton>
        </>
    );
};

export default ProfileButton;

const StyledButton = styled.button`
  padding: 18px 28px;
  background-color: black;
  border-radius: 5px;
  border: ${(props) => props.shadowColor || "none"};
  color: white;
  font-size: 19px;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 700;
  cursor: pointer;
  -webkit-box-shadow: 5px 5px 0 0
    ${(props) => props.shadowColor || "rgba(0,0,0,0.25)"};
  -moz-box-shadow: 5px 5px 0 0
    ${(props) => props.shadowColor || "rgba(0,0,0,0.25)"};
  box-shadow: 5px 5px 0 0 ${(props) => props.shadowColor || "rgba(0,0,0,0.25)"};
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 7px 7px 0 0
      ${(props) => props.shadowColor || "rgba(0,0,0,0.25)"};
  }

  @media (max-width: 460px) {
    font-size: 16px;
  }
`;
