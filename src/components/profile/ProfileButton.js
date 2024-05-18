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
  height: 42px;
  padding: 0 15px;
  background-color: black;
  border-radius: 5px;
  border: ${(props) => props.shadowColor || "none"};
  color: white;
  font-size: 14px;
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 460px) {
    font-size: 12px;
  }
`;
