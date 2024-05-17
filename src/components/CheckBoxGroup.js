import React, { useState } from 'react';
import styled from 'styled-components';

const CheckboxGroup = ({ title, options, selectedValues, onChange }) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleCheckboxChange = (option) => {
        const newValue = selectedValues.includes(option)
            ? selectedValues.filter(item => item !== option)
            : [...selectedValues, option];
        onChange(newValue);
    };

    return (
        <CheckboxGroupContainer>
            <GroupTitle onClick={() => setShowOptions(!showOptions)}>
                {title}
            </GroupTitle>
            {showOptions && (
                <CheckboxesContainer>
                    {options.map((option, index) => (
                        <CheckboxContainer key={index}>
                            <HiddenCheckbox
                                id={`checkbox-${option}`}
                                checked={selectedValues.includes(option)}
                                onChange={() => handleCheckboxChange(option)}
                            />
                            <StyledCheckbox htmlFor={`checkbox-${option}`}>
                                {option}
                            </StyledCheckbox>
                        </CheckboxContainer>
                    ))}
                </CheckboxesContainer>
            )}
        </CheckboxGroupContainer>
    );
};

export default CheckboxGroup;

const CheckboxGroupContainer = styled.div`
    margin: 20px;
    background-color: #FDF7F4;
    padding: 20px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const GroupTitle = styled.div`
    cursor: pointer;
    font-size: 16px;
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: bold;
    margin-bottom: 10px;
    user-select: none;
    &:hover {
        color: #81ADC8;
    }
    
    @media (max-width: 800px) {
        font-size: 14px;        
    }
`;

const CheckboxesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    display: none;
`;

const StyledCheckbox = styled.label`
    position: relative;
    cursor: pointer;
    padding: 5px 10px 5px 40px;
    font-size: 14px;
    line-height: 20px;
    color: #333;
    background-color: transparent;
    border-radius: 4px;
    transition: background-color 200ms;
    user-select: none;
    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
        transition: border-color 200ms, background-color 200ms;
    }
    &:hover:before {
        border-color: #81ADC8;
    }
    input:checked + & {
        &:before {
            border-color: #81ADC8;
            background-color: #81ADC8;
        }
        &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 17px;
            transform: translateY(-50%) rotate(45deg);
            width: 6px;
            height: 12px;
            border-bottom: 3px solid #fff;
            border-right: 3px solid #fff;
        }
    }
`;