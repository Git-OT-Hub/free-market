import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../lib/axios";

export const fetchAuth = createAsyncThunk("auth/fetch", async (payload: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    try {
        const res = await http.get("/api/user");
        return { isAuthenticated: !!res.data, isVerified: !!res.data.email_verified_at, location: payload};
    } catch (e) {
        return { isAuthenticated: false, isVerified: false, location: payload};
    }
});

const authAndLocation = createSlice({
    name: "authAndLocation",
    initialState: { isAuthenticated: false, isVerified: false, location: '', loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
                state.isVerified = false;
                state.location = '';
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = action.payload.isAuthenticated;
                state.isVerified = action.payload.isVerified;
                state.location = action.payload.location;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
                state.isVerified = false;
                state.location = '';
            });
    },
});

export default authAndLocation.reducer;