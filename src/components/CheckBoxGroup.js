import React from 'react';
import styled from 'styled-components';

const CheckboxGroup = ({ title, options, selectedValues, onChange }) => {
    const handleCheckboxChange = (option) => {
        if (selectedValues.includes(option)) {
            onChange(selectedValues.filter(item => item !== option));
        } else {
            onChange([...selectedValues, option]);
        }
    };

    return (
        <>
            <GroupTitle>{title}</GroupTitle>
            <CheckboxesContainer>
                {options.map((option, index) => (
                    <CheckboxContainer key={index}>
                        <input
                            type="checkbox"
                            id={`checkbox-${option}`}
                            name={option}
                            value={option}
                            checked={selectedValues.includes(option)}
                            onChange={() => handleCheckboxChange(option)}
                        />
                        <label htmlFor={`checkbox-${option}`}>{option}</label>
                    </CheckboxContainer>
                ))}
            </CheckboxesContainer>
        </>
    );
};

export default CheckboxGroup;

const GroupTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-left: 30px;
`;

const CheckboxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
