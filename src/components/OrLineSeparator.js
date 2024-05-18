import styled from "styled-components";

const OrLineSeparator = (props) => {
    return (
        <>
            <OrContainer>
                <HorizontalLineSeparator />
                {props.text}
                <HorizontalLineSeparator />
            </OrContainer>
        </>
    );
};

export default OrLineSeparator;

const OrContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  color: #4d4d4d;
  font-weight: 200;
  font-family: "Montserrat Alternates", sans-serif;
  margin: 15px 0;
`;

const HorizontalLineSeparator = styled.div`
  width: 200px;
  height: 0.1mm;
  background-color: #4d4d4d;
`;
