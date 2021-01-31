import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/models/User.model";
import { UserApiActions, UserPageActions, UserRouterActions } from "./actions";

export interface UserState {
    users: User[],
    currentUserId: string,
    isAdmin: boolean;
    error: any;
}

const initialState: UserState = {
    users: [],
    currentUserId: '',
    isAdmin: false,
    error: null,
}

export const userReducer = createReducer<UserState>(
    initialState,
    on(UserPageActions.LoginUser, (state): UserState => {
        return {
            ...state,
            error: null,
        }
    }),
    on(UserApiActions.LoginUserSuccess, (state, action): UserState => {
        return {
            ...state,
            currentUserId: action.currentUserId,
            error: null,
        }
    }),
    on(UserApiActions.LoginUserError, (state, action): UserState => {
        return {
            ...state,
            error: action.err
        }
    }),
    //==========================================================
    on(UserPageActions.RegisterUser, (state): UserState => {
        return {
            ...state,
            error: null,
        }
    }),
    on(UserApiActions.RegisterUserSuccess, (state, action): UserState => {
        return {
            ...state,
            currentUserId: action.currentUserId,
            error: null,
        }
    }),
    on(UserApiActions.RegisterUserError, (state, action): UserState => {
        return {
            ...state,
            error: action.err
        }
    }),
    //==========================================================
    on(UserApiActions.LoadUsers, (state): UserState => {
        return {
            ...state,
            error: null,
        }
    }),
    on(UserApiActions.LoadUsersSuccess, (state, action): UserState => {
        return {
            ...state,
            users: action.users,
            error: null,
        }
    }),
    on(UserApiActions.LoadUsersError, (state, action): UserState => {
        return {
            ...state,
            error: action.err
        }
    }),
    //==========================================================
    on(UserApiActions.LoadCurrentUserSuccess, (state, action): UserState => {
        return {
            ...state,
            currentUserId: action.currentUserId,
            error: null,
        }
    }),
    on(UserApiActions.LoadCurrentUserError, (state, action): UserState => {
        return {
            ...state,
            error: action.err
        }
    }),
    //==========================================================
    on(UserApiActions.AssignUserPrivileges, (state, action): UserState => {
        return {
            ...state,
            isAdmin: action.isAdmin
        }
    }),
    on(UserApiActions.LogoutUser, (state, action): UserState => {
        return {
            ...state,
            currentUserId: null,
            error: null,
        }
    }),
);