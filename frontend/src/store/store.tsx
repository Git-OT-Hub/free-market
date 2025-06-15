import { configureStore } from "@reduxjs/toolkit";
import flashMessage from "./reducers/flashMessage";

const store = configureStore({
    reducer: {
        flashMessage: flashMessage
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;