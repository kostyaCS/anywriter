import styled from 'styled-components';

const InputTitle = (props) => {
    return (
        <>
            <TitleContainer>
                <Title>
                    {props.text}
                </Title>
            </TitleContainer>
        </>
    )
};

export default InputTitle;

const TitleContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 14px;
    width: 420px;
`;

const Title = styled.span`
    color: black;
    font-size: 13px;
    font-weight: 500;
`;
