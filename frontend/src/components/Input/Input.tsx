import { memo } from "react";
import { StyledInput } from "./StyledInput";
import type { UserInformationError } from "../../types/stateType";

type InputProps = {
    label: string,
    errorKey: "name" | "email" | "password" | "password_confirmation" | "post_code" | "address" | "building" | "brand" | "price",
    errors: UserInformationError,
    type: string,
    value: string,
    fn: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
};

const Input: React.FC<InputProps> = ({label, errorKey, errors, type, value, fn, placeholder}) => {
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
                    placeholder={placeholder}
                />
            </label>
        </StyledInput>
    );
};

export default memo(Input);