import React, { useState } from 'react';
import styled from 'styled-components';

const CheckboxGroup = ({ title, options, selectedValues, onChange }) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleCheckboxChange = (option) => {
        if (selectedValues.includes(option)) {
            onChange(selectedValues.filter(item => item !== option));
        } else {
            onChange([...selectedValues, option]);
        }
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
            )}
        </CheckboxGroupContainer>
    );
};

export default CheckboxGroup;

const CheckboxGroupContainer = styled.div`
    width: 90%;
    margin-left: 20px;
    background-color: #FDF7F4;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`;

const GroupTitle = styled.div`
    cursor: pointer;
    font-size: 16px;
    line-height: 18px;
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 600;
    font-style: normal;
`;

const CheckboxesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 15px;
    margin-bottom: 8px;
    input[type="checkbox"] {
        display: none;
    }
    label {
        position: relative;
        padding-left: 25px;
        cursor: pointer;
        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 2px;
            width: 15px;
            height: 15px;
            border: 1px solid #ccc;
            background-color: #fff;
        }

    }
    input[type="checkbox"]:checked + label:before {
        background-color: #81ADC8;
        border-color: #81ADC8;
    }
    input[type="checkbox"]:checked + label:after {
        opacity: 1;
    }
`;
