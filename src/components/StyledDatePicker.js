import styled from "styled-components";
import DatePicker from "react-datepicker";
import React from "react";

const StyledDatePicker = (props) => {
    return (
        <>
            <StyledDatePickerContainer
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                selected={props.startDate}
                onChange={(date) => {
                    props.setStartDate(date);
                    props.checkDate(date);
                }}
                placeholderText="Enter your birthdate (dd/mm/yyyy)"
                isClearable={() => props.setStartDate(undefined)}
                dateFormat='dd/MM/yyyy'
                minDate={props.subtractYears(new Date(), 110)}
                maxDate={props.subtractYears(new Date(), 4)}
            />
        </>
    )
};

export default StyledDatePicker;

const Main = styled.div`
    @media (max-width: 550px) {
        width: 100%;
    }
`;

const StyledDatePickerContainer = styled(DatePicker)`
    width: 450px;
    height: 50px;
    border: 1px solid black;
    border-radius: 8px;
    font-size: 14px;
    font-family: 'Montserrat Alternates', sans-serif;
    padding: 0 10px 0 20px;
    box-sizing: border-box;
    
    &:focus {
        outline: none;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 550px) {
        width: 100%;
    }
`;
