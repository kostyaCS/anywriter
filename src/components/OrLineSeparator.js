import styled from 'styled-components';

const OrLineSeparator = (props) => {
    return (
        <>
            <OrContainer>
                <HorizontalLineSeparator />
                {props.text}
                <HorizontalLineSeparator />
            </OrContainer>
        </>
    )
};

export default OrLineSeparator;

const OrContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    color: #9b9b9b;
    font-family: Munito, sans-serif;
    font-weight: 200;
`;

const HorizontalLineSeparator = styled.div`
    height: 1px;
    width: 180px;
    background-color: #838383;
`;
