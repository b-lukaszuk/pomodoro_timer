import React, { ChangeEvent, ReactElement } from "react";

import "./TextInput.css";

interface handlerFn {
    (event: ChangeEvent<HTMLInputElement>): void
}

interface Props {
    name: string;
    changeHandler: handlerFn;
    label: string;
    pattern?: string;
    placeholder?: string;
    value: string;
}

const InputElt: React.FC<Props> = (props): ReactElement<HTMLInputElement> => {
    const nameIn: string = props.name;
    const changeHandlerIn: handlerFn = props.changeHandler;
    const labelIn: string = props.label;
    const patternIn: string = props.pattern ? props.pattern : ".*";
    const placeholderIn: string = props.placeholder ? props.placeholder : "";
    const valueIn: string = props.value;

    return (
        <div>
            <span>{labelIn}: &nbsp;</span>
            <input name={nameIn} type="text"
                pattern={patternIn} placeholder={placeholderIn}
                value={valueIn} maxLength={4} size={4}
                onChange={changeHandlerIn} />
        </div>
    )

}

export default InputElt;
