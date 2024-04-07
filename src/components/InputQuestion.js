import styled from 'styled-components';

const InputQuestion = (props) => {
    return (
        <>
            <QuestionContainer>
                <Question>
                    {props.text}
                </Question>
            </QuestionContainer>
        </>
    )
};

export default InputQuestion;

const QuestionContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 14px;
    width: 420px;
`;

const Question = styled.span`
    color: black;
    font-size: 16px;
    font-weight: 500;
    font-family: Helvetica;
`;
