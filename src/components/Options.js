import React from "react";
import Select from "react-select";
import styled from "styled-components";

const Options = (props) => {
    return (
        <StyledOption style={{ width: '420px', fontSize: '14px' }}>
            <Select
                placeholder={props.placeholder}
                isMulti
                options={props.data}
                value={props.value}
                maxMenuHeight={180}
                menuPlacement="auto"
                onChange={props.onChange}
            />
        </StyledOption>
    )
};

export default Options;

const StyledOption = styled.div`
    background-color: #ffffff;
    color: black;
    padding: 5px 5px;
    font-size: 16px;
    min-height: 40%;
    font-weight: 500;
    font-family: "Montserrat Alternates", sans-serif;
    box-shadow: 5px 5px 0px 0px #81ADC8;
    
    @media (max-width: 800px) {
        max-width: 90%;
    }
`;

