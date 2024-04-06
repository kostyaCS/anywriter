import styled from 'styled-components';

const InvalidInput = (props) => {
    return (
        <>
            <RedText>
                {props.text}
            </RedText>
        </>
    )
};

export default InvalidInput;

const RedText = styled.span`
    display: flex;
    align-items: center;
    color: red;
    font-size: 11px;
    height: 3px;
    width: 420px;
`;
