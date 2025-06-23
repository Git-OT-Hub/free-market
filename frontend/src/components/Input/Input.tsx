import { memo } from "react";
import { StyledInput } from "./StyledInput";
import type { Error } from "../../pages/Auth/Register";

type InputProps = {
    label: string,
    errorKey: "name" | "email" | "password" | "password_confirmation" | "post_code" | "address" | "building",
    errors: Error,
    type: string,
    value: string,
    fn: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const Input: React.FC<InputProps> = ({label, errorKey, errors, type, value, fn}) => {
    const errorMessages = errors[errorKey] || [];

    return (
        <StyledInput>
            <label>
                <span>{label}</span>
                <ul>
                    {errorMessages.map((err, idx) => {
                        return (
                            <li key={idx}>{err}</li>
                        );
                    })}
                </ul>
                <input
                    type={type}
                    value={value}
                    onChange={fn}
                />
            </label>
        </StyledInput>
    );
};

export default memo(Input);