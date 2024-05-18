import styled from "styled-components";

const InvalidUpdateInput = (props) => {
    return (
        <>
            <RedText>{props.text}</RedText>
        </>
    );
};

export default InvalidUpdateInput;

const RedText = styled.span`
  width: 90%;
  color: #eb4747;
  font-size: 11px;
  font-family: "Montserrat Alternates", sans-serif;
  margin-top: -10px;
`;
