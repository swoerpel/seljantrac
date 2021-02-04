import {createAction, props} from '@ngrx/store';
import { Observable } from 'rxjs';

export const UploadFile = createAction(
    '[File Upload] Upload File',
    props<{file: File}>()
)
export const Default = createAction(
    '[File Upload] Default',
)

