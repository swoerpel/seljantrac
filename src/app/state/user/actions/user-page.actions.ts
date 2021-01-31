import {createAction, props} from '@ngrx/store';

export const LoginUser = createAction(
    '[Login Page] Login User',
    props<{email: string; password: string;}>()
)

export const LogoutUser = createAction(
    '[Header] Logout User',
)

export const RegisterUser = createAction(
    '[Login Page] Register User',
    props<{firstName: string; lastName: string; email: string; password: string;}>()
)