import { createFeatureSelector, createSelector } from "@ngrx/store"
import { UserState } from '../user.reducer';

const userFeatureState = createFeatureSelector<UserState>('user');

export const GetUsers = createSelector(
    userFeatureState,
    (state: UserState): any => state.users
)

export const GetLoginError = createSelector(
    userFeatureState,
    // TODO: we dont want many error states in the reducer
    // but we need to some how differentiate between them
    (state: UserState): any => null//state.error
)

export const GetCurrentUserId = createSelector(
    userFeatureState,
    (state: UserState): any => state.currentUserId
)