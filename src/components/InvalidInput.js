import styled from "styled-components";

const InvalidInput = (props) => {
    return (
        <>
            <RedText>{props.text}</RedText>
        </>
    );
};

export default InvalidInput;

const RedText = styled.span`
  width: 450px;
  color: #eb4747;
  font-size: 11px;
  font-family: "Montserrat Alternates", sans-serif;
  margin-top: 6px;
`;
