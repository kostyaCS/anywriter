import React from "react";
import Select from "react-select";

const Options = (props) => {
    return (
        <div style={{ width: '420px', fontSize: '14px' }}>
            <Select
                placeholder={props.placeholder}
                isMulti
                options={props.data}
                value={props.value}
                maxMenuHeight={180}
                menuPlacement="auto"
                onChange={props.onChange}
            />
        </div>
    )
};

export default Options;
