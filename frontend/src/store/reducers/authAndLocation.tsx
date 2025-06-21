import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../lib/axios";

export const fetchAuth = createAsyncThunk("auth/fetch", async (payload: string) => {
    try {
        const res = await http.get("/api/user");
        return { isAuthenticated: !!res.data, location: payload};
    } catch (e) {
        return { isAuthenticated: false, location: payload};
    }
});

const authAndLocation = createSlice({
    name: "authAndLocation",
    initialState: { isAuthenticated: false, location: '', loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = action.payload.isAuthenticated;
                state.location = action.payload.location;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.location = 'error';
            });
    },
});

export default authAndLocation.reducer;