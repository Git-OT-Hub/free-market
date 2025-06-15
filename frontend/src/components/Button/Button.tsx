import { memo } from "react";
import { StyledButton } from "./StyledButton";

type ButtonProps = {
    label: string,
};

const Button: React.FC<ButtonProps> = ({label}) => {

    return (
        <StyledButton type="submit">
            {label}
        </StyledButton>
    );
};

export default memo(Button);