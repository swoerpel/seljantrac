import {createAction, props} from '@ngrx/store';
import { User } from 'src/app/shared/models/User.model';


export const LoginUserSuccess = createAction(
    '[User API] Login User Success',
    props<{currentUserId: string}>()
)

export const LoginUserError = createAction(
    '[User API] Login User Error',
    props<{err: any}>()
)

export const RegisterUserSuccess = createAction(
    '[User API] Register User Success',
    props<{currentUserId: string}>()
)

export const RegisterUserError = createAction(
    '[User API] Register User Error',
    props<{err: string}>()
)

export const LoadUsers = createAction(
    '[User API] Load All Users',
)

export const LoadUsersSuccess = createAction(
    '[User API] Load All Users Success',
    props<{users: User[]}>()
)

export const LoadUsersError = createAction(
    '[User API] Register User Error',
    props<{err: string}>()
)

export const LogoutUser = createAction(
    '[User API] User Logged Out',
)

export const AssignUserPrivileges = createAction(
    '[User API] Assign User Privileges',
    props<{isAdmin: boolean}>()
)

export const LoadCurrentUserSuccess = createAction(
    '[User API] Load Current User Success',
    props<{currentUserId: string}>()
)

export const LoadCurrentUserError = createAction(
    '[User API] Load Current User Error',
    props<{err: any}>()
)

