import { ReactElement } from "react";

import "./Button.css";

interface Props {
    displText: string;
    isDisplayed: boolean;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Button: React.FC<Props> = (props): ReactElement<HTMLElement> | null => {
    const displText: string = props.displText;
    const isDisplayed: boolean = props.isDisplayed;
    const onClickAction: (e: React.MouseEvent<HTMLElement>) => void =
        props.onClick;

    if (isDisplayed) {
        return <button onClick={onClickAction}>{displText}</button>;
    } else {
        return null;
    }
};

export default Button;
