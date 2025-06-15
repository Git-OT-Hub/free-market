import { StyledFlashMessage } from "./StyledFlashMessage";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { reset } from "../../store/reducers/flashMessage";

const FlashMessage: React.FC = () => {
    const flashMessage = useSelector((state: RootState) => state.flashMessage);
    const dispatch = useDispatch();

    const resetFlashMessage = () => {
        dispatch(reset());
    };

    if (flashMessage.success && !flashMessage.failure) {
        return (
            <StyledFlashMessage $isSuccess={true}>
                <span>{flashMessage.success}</span>
                <button onClick={resetFlashMessage}>×</button>
            </StyledFlashMessage>
        );
    }

    if (!flashMessage.success && flashMessage.failure) {
        return (
            <StyledFlashMessage $isSuccess={false}>
                {flashMessage.failure}
            </StyledFlashMessage>
        );
    }
};

export default FlashMessage;