import React, { ReactElement } from "react";

import "./Checkbox.css";

interface Props {
    name: string;
    displayedText: string;
    checked: boolean;
    onClick: Function;
}

const Checkbox: React.FC<Props> = (props): ReactElement<HTMLElement> => {

    const name: string = props.name;
    const displayedText: string = props.displayedText;
    const checked: boolean = props.checked;
    const onClick: Function = props.onClick;

    return (
        <div className="checkbox">
            <input type="checkbox" name={name} checked={checked}
                onClick={() => onClick()} />
            <label htmlFor={name} onClick={() => onClick()}>{displayedText}</label>
        </div>
    )
}

export default Checkbox;
