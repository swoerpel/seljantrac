import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/models/User.model";
import { UserApiActions, UserPageActions, UserRouterActions } from "./actions";

export interface UserState {
    users: User[],
    currentUserId: string,
    isAdmin: boolean;
    loginError: any;
    registerError: any;
    loadUsersError: any;
}

const initialState: UserState = {
    users: [],
    currentUserId: '',
    isAdmin: false,
    loginError: null,
    registerError: null,
    loadUsersError: null,
}

export const userReducer = createReducer<UserState>(
    initialState,
    on(UserPageActions.LoginUser, (state): UserState => {
        return {
            ...state,
            loginError: null,
        }
    }),
    on(UserApiActions.LoginUserSuccess, (state, action): UserState => {
        return {
            ...state,
            currentUserId: action.currentUserId,
            loginError: null,
        }
    }),
    on(UserApiActions.LoginUserError, (state, action): UserState => {
        return {
            ...state,
            loginError: action.err
        }
    }),
    //==========================================================
    on(UserPageActions.RegisterUser, (state): UserState => {
        return {
            ...state,
            registerError: null,
        }
    }),
    on(UserApiActions.RegisterUserSuccess, (state, action): UserState => {
        return {
            ...state,
            currentUserId: action.currentUserId,
            registerError: null,
        }
    }),
    on(UserApiActions.RegisterUserError, (state, action): UserState => {
        return {
            ...state,
            registerError: action.err
        }
    }),
    //==========================================================
    on(UserApiActions.LoadUsers, (state): UserState => {
        return {
            ...state,
            loadUsersError: null,
        }
    }),
    on(UserApiActions.LoadUsersSuccess, (state, action): UserState => {
        return {
            ...state,
            users: action.users,
            loadUsersError: null,
        }
    }),
    on(UserApiActions.LoadUsersError, (state, action): UserState => {
        return {
            ...state,
            loadUsersError: action.err
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
        }
    }),
);