import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../lib/axios";

export const fetchAuth = createAsyncThunk("auth/fetch", async (payload: string) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    try {
        const res = await http.get("/api/user");
        return { isAuthenticated: !!res.data, isVerified: !!res.data.email_verified_at, location: payload, userId: res.data?.id ?? null};
    } catch (e) {
        return { isAuthenticated: false, isVerified: false, location: payload, userId: null};
    }
});

const authAndLocation = createSlice({
    name: "authAndLocation",
    initialState: { isAuthenticated: false, isVerified: false, location: '', loading: true, userId: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
                state.isVerified = false;
                state.location = '';
                state.userId = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = action.payload.isAuthenticated;
                state.isVerified = action.payload.isVerified;
                state.location = action.payload.location;
                state.userId = action.payload.userId;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
                state.isVerified = false;
                state.location = '';
                state.userId = null;
            });
    },
});

export default authAndLocation.reducer;