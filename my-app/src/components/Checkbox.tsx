import React, { ReactElement } from "react";

import "./Checkbox.css";

interface Props {
    name: string;
    displayedText: string;
    checked: boolean;
    isDisplayed: boolean;
    onClick: Function;
}

const Checkbox: React.FC<Props> = (props): ReactElement<HTMLElement> | null => {

    const name: string = props.name;
    const displayedText: string = props.displayedText;
    const checked: boolean = props.checked;
    const isDisplayed: boolean = props.isDisplayed;
    const onClick: Function = props.onClick;

    if (isDisplayed) {
        return (
            <div className="checkbox">
                <input type="checkbox" name={name} checked={checked}
                    onChange={() => onClick()} />
                <label htmlFor={name} >{displayedText}</label>
            </div>
        )
    } else {
        return null;
    }
}

export default Checkbox;
