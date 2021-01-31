import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/models/User.model";
import { UserApiActions, UserRouterActions } from "./actions";

export interface UserState {
    users: User[],
    currentUserId: string,
    error: any,
}

const initialState: UserState = {
    users: [],
    currentUserId: '',
    error: null,
}

export const userReducer = createReducer<UserState>(
    initialState,
    // on(UserApiActions.LoadUsersSuccess, (state, action): UserState => {
    //     return {
    //         ...state,
    //         Users: action.Users,
    //         error: null,
    //     }
    // }),
);