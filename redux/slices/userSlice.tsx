import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: number;
    username: string;
    password: string;
    fullname: string;
    age: number;
    email: string;
    avatar: string;
    phonenumber: string;
    balance: number;
    PIN: string;
    status_provider: string;
    provider_id: string;
    created_at: string;
    updated_at: string;
}

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
export type { UserState }; 
