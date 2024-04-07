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
                placeholderText="Введіть дату народження (dd/mm/yyyy)"
                isClearable={() => props.setStartDate(undefined)}
                dateFormat='dd/MM/yyyy'
                minDate={props.subtractYears(new Date(), 110)}
                maxDate={props.subtractYears(new Date(), 4)}
            />
        </>
    )
};

export default StyledDatePicker;

const StyledDatePickerContainer = styled(DatePicker)`
    border: 1px solid #9B9B9B;
    border-radius: 5px;
    width: 420px;
    height: 50px;
    padding-left: 20px;
    box-sizing: border-box;
`;
