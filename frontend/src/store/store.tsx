import { configureStore } from "@reduxjs/toolkit";
import flashMessage from "./reducers/flashMessage";
import authAndLocation from "./reducers/authAndLocation";

const store = configureStore({
    reducer: {
        flashMessage: flashMessage,
        authAndLocation: authAndLocation,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;