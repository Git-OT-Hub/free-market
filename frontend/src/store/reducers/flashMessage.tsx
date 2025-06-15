import { createSlice } from "@reduxjs/toolkit";

const flashMessage = createSlice({
    name: "flashMessage",
    initialState: { success: '', failure: '' },
    reducers: {
        success(state, { type, payload }) {
            return ({ success: payload, failure: '' });
        },
        failure(state, { type, payload }) {
            return ({ success: '', failure: payload });
        },
        reset() {
            return ({ success: '', failure: '' });
        },
    }
});

const { success, failure, reset } = flashMessage.actions;

export { success, failure, reset };
export default flashMessage.reducer;