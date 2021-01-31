import { createFeatureSelector, createSelector } from "@ngrx/store"
import { UserState } from '../user.reducer';

const userFeatureState = createFeatureSelector<UserState>('user');

export const GetUsers = createSelector(
    userFeatureState,
    (state: UserState): any => state.users
)

export const GetLoginError = createSelector(
    userFeatureState,
    (state: UserState): any => state.loginError
)